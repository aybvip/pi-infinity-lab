import { ReadinessInputSchema, type ReadinessInput, type ReadinessCheck, type ReadinessReport } from "./types.js";

export function checkReadiness(raw: unknown): ReadinessReport {
  const input: ReadinessInput = ReadinessInputSchema.parse(raw);

  const checks: ReadinessCheck[] = [];

  const add = (id: string, label: string, pass: boolean, detail: string) =>
    checks.push({ id, label, pass, detail });

  add("name", "Project name present", !!input.projectName, input.projectName);
  add("description", "Description at least 20 chars", input.description.length >= 20, `${input.description.length} chars`);
  add("website", "Website URL provided", !!input.website, input.website ?? "missing");
  add("whitepaper", "Whitepaper URL provided", !!input.whitepaperUrl, input.whitepaperUrl ?? "missing");
  add("team", "Team disclosed", input.teamDisclosed, input.teamDisclosed ? "yes" : "no");
  add("supply", "Total supply positive", input.tokenomics.totalSupply > 0, String(input.tokenomics.totalSupply));
  add("decimals", "Decimals in range 0..18", input.tokenomics.decimals >= 0 && input.tokenomics.decimals <= 18, String(input.tokenomics.decimals));
  add("vesting", "Vesting schedule present", input.tokenomics.hasVesting, input.tokenomics.hasVesting ? "yes" : "no");
  add("testnet", "Testnet deployment done", input.testnetDeployed, input.testnetDeployed ? "yes" : "no");
  add("audit", "Audit report provided (optional, informational)", !!input.auditReportUrl, input.auditReportUrl ?? "not provided");
  add("contact", "Contact email provided (optional)", !!input.contactEmail, input.contactEmail ?? "not provided");

  const requiredIds = ["name", "description", "team", "supply", "decimals", "vesting", "testnet"];
  const passedRequired = checks.filter((c) => requiredIds.includes(c.id) && c.pass).length;
  const score = Math.round((passedRequired / requiredIds.length) * 100);
  const overall = passedRequired === requiredIds.length ? "ready" : "not_ready";

  return {
    projectName: input.projectName,
    score,
    overall,
    checks,
    disclaimer:
      "Automated readiness check using explicitly provided inputs. Passing does NOT imply audit, safety, or approval. Not financial advice.",
  };
}
