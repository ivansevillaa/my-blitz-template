import { z } from "zod";

export const UserProfileInput = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  bio: z.string().min(1),
});

export type UserProfileFormType = z.infer<typeof UserProfileInput>;
