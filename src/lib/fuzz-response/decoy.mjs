import { createHash } from "node:crypto";

const MIME = {
  txt: "text/plain; charset=utf-8",
  csv: "text/csv; charset=utf-8",
  json: "application/json; charset=utf-8",
  jsonl: "application/x-ndjson; charset=utf-8",
  tsv: "text/tab-separated-values; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  yaml: "application/yaml; charset=utf-8",
  html: "text/html; charset=utf-8",
};
const ALIAS = {
  log: "txt",
  md: "txt",
  php: "html",
  asp: "html",
  aspx: "html",
  jsp: "html",
  yml: "yaml",
};
const FIRST = [
  "Mara",
  "Elias",
  "Nora",
  "Theo",
  "Leah",
  "Owen",
  "Iris",
  "Jonah",
  "Mina",
  "Caleb",
  "Ada",
  "Miles",
  "Elena",
  "Noah",
  "Talia",
  "Reed",
  "Sana",
  "Felix",
  "Lena",
  "Arden",
];
const LAST = [
  "Vale",
  "Rowan",
  "Bell",
  "Mercer",
  "Hale",
  "Sloan",
  "Quinn",
  "Ellis",
  "Hart",
  "Voss",
  "Larkin",
  "Bennett",
  "Keane",
  "Marlow",
  "Dunn",
  "Keller",
  "Brooks",
  "Perry",
  "Stone",
  "Wells",
];
const ORG_FIRST = [
  "Aster",
  "Cedar",
  "Northstar",
  "Meridian",
  "Summit",
  "Harbor",
  "Redwood",
  "Cobalt",
  "Pioneer",
  "Keystone",
  "Atlas",
  "Ridgeway",
  "Clearwater",
  "Granite",
  "Solstice",
  "Westbridge",
];
const ORG_LAST = [
  "Systems",
  "Energy",
  "Research",
  "Analytics",
  "Technologies",
  "Infrastructure",
  "Industries",
  "Engineering",
  "Networks",
  "Solutions",
];
const JOBS = [
  ["Systems Engineer", "Engineering"],
  ["Security Engineer", "Security"],
  ["Data Engineer", "Data"],
  ["RF Engineer", "Engineering"],
  ["Software Engineer", "Engineering"],
  ["Site Reliability Engineer", "Infrastructure"],
  ["Quality Assurance Engineer", "Quality"],
  ["Technical Program Manager", "Programs"],
  ["Field Service Engineer", "Field Operations"],
  ["Product Security Analyst", "Security"],
  ["Research Scientist", "Research"],
  ["Infrastructure Engineer", "Infrastructure"],
  ["Technical Writer", "Product"],
  ["Solutions Architect", "Product"],
  ["Test Engineer", "Quality"],
  ["Project Coordinator", "Programs"],
];

export function formatForPath(path) {
  if (!/^\/[a-zA-Z0-9_./-]{1,180}$/.test(path) || path.includes(".."))
    return null;
  if (/^\/(?:_next|api|\.git|__fuzz)(?:\/|$)/i.test(path)) return null;
  if (/\.(?:js|css|map|png|jpe?g|gif|webp|svg|ico|woff2?|pdf)$/i.test(path))
    return null;
  const extension = path
    .split("/")
    .at(-1)
    .match(/\.([a-z0-9]+)$/i)?.[1]
    ?.toLowerCase();
  const format = ALIAS[extension] || extension;
  return extension ? (MIME[format] ? format : null) : "html";
}

function category(path) {
  if (/patient|medical|clinic|health/i.test(path)) return "patient";
  if (/(?:^|[/_.-])accounts?(?:$|[/_.-])/i.test(path)) return "account";
  if (/listing|career|vacanc|position|job-open|job_list/i.test(path))
    return "listing";
  if (/customer|client|account|subscriber/i.test(path)) return "customer";
  if (/staff|employee|personnel|users/i.test(path)) return "staff";
  if (/inventory|assets|equipment|hardware/i.test(path)) return "inventory";
  if (/audit|events|activity|logs?|errors?/i.test(path)) return "audit";
  if (/invoice|billing|payment|finance/i.test(path)) return "finance";
  if (/ticket|support|issues/i.test(path)) return "support";
  if (/project|task|milestone/i.test(path)) return "project";
  return "operations";
}

function isNarrative(path, format) {
  return (
    ["txt", "html"].includes(format) &&
    /readme|report|notes|policy|manual|guide|overview/i.test(path)
  );
}

