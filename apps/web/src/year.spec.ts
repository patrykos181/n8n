import { describe, expect, it } from "vitest";

import { getCurrentYear, renderCurrentYear } from "./year";

describe("year helpers", () => {
  it("returns current year from provided date", () => {
    const result = getCurrentYear(new Date("2030-06-01T12:00:00.000Z"));

    expect(result).toBe("2030");
  });

  it("renders year into provided element", () => {
    const element = document.createElement("span");

    renderCurrentYear(element, new Date("2042-01-01T00:00:00.000Z"));

    expect(element.textContent).toBe("2042");
  });
});
