import { z } from "zod";

import { email, password } from "../types";

export const SignupInput = z.object({
  email,
  password,
});

export type SignupFormType = z.infer<typeof SignupInput>;
