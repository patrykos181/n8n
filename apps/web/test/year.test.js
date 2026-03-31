import test from "node:test";
import assert from "node:assert/strict";

import { getCurrentYear } from "../dist/year.js";

test("getCurrentYear zwraca rok z podanej daty", () => {
  const result = getCurrentYear(new Date("2030-06-01T12:00:00.000Z"));

  assert.equal(result, "2030");
});
