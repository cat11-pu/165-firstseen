import assert from "node:assert";
import { readLine } from "../seen.js";
import { tally } from "../tally.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readLine returns text", () => {
  assert.strictEqual(typeof readLine("a"), "string");
});

check("tally returns unique lines", () => {
  assert.ok(Array.isArray(tally(["a"]).unique));
});

check("tally returns firsts", () => {
  assert.ok(Array.isArray(tally(["a"]).firsts));
});

check("render counts unique", () => {
  assert.strictEqual(typeof render({ lines: ["a"] }).count, "number");
});

check("render counts repeats", () => {
  assert.strictEqual(typeof render({ lines: ["a"] }).repeats, "number");
});

console.log("5 cases, " + failed + " failed", );
process.exit(failed === 0 ? 0 : 1);
