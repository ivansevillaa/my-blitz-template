import { z } from "zod";

import { email, password } from "../types";

export const SignupInput = z.object({
  email,
  password,
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept sell your privacy",
  }),
});

export type SignupFormType = z.infer<typeof SignupInput>;
