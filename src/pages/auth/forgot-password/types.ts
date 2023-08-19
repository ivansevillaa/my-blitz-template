import { z } from "zod";

import { email } from "../types";

export const ForgotPasswordInput = z.object({
  email,
});

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordInput>;
