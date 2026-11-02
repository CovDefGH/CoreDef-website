import { createHash, randomBytes, randomInt } from "node:crypto";
import { getCache, ipAddress } from "@vercel/functions";
import { formatForPath, generateData, renderDocument } from "./decoy.mjs";

const cache = getCache({
  namespace: "fuzz-response-v3",
  keyHashFunction: (key) => digest(key),
});
const localCache = new Map();
const inflight = new Map();
const MAX_LOCAL_ENTRIES = 2000;
const DOCUMENT_CACHE_TTL_SECONDS = 5 * 60;
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const delay = () => sleep(75 + randomInt(176));

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function documentKey(path) {
  return `document:v2:${path}`;
}

function number(name, fallback, min, max) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value >= min && value <= max
    ? value
    : fallback;
}

function config() {
  return {
    minMisses: number("FUZZ_MIN_DISTINCT_MISSES", 10, 1, 1000),
    windowMs: number("FUZZ_WINDOW_MS", 60_000, 1000, 3_600_000),
    decoyRate: number("DECOY_RATE", 0.1, 0, 1),
    decoyMaxPerDay: number("DECOY_MAX_PER_DAY", 500, 0, 100_000),
    loginSuccessRate: number("LOGIN_SUCCESS_RATE", 0.001, 0, 1),
    loginMinAttempts: number("LOGIN_MIN_ATTEMPTS", 10, 1, 1000),
    groqKey: process.env.GROQ_KEY || "",
    groqModel: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
    groqTimeoutMs: number("GROQ_TIMEOUT_MS", 10_000, 200, 30_000),
    groqMaxPerMinute: number("GROQ_MAX_PER_MINUTE", 20, 0, 10_000),
    groqMaxPerDay: number("GROQ_MAX_PER_DAY", 200, 0, 10_000),
  };
}

async function read(key) {
  try {
    const value = await cache.get(key);
    if (value !== null && value !== undefined) return value;
  } catch {
    // Keep the prototype functional if the regional cache is unavailable.
  }
  const entry = localCache.get(key);
  if (!entry) return null;
  if (entry.until <= Date.now()) {
    localCache.delete(key);
    return null;
  }
  return entry.value;
}

async function write(key, value, ttl) {
  if (localCache.size >= MAX_LOCAL_ENTRIES)
    localCache.delete(localCache.keys().next().value);
  localCache.set(key, { value, until: Date.now() + ttl * 1000 });
  try {
    await cache.set(key, value, { ttl, name: "" });
  } catch {
    // Regional cache failures should not break real website routes.
  }
}

function visitor(request) {
  const ip =
    ipAddress(request) ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local";
  return {
    ip,
    actor: digest(`${ip}\n${request.headers.get("user-agent") || ""}`),
  };
}

function interval(rate) {
  if (rate === 0) return Infinity;
  const mean = Math.min(100_000_000, Math.max(1, Math.round(1 / rate)));
  const min = Math.max(1, Math.ceil(mean * 0.8));
  const max = Math.max(min, Math.floor(mean * 1.2));
  return randomInt(min, max + 1);
}

async function suspiciousMiss(actor, path, options) {
  const key = `miss:${actor}`;
  const now = Date.now();
  const previous = await read(key);
  if (previous?.suspiciousUntil > now) return true;
  const paths = (Array.isArray(previous?.paths) ? previous.paths : []).filter(
    (item) => item?.at > now - options.windowMs,
  );
  const id = digest(path).slice(0, 16);
  if (!paths.some((item) => item.id === id)) paths.push({ id, at: now });
  const suspicious = paths.length >= options.minMisses;
  await write(
    key,
    suspicious
      ? { suspiciousUntil: now + options.windowMs }
      : { paths: paths.slice(-options.minMisses) },
    Math.ceil(options.windowMs / 1000),
  );
  return suspicious;
}