function clean(value, max = 100) {
  return String(value ?? "")
    .replace(/[\x00-\x1f\x7f<>]/g, " ")
    .trim()
    .slice(0, max);
}

function cleanNarrative(value) {
  return String(value ?? "")
    .replace(/[\x00-\x09\x0b-\x1f\x7f<>]/g, " ")
    .trim()
    .slice(0, 12_000);
}

function validatePlan(data) {
  if (!data || !Array.isArray(data.columns)) return null;
  const allowed = new Set([
    "id",
    "person",
    "organization",
    "date",
    "datetime",
    "number",
    "amount",
    "category",
    "text",
  ]);
  const meta =
    /\b(?:plausible|fictional|fake|mock|sample|synthetic|simulated|simulation|training|generated|placeholder)\b/i;
  if (meta.test(`${data.title || ""} ${data.description || ""}`)) return null;
  const keys = new Set();
  const columns = data.columns
    .slice(0, 9)
    .map((column) => {
      const key = clean(column?.key, 32)
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "_");
      const label = clean(column?.label, 40);
      const type = clean(column?.type, 20).toLowerCase();
      const values = Array.isArray(column?.values)
        ? column.values
            .slice(0, 12)
            .map((v) => clean(v, 100))
            .filter(Boolean)
        : [];
      if (
        !/^[a-z][a-z0-9_]*$/.test(key) ||
        !label ||
        meta.test(`${key} ${label}`) ||
        !allowed.has(type) ||
        keys.has(key)
      )
        return null;
      if (["category", "text"].includes(type) && values.length < 3) return null;
      if (
        values.some(
          (value) =>
            meta.test(value) ||
            /;|\b(?:combat|infiltration|exfiltration|medevac)\b/i.test(value),
        )
      )
        return null;
      if (
        /country|language/i.test(key) &&
        values.some((value) => /[;,/]/.test(value))
      )
        return null;
      keys.add(key);
      return { key, label, type, values };
    })
    .filter(Boolean);
  if (columns.length < 4) return null;
  return {
    kind: "records",
    title: clean(data.title, 70) || "Records",
    description: clean(data.description, 240),
    columns,
  };
}

function randomFor(path) {
  let state = createHash("sha256").update(path).digest().readUInt32LE(0) || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x1_0000_0000;
  };
}

function countFor(path, format) {
  if (category(path) === "listing") return format === "html" ? 24 : 42;
  if (format === "html")
    return 60 + (createHash("sha256").update(path).digest()[0] % 81);
  return {
    account: 160,
    patient: 250,
    customer: 220,
    staff: 140,
    inventory: 180,
    audit: 300,
    finance: 180,
    support: 160,
    project: 120,
    operations: 140,
  }[category(path)];
}

function rowValue(column, index, rand, group, context) {
  const choose = (values) => values[Math.floor(rand() * values.length)];
  if (column.type === "id")
    return `${{ account: "AC", listing: "RQ", patient: "PT", customer: "CU", staff: "ST", inventory: "AS", audit: "EV", finance: "IV", support: "TK", project: "PR" }[group] || "REC"}-${String(100001 + index).padStart(6, "0")}`;
  if (column.type === "person") return context.person;
  if (column.type === "organization") return context.organization;
  if (column.type === "date" || column.type === "datetime") {
    let time;
    if (group === "account" && /last_activity/i.test(column.key)) {
      time = context.lastActivity;
    } else if (/birth|dob/i.test(column.key)) {
      time = Date.UTC(1952, 0, 1) + Math.floor(rand() * 20_000) * 86_400_000;
    } else if (
      /created|opened|start|issued|posted|received|hired/i.test(column.key)
    ) {
      time = context.created;
    } else if (/due|renewal|expir|closing/i.test(column.key)) {
      time = context.created + Math.floor((30 + rand() * 335) * 86_400_000);
    } else {
      time =
        context.created + Math.floor(rand() * (context.now - context.created));
    }
    if (column.type === "datetime")
      time = Math.min(time + Math.floor(rand() * 86_400_000), Date.now());
    const date = new Date(time);
    return column.type === "datetime"
      ? date.toISOString().replace(".000Z", "Z")
      : date.toISOString().slice(0, 10);
  }
  if (column.type === "amount") return (50 + rand() * 48_000).toFixed(2);
  if (column.type === "number") {
    if (/seats?/i.test(column.key))
      return String(
        context.tier === "Enterprise"
          ? 30 + Math.floor(rand() * 180)
          : 3 + Math.floor(rand() * 35),
      );
    return String(
      1 + Math.floor(rand() * (/progress/i.test(column.key) ? 100 : 500)),
    );
  }
  if (group === "listing" && /position|title/i.test(column.key))
    return context.job[0];
  if (group === "listing" && /team|department/i.test(column.key))
    return context.job[1];
  if (group === "listing" && /location/i.test(column.key))
    return context.location;
  if (group === "listing" && /work_mode/i.test(column.key))
    return context.workMode;
  if (group === "listing" && /status/i.test(column.key))
    return context.listingStatus;
  if (group === "account" && /(?:service_)?tier|plan/i.test(column.key))
    return context.tier;
  if (group === "account" && /status/i.test(column.key))
    return context.accountStatus;
  if (column.type === "category") return choose(column.values);
  return choose(column.values);
}

