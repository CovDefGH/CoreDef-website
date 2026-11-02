import test from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../src/lib/fuzz-response/service.mjs";
import { generateData } from "../src/lib/fuzz-response/decoy.mjs";

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
  const originalFetch = globalThis.fetch;
  let modelCalls = 0;
  const plan = {
    title: "Patient Registry",
    description: "Patient intake and care records.",
    seeds: {
      first_names: Array.from({ length: 16 }, (_, index) => `Given${index}`),
      last_names: Array.from({ length: 16 }, (_, index) => `Family${index}`),
      organization_prefixes: [],
      organization_suffixes: [],
      roles: [],
      locations: [],
    },
    columns: [
      { key: "patient_id", label: "Patient ID", type: "id", values: [] },
      {
        key: "patient_name",
        label: "Patient Name",
        type: "person",
        values: [],
      },
      { key: "intake_date", label: "Intake Date", type: "date", values: [] },
      {
        key: "status",
        label: "Status",
        type: "category",
        values: ["Active", "Follow-up", "Closed"],
      },
      {
        key: "care_team",
        label: "Care Team",
        type: "text",
        values: ["North Clinic", "East Clinic", "West Clinic"],
      },
    ],
  };
  globalThis.fetch = async (url, options) => {
    if (String(url) !== "https://api.groq.com/openai/v1/chat/completions")
      return originalFetch(url, options);
    modelCalls++;
    return new Response(
      JSON.stringify({
        choices: [{ message: { content: JSON.stringify(plan) } }],
      }),
      { status: 200 },
    );
  };
  Object.assign(process.env, {
    FUZZ_MIN_DISTINCT_MISSES: "2",
    DECOY_RATE: "1",
    LOGIN_MIN_ATTEMPTS: "2",
    LOGIN_SUCCESS_RATE: "1",
    GROQ_KEY: "test-key",
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
    assert.match(body, /Given\d+ Family\d+/);
    assert.doesNotMatch(body, /Mara Vale|Elias Ellis/);
    const reopened = await handleRequest(
      new Request("http://localhost:3000/patients.txt", { headers: browser }),
    );
    assert.equal(await reopened.text(), body);
    assert.equal(modelCalls, 1);
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
    globalThis.fetch = originalFetch;
    for (const name of names) {
      if (old[name] === undefined) delete process.env[name];
      else process.env[name] = old[name];
    }
  }
});

test("a failed model call does not serve or cache a local template", async () => {
  const names = ["FUZZ_MIN_DISTINCT_MISSES", "DECOY_RATE", "GROQ_KEY"];
  const old = Object.fromEntries(
    names.map((name) => [name, process.env[name]]),
  );
  const originalFetch = globalThis.fetch;
  let modelCalls = 0;
  Object.assign(process.env, {
    FUZZ_MIN_DISTINCT_MISSES: "1",
    DECOY_RATE: "1",
    GROQ_KEY: "test-key",
  });
  globalThis.fetch = async () => {
    modelCalls++;
    return new Response("Unavailable", { status: 503 });
  };
  try {
    const request = () =>
      new Request("http://localhost:3000/model-failure-423.csv", {
        headers: {
          "user-agent": "model-failure-test",
          "x-forwarded-for": "192.0.2.231",
        },
      });
    assert.equal(await handleRequest(request()), null);
    assert.equal(await handleRequest(request()), null);
    assert.equal(modelCalls, 2);
    process.env.GROQ_KEY = "";
    assert.equal(
      await handleRequest(
        new Request("http://localhost:3000/no-model-423.csv", {
          headers: {
            "user-agent": "model-failure-test",
            "x-forwarded-for": "192.0.2.231",
          },
        }),
      ),
      null,
    );
    assert.equal(modelCalls, 2);
  } finally {
    globalThis.fetch = originalFetch;
    for (const name of names) {
      if (old[name] === undefined) delete process.env[name];
      else process.env[name] = old[name];
    }
  }
});

test("report validation accepts ordinary wording but rejects fake-data disclosures", async () => {
  const config = {
    groqKey: "test-key",
    groqModel: "openai/gpt-oss-20b",
    groqTimeoutMs: 10_000,
  };
  const modelResponse = (content) => async () =>
    new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
      status: 200,
    });
  const ordinary =
    "The maintenance register was generated after the monthly review. ".repeat(
      40,
    );
  const accepted = await generateData(
    "/internal-report.txt",
    config,
    modelResponse(ordinary),
  );
  assert.equal(accepted.kind, "document");
  assert.match(accepted.body, /was generated after/);
  const disclosure = "This is a fictional report for demonstration. ".repeat(
    40,
  );
  await assert.rejects(
    generateData("/internal-report.txt", config, modelResponse(disclosure)),
    /Narrative failed validation/,
  );
});