function selected(actor, path, rate) {
  if (rate === 0) return false;
  if (rate === 1) return true;
  const jitter =
    0.8 +
    (Number.parseInt(digest(`jitter:${actor}`).slice(0, 8), 16) / 0xffffffff) *
      0.4;
  const draw =
    Number.parseInt(digest(`path:${actor}:${path}`).slice(0, 8), 16) /
    0xffffffff;
  return draw < Math.min(1, rate * jitter);
}

async function allowModel(options) {
  const now = Date.now();
  if (await read("model-cooldown")) return false;
  const minute = `model-minute:${Math.floor(now / 60_000)}`;
  const day = `model-day:${Math.floor(now / 86_400_000)}`;
  const [minuteCount, dayCount] = await Promise.all([read(minute), read(day)]);
  if (
    (minuteCount || 0) >= options.groqMaxPerMinute ||
    (dayCount || 0) >= options.groqMaxPerDay
  )
    return false;
  await Promise.all([
    write(minute, (minuteCount || 0) + 1, 120),
    write(day, (dayCount || 0) + 1, 86_400),
  ]);
  return true;
}

async function allowDecoy(options) {
  const key = `decoy-day:${Math.floor(Date.now() / 86_400_000)}`;
  const count = (await read(key)) || 0;
  if (count >= options.decoyMaxPerDay) return false;
  await write(key, count + 1, 86_400);
  return true;
}

async function documentFor(path, format, options) {
  const key = documentKey(path);
  const cached = await read(key);
  if (cached?.body && cached?.contentType) return cached;
  if (inflight.has(key)) return inflight.get(key);
  const task = (async () => {
    if (!options.groqKey || !(await allowModel(options))) return null;
    try {
      const data = await generateData(path, options);
      const document = renderDocument(path, format, data);
      await write(key, document, DOCUMENT_CACHE_TTL_SECONDS);
      return document;
    } catch (error) {
      if (error.cooldownMs)
        await write("model-cooldown", true, Math.ceil(error.cooldownMs / 1000));
      console.warn(`Decoy generation failed for ${path}: ${error.message}`);
      return null;
    }
  })();
  inflight.set(key, task);
  try {
    return await task;
  } finally {
    inflight.delete(key);
  }
}

function page(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
      "content-security-policy":
        "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      "x-content-type-options": "nosniff",
    },
  });
}

function loginPage(error = false) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sign in | Core Defenses</title><style>body{margin:0;background:#f7f9fc;color:#172033;font:15px system-ui,sans-serif}header{background:#fff;border-bottom:1px solid #dce3ee;padding:20px max(24px,calc((100vw - 1100px)/2));font-weight:700;letter-spacing:.04em}main{box-sizing:border-box;max-width:420px;margin:11vh auto;padding:36px;background:#fff;border:1px solid #dce3ee}h1{font-size:28px;margin:0 0 8px}p{color:#516078;line-height:1.5;margin:0 0 28px}label{display:block;font-weight:600;margin:20px 0 8px}input{box-sizing:border-box;width:100%;padding:11px;border:1px solid #9ba9bc;font:inherit}button{width:100%;margin-top:26px;padding:12px;border:0;background:#1257e8;color:#fff;font:600 15px system-ui;cursor:pointer}.error{color:#aa2030;margin:16px 0 0}</style></head><body><header>CORE DEFENSES</header><main><h1>Sign in</h1><p>Access your account workspace.</p>${error ? '<p class="error" role="alert">Incorrect username or password.</p>' : ""}<form method="post" action="/login"><label for="username">Username</label><input id="username" name="username" autocomplete="username" required><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Sign in</button></form></main></body></html>`;
}

function portalPage() {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Account overview</title></head><body style="font:15px system-ui;max-width:800px;margin:8vh auto;color:#222"><h1>Account overview</h1><p>Welcome to the account workspace.</p><h2>Recent files</h2><ul><li><a href="/portal/records.txt">records.txt</a></li><li><a href="/portal/activity.json">activity.json</a></li></ul><a href="/portal/logout">Sign out</a></body></html>';
}

