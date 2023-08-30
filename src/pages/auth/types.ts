import { TokenType } from "db";
import { z } from "zod";

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(8)
  .max(100)
  .transform((str) => str.trim());

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
});

export type SendVerifyEmailParams = {
  userId: string;
  userEmail: string;
};

export type GenerateTokenParams = SendVerifyEmailParams & {
  tokenType: TokenType;
};
