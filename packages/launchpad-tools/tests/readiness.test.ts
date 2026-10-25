import { describe, it, expect } from "vitest";
import { checkReadiness } from "../src/index.js";

describe("launchpad readiness", () => {
  const base = {
    projectName: "Demo",
    description: "A sufficiently long description for the project.",
    teamDisclosed: true,
    tokenomics: { totalSupply: 1000, decimals: 18, hasVesting: true },
    testnetDeployed: true,
  };

  it("ready when all required pass", () => {
    const r = checkReadiness(base);
    expect(r.overall).toBe("ready");
    expect(r.score).toBe(100);
  });

  it("not ready when testnet missing", () => {
    const r = checkReadiness({ ...base, testnetDeployed: false });
    expect(r.overall).toBe("not_ready");
    expect(r.score).toBeLessThan(100);
  });

  it("rejects invalid input", () => {
    expect(() => checkReadiness({ projectName: "" })).toThrow();
  });

  it("includes disclaimer", () => {
    const r = checkReadiness(base);
    expect(r.disclaimer).toContain("does NOT imply audit");
  });
});