async function formCredentials(request) {
  if (
    request.headers.get("content-type")?.split(";", 1)[0].trim() !==
    "application/x-www-form-urlencoded"
  )
    return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 8192) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const form = new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
  const username = form.get("username");
  const password = form.get("password");
  if (!username || !password || username.length > 256 || password.length > 256)
    return null;
  return [username, password];
}

async function acceptLogin(request, credentials, options) {
  const credentialKey = `credential:${digest(JSON.stringify(credentials))}`;
  if (await read(credentialKey)) return true;
  const key = `login:${digest(visitor(request).ip)}`;
  const previous = await read(key);
  const attempts =
    (Number.isSafeInteger(previous?.attempts) ? previous.attempts : 0) + 1;
  const nextAt = Number.isSafeInteger(previous?.nextAt)
    ? previous.nextAt
    : interval(options.loginSuccessRate);
  const accepted = attempts >= Math.max(options.loginMinAttempts, nextAt);
  await write(
    key,
    {
      attempts,
      nextAt: accepted ? attempts + interval(options.loginSuccessRate) : nextAt,
    },
    86_400,
  );
  if (accepted) await write(credentialKey, true, 86_400);
  return accepted;
}

function sessionToken(request) {
  const cookie = request.headers.get("cookie") || "";
  const value = cookie
    .split(/;\s*/)
    .find((part) => part.startsWith("decoy_session="))
    ?.slice(14);
  return value && /^[A-Za-z0-9_-]{32}$/.test(value) ? value : null;
}

async function hasSession(request) {
  const token = sessionToken(request);
  return token ? Boolean(await read(`session:${token}`)) : false;
}

function redirect(location, cookie) {
  const headers = new Headers({
    location,
    "cache-control": "private, no-store",
  });
  if (cookie) headers.set("set-cookie", cookie);
  return new Response(null, { status: 302, headers });
}

function documentResponse(document, method) {
  return new Response(method === "HEAD" ? null : document.body, {
    headers: {
      "content-type": document.contentType,
      "content-length": String(Buffer.byteLength(document.body)),
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

export async function handleRequest(request) {
  const path = new URL(request.url).pathname;
  const method = request.method;
  const options = config();

  if (path === "/login") {
    if (method === "GET" || method === "HEAD")
      return page(method === "HEAD" ? null : loginPage());
    if (method !== "POST") return new Response(null, { status: 405 });
    const credentials = await formCredentials(request);
    if (credentials && (await acceptLogin(request, credentials, options))) {
      const token = randomBytes(24).toString("base64url");
      await write(`session:${token}`, true, 3600);
      await delay();
      return redirect(
        "/portal",
        `decoy_session=${token}; Path=/portal; Max-Age=3600; HttpOnly; SameSite=Lax${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`,
      );
    }
    await delay();
    return page(loginPage(true), 401);
  }

  if (method !== "GET" && method !== "HEAD")
    return new Response(null, { status: 405 });
  if (path === "/portal/logout") {
    return redirect(
      "/login",
      "decoy_session=; Path=/portal; Max-Age=0; HttpOnly; SameSite=Lax",
    );
  }
  if (path === "/portal" || path.startsWith("/portal/")) {
    if (!(await hasSession(request))) return redirect("/login");
    if (path === "/portal")
      return page(method === "HEAD" ? null : portalPage());
    const format = formatForPath(path);
    if (!format) return null;
    const document = await documentFor(path, format, options);
    await delay();
    return document ? documentResponse(document, method) : null;
  }

  const format = formatForPath(path);
  if (!format) return null;
  const cached = await read(documentKey(path));
  if (cached?.body && cached?.contentType) {
    await delay();
    return documentResponse(cached, method);
  }
  const { actor } = visitor(request);
  const suspicious = await suspiciousMiss(actor, path, options);
  if (!suspicious) return null;
  if (
    !selected(actor, path, options.decoyRate) ||
    !(await allowDecoy(options))
  ) {
    await delay();
    return null;
  }
  const document = await documentFor(path, format, options);
  await delay();
  return document ? documentResponse(document, method) : null;
}