function makeRows(path, plan, format) {
  const rand = randomFor(path);
  const group = category(path);
  const today = new Date();
  const now = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  const shuffle = (values) => {
    const items = [...values];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  };
  const persons = shuffle(
    FIRST.flatMap((first) => LAST.map((last) => `${first} ${last}`)),
  );
  const organizations = shuffle(
    ORG_FIRST.flatMap((first) => ORG_LAST.map((last) => `${first} ${last}`)),
  );
  const locations = [
    "Arlington, VA",
    "Indianapolis, IN",
    "San Diego, CA",
    "Remote - US",
    "Austin, TX",
  ];
  return Array.from({ length: countFor(path, format) }, (_, index) => {
    const created = now - Math.floor((30 + rand() * 1320) * 86_400_000);
    const ageDays = (now - created) / 86_400_000;
    const statusDraw = rand();
    const accountStatus =
      ageDays < 90 && statusDraw < 0.35
        ? "Pending"
        : statusDraw < 0.78
          ? "Active"
          : statusDraw < 0.9
            ? "Suspended"
            : "Closed";
    const activityDaysAgo =
      accountStatus === "Active"
        ? rand() * 60
        : accountStatus === "Pending"
          ? rand() * 30
          : 30 + rand() * 300;
    const location = locations[Math.floor(rand() * locations.length)];
    const context = {
      now,
      created,
      person: persons[index % persons.length],
      organization: organizations[index % organizations.length],
      job: JOBS[Math.floor(rand() * JOBS.length)],
      location,
      workMode:
        location === "Remote - US"
          ? "Remote"
          : rand() < 0.55
            ? "On-site"
            : "Hybrid",
      tier: ["Standard", "Enterprise", "Government", "Partner"][
        Math.floor(rand() * 4)
      ],
      accountStatus,
      lastActivity: Math.max(
        created + 86_400_000,
        now - Math.floor(activityDaysAgo * 86_400_000),
      ),
      listingStatus:
        ageDays < 120
          ? rand() < 0.7
            ? "Open"
            : "Interviewing"
          : rand() < 0.7
            ? "Filled"
            : "Closed",
    };
    return Object.fromEntries(
      plan.columns.map((column) => [
        column.key,
        rowValue(column, index, rand, group, context),
      ]),
    );
  });
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

function csv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function renderDocument(path, format, data) {
  if (data.kind === "document") {
    const body =
      format === "html"
        ? `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(data.title)}</title></head><body style="font:16px/1.6 system-ui;max-width:760px;margin:4rem auto;color:#222"><h1>${escapeHtml(data.title)}</h1>${data.body
            .split(/\n\n+/)
            .map((p) => `<p>${escapeHtml(p).replaceAll("\n", "<br>")}</p>`)
            .join("")}</body></html>`
        : `${data.title}\n\n${data.body}\n`;
    return { body, contentType: MIME[format], path };
  }
  const rows = makeRows(path, data, format);
  const { title, description, columns } = data;
  let body;
  if (format === "json") {
    body =
      JSON.stringify(
        { title, description, count: rows.length, records: rows },
        null,
        2,
      ) + "\n";
  } else if (format === "jsonl") {
    body = rows.map((row) => JSON.stringify(row)).join("\n") + "\n";
  } else if (format === "csv") {
    body =
      columns.map((c) => csv(c.label)).join(",") +
      "\n" +
      rows
        .map((row) => columns.map((c) => csv(row[c.key])).join(","))
        .join("\n") +
      "\n";
  } else if (format === "tsv") {
    body =
      columns.map((c) => c.label).join("\t") +
      "\n" +
      rows.map((row) => columns.map((c) => row[c.key]).join("\t")).join("\n") +
      "\n";
  } else if (format === "xml") {
    body =
      `<?xml version="1.0" encoding="UTF-8"?>\n<records title="${escapeHtml(title)}" count="${rows.length}">\n` +
      rows
        .map(
          (row) =>
            `  <record>${columns.map((c) => `<${c.key}>${escapeHtml(row[c.key])}</${c.key}>`).join("")}</record>`,
        )
        .join("\n") +
      "\n</records>\n";
  } else if (format === "yaml") {
    body =
      `title: ${JSON.stringify(title)}\ncount: ${rows.length}\nrecords:\n` +
      rows
        .map((row) =>
          columns
            .map(
              (c, i) =>
                `  ${i ? "  " : "- "}${c.key}: ${JSON.stringify(row[c.key])}`,
            )
            .join("\n"),
        )
        .join("\n") +
      "\n";
  } else if (format === "txt") {
    body =
      `${title}\n${"=".repeat(title.length)}\n${description}\nRecords: ${rows.length}\n\n${columns.map((c) => c.label).join(" | ")}\n` +
      rows.map((row) => columns.map((c) => row[c.key]).join(" | ")).join("\n") +
      "\n";
  } else {
    body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head><body style="font:14px/1.5 system-ui;max-width:1100px;margin:4rem auto;color:#222"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><p>${rows.length} records</p><table border="1" cellpadding="7" cellspacing="0"><thead><tr>${columns.map((c) => `<th>${escapeHtml(c.label)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${columns.map((c) => `<td>${escapeHtml(row[c.key])}</td>`).join("")}</tr>`).join("")}</tbody></table></body></html>`;
  }
  return { body, contentType: MIME[format], path };
}

export async function generateData(path, config, fetchImpl = fetch) {
  const format = formatForPath(path);
  if (!format) throw new Error("Unsupported decoy path");
  if (!config.groqKey) throw new Error("Groq is not configured");
  const narrative = isNarrative(path, format);
  const response = await fetchImpl(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.groqKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: config.groqModel,
        reasoning_effort: "low",
        reasoning_format: "hidden",
        ...(narrative ? {} : { response_format: { type: "json_object" } }),
        max_completion_tokens: narrative ? 4000 : 2400,
        messages: [
          {
            role: "user",
            content: narrative
              ? `Write an ordinary internal operational document for a corporate engineering website about ${path.split("/").at(-1)}. Use 7-10 titled sections and 700-1000 words of concrete process details, owners, dates, and review steps. Invent every identity and identifier. Return only the document text, with no preface, disclaimer, or explanation.`
              : `The requested path is ${path}. It belongs to an engineering company with data analytics and secure communications products. Design a routine internal data export appropriate to this path. Return only JSON with title, description, and columns. Give 5-8 useful columns. Each column has key (snake_case), label, type (id, person, organization, date, datetime, number, amount, category, or text), and values (array). Give 6-12 distinct, single values for category and text columns; other columns use empty arrays. Use one ID column. Invent every identity and identifier. Avoid combat or military mission data unless the path explicitly requests it. The visible title, description, labels, and values must never mention fake, fictional, synthetic, mock, sample, generated, simulation, or training.`,
          },
        ],
      }),
      signal: AbortSignal.timeout(config.groqTimeoutMs),
    },
  );
  if (!response.ok) {
    const error = new Error(`Groq HTTP ${response.status}`);
    if (response.status === 429) {
      const retry = Number(response.headers?.get("retry-after"));
      error.cooldownMs =
        Number.isFinite(retry) && retry > 0
          ? Math.max(60_000, Math.min(retry * 1000, 300_000))
          : 60_000;
    }
    throw error;
  }
  const result = await response.json();
  const content = result.choices?.[0]?.message?.content || "";
  if (narrative) {
    const body = cleanNarrative(content);
    if (
      body.length < 1500 ||
      /\b(?:fictional|fake|mock|synthetic|simulated|simulation|placeholder)\b|\b(?:AI[- ]generated|generated by (?:an? )?(?:AI|language model))\b/i.test(
        body,
      )
    ) {
      throw new Error("Narrative failed validation");
    }
    return {
      kind: "document",
      title: clean(
        path
          .split("/")
          .at(-1)
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]/g, " "),
        70,
      ),
      body,
    };
  }
  const plan = validatePlan(JSON.parse(content));
  if (!plan) throw new Error("Invalid model schema");
  return plan;
}
