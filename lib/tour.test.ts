import { test } from "node:test";
import assert from "node:assert/strict";
import { parseTour } from "./tour.ts";

const form = (o: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(o)) f.set(k, v);
  return f;
};

test("valid request has no errors and is trimmed", () => {
  const { fields, errors } = parseTour(form({ name: "  Meron ", phone: "(425) 555-0123", relationship: "My parent" }));
  assert.deepEqual(errors, {});
  assert.equal(fields.name, "Meron");
  assert.equal(fields.relationship, "My parent");
});

test("missing name, short phone and bad email are reported", () => {
  const { errors } = parseTour(form({ name: " ", phone: "555-0123", email: "nope" }));
  assert.ok(errors.name && errors.phone && errors.email);
});

test("unknown relationship is dropped, long message is capped", () => {
  const { fields } = parseTour(form({ name: "A", phone: "4255550123", relationship: "<script>", message: "x".repeat(5000) }));
  assert.equal(fields.relationship, "");
  assert.equal(fields.message.length, 2000);
});
