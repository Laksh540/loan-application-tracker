import { describe, expect, it } from "vitest";
import { canTransition } from "./statusRule";

describe("canTransition", () => {
  it("allows Submitted → Under Review", () => {
    expect(canTransition("submitted", "under_review")).toBe(true);
  });

  it("allows Under Review → Approved", () => {
    expect(canTransition("under_review", "approved")).toBe(true);
  });

  it("allows Under Review → Rejected", () => {
    expect(canTransition("under_review", "rejected")).toBe(true);
  });

  it("prevents skipping Submitted → Approved", () => {
    expect(canTransition("submitted", "approved")).toBe(false);
  });

  it("prevents backward Under Review → Submitted", () => {
    expect(canTransition("under_review", "submitted")).toBe(false);
  });

  it("prevents changes from Approved", () => {
    expect(canTransition("approved", "rejected")).toBe(false);
  });

  it("prevents changes from Rejected", () => {
    expect(canTransition("rejected", "approved")).toBe(false);
  });
});
