import { z } from "zod";

export const ReadinessInputSchema = z.object({
  projectName: z.string().min(1),
  description: z.string().min(20),
  website: z.string().url().optional(),
  whitepaperUrl: z.string().url().optional(),
  teamDisclosed: z.boolean(),
  tokenomics: z.object({
    totalSupply: z.number().positive(),
    decimals: z.number().int().min(0).max(18),
    hasVesting: z.boolean(),
  }),
  testnetDeployed: z.boolean(),
  auditReportUrl: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
});

export type ReadinessInput = z.infer<typeof ReadinessInputSchema>;

export interface ReadinessCheck {
  id: string;
  label: string;
  pass: boolean;
  detail: string;
}

export interface ReadinessReport {
  projectName: string;
  score: number; // 0..100
  overall: "ready" | "not_ready";
  checks: ReadinessCheck[];
  disclaimer: string;
}
