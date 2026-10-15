import { z } from "zod";

export const PLATFORMS = ["Web", "iOS & Android", "Web + Mobile", "Not sure"] as const;
export const BUDGETS = ["Under $10k", "$10k - $25k", "$25k - $50k", "$50k+", "Not sure"] as const;
export const TIMELINES = ["Under 2 months", "2 - 4 months", "4 - 6 months", "Flexible"] as const;
export const STATUSES = ["New", "Contacted", "Won", "Lost"] as const;

export type Status = (typeof STATUSES)[number];

export const ideaInputSchema = z.object({
  idea: z.string().trim().min(20, "Please describe your idea in at least 20 characters.").max(2000, "Please keep the description under 2000 characters."),
  platform: z.enum(PLATFORMS).default("Not sure"),
  budget: z.enum(BUDGETS).default("Not sure"),
  timeline: z.enum(TIMELINES).default("Flexible"),
  web3: z.boolean().default(false),
});
export type IdeaInput = z.infer<typeof ideaInputSchema>;

export const proposalSchema = z.object({
  projectName: z.string().min(1).max(80),
  summary: z.string().min(1),
  objectives: z.array(z.string()).min(1).max(8),
  modules: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        priority: z.enum(["MVP", "Phase 2"]),
        features: z.array(z.string()).min(1).max(8),
      })
    )
    .min(2)
    .max(14),
  techStack: z
    .array(z.object({ layer: z.string(), technologies: z.array(z.string()).min(1), rationale: z.string() }))
    .min(2)
    .max(10),
  team: z
    .array(z.object({ role: z.string(), count: z.number().int().min(1).max(10), responsibilities: z.string() }))
    .min(2)
    .max(10),
  timeline: z
    .array(z.object({ phase: z.string(), duration: z.string(), deliverables: z.array(z.string()).min(1) }))
    .min(2)
    .max(8),
  totalDurationWeeks: z.number().int().min(2).max(104),
  cost: z.object({
    currency: z.string().default("USD"),
    min: z.number().positive(),
    max: z.number().positive(),
    assumptions: z.array(z.string()).max(8),
  }),
  risks: z.array(z.object({ risk: z.string(), mitigation: z.string() })).max(8),
  nextSteps: z.array(z.string()).min(1).max(6),
});
export type Proposal = z.infer<typeof proposalSchema>;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  company: z.string().trim().max(150).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(1000).optional().default(""),
});
export type LeadInput = z.infer<typeof leadSchema>;
