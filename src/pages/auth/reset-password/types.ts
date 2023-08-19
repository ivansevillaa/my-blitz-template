import { z } from "zod";

import { password } from "../types";

export const ResetPasswordInput = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  });

export type ResetPasswordFormType = z.infer<typeof ResetPasswordInput>;
