import { z } from "zod";

import { email } from "../types";

export const LoginInput = z.object({
  email,
  password: z.string(),
});

export type LoginFormType = z.infer<typeof LoginInput>;
