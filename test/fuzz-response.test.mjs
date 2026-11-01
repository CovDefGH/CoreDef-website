import test from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../src/lib/fuzz-response/service.mjs";

test("missing paths become stable decoys, and selected login credentials can be reused", async () => {
  const names = [
    "FUZZ_MIN_DISTINCT_MISSES",
    "DECOY_RATE",
    "LOGIN_MIN_ATTEMPTS",
    "LOGIN_SUCCESS_RATE",
    "GROQ_KEY",
  ];
  const old = Object.fromEntries(
    names.map((name) => [name, process.env[name]]),
  );
  Object.assign(process.env, {
    FUZZ_MIN_DISTINCT_MISSES: "2",
    DECOY_RATE: "1",
    LOGIN_MIN_ATTEMPTS: "2",
    LOGIN_SUCCESS_RATE: "1",
    GROQ_KEY: "",
  });
  try {
    const scanner = {
      "user-agent": "scanner-test",
      "x-forwarded-for": "192.0.2.101",
    };
    const browser = {
      "user-agent": "browser-test",
      "x-forwarded-for": "192.0.2.102",
    };
    const firstMiss = await handleRequest(
      new Request("http://localhost:3000/first-missing-path", {
        headers: scanner,
      }),
    );
    assert.equal(firstMiss, null);
    const decoy = await handleRequest(
      new Request("http://localhost:3000/patients.txt", { headers: scanner }),
    );
    assert.equal(decoy.status, 200);
    assert.match(decoy.headers.get("content-type"), /^text\/plain/);
    const body = await decoy.text();
    assert.match(body, /Records: 250/);
    assert.ok(body.length > 15_000);
    const reopened = await handleRequest(
      new Request("http://localhost:3000/patients.txt", { headers: browser }),
    );
    assert.equal(await reopened.text(), body);
    assert.equal(
      await handleRequest(
        new Request("http://localhost:3000/missing.js", { headers: scanner }),
      ),
      null,
    );

    const login = await handleRequest(
      new Request("http://localhost:3000/login", { headers: browser }),
    );
    assert.equal(login.status, 200);
    assert.match(await login.text(), /name="password"/);
    const post = (headers) =>
      handleRequest(
        new Request("http://localhost:3000/login", {
          method: "POST",
          headers: {
            ...headers,
            "content-type": "application/x-www-form-urlencoded",
          },
          body: "username=admin&password=guess00001",
        }),
      );
    assert.equal((await post(scanner)).status, 401);
    const success = await post(scanner);
    assert.equal(success.status, 302);
    assert.equal(success.headers.get("location"), "/portal");
    const cookie = success.headers.get("set-cookie").split(";")[0];
    const portal = await handleRequest(
      new Request("http://localhost:3000/portal", {
        headers: { ...browser, cookie },
      }),
    );
    assert.equal(portal.status, 200);
    assert.match(await portal.text(), /Recent files/);
    assert.equal((await post(browser)).status, 302);
    const rejected = await handleRequest(
      new Request("http://localhost:3000/portal", {
        headers: { ...browser, cookie: `${cookie}bad` },
      }),
    );
    assert.equal(rejected.status, 302);
    assert.equal(rejected.headers.get("location"), "/login");
  } finally {
    for (const name of names) {
      if (old[name] === undefined) delete process.env[name];
      else process.env[name] = old[name];
    }
  }
});
