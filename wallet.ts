import { z } from "zod";

export const buySellSchema = z.object({
  asset: z.string().min(1, "Select an asset"),
  amountUsd: z.coerce.number().positive("Enter an amount greater than 0"),
  paymentMethod: z.enum(["BALANCE", "CARD", "BANK_TRANSFER"]),
});
export type BuySellInput = z.infer<typeof buySellSchema>;

export const swapSchema = z
  .object({
    fromAsset: z.string().min(1, "Select an asset"),
    toAsset: z.string().min(1, "Select an asset"),
    amount: z.coerce.number().positive("Enter an amount greater than 0"),
  })
  .refine((data) => data.fromAsset !== data.toAsset, {
    message: "Choose two different assets",
    path: ["toAsset"],
  });
export type SwapInput = z.infer<typeof swapSchema>;

export const sendSchema = z.object({
  asset: z.string().min(1, "Select an asset"),
  amount: z.coerce.number().positive("Enter an amount greater than 0"),
  address: z
    .string()
    .min(20, "Enter a valid wallet address")
    .max(64, "Enter a valid wallet address"),
  note: z.string().max(140, "Note must be under 140 characters").optional(),
});
export type SendInput = z.infer<typeof sendSchema>;

export const withdrawSchema = z.object({
  asset: z.string().min(1, "Select an asset"),
  amount: z.coerce.number().positive("Enter an amount greater than 0"),
  destination: z
    .string()
    .min(20, "Enter a valid destination address")
    .max(64, "Enter a valid destination address"),
  twoFactorCode: z
    .string()
    .length(6, "Enter the 6-digit code from your authenticator app"),
});
export type WithdrawInput = z.infer<typeof withdrawSchema>;

export const priceAlertSchema = z.object({
  asset: z.string().min(1, "Select an asset"),
  condition: z.enum(["ABOVE", "BELOW"]),
  targetPrice: z.coerce.number().positive("Enter a target price greater than 0"),
});
export type PriceAlertInput = z.infer<typeof priceAlertSchema>;
