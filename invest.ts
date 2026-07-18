import { z } from "zod";

export const stakeSchema = z.object({
  asset: z.string().min(1, "Select an asset"),
  amount: z.coerce.number().positive("Enter an amount greater than 0"),
  lockPeriodDays: z.coerce.number().int().positive(),
});
export type StakeInput = z.infer<typeof stakeSchema>;

export const dcaPlanSchema = z.object({
  asset: z.string().min(1, "Select an asset"),
  amountUsd: z.coerce.number().positive("Enter an amount greater than 0"),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY"]),
});
export type DcaPlanInput = z.infer<typeof dcaPlanSchema>;

export const autoInvestSchema = z.object({
  riskProfile: z.enum(["CONSERVATIVE", "BALANCED", "AGGRESSIVE"]),
  amountUsd: z.coerce.number().positive("Enter an amount greater than 0"),
  frequency: z.enum(["WEEKLY", "MONTHLY"]),
});
export type AutoInvestInput = z.infer<typeof autoInvestSchema>;
