import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import db from "db";
import { z } from "zod";

const Input = z.object({
  username: z.string(),
});

export default resolver.pipe(resolver.zod(Input), async ({ username }) => {
  const profile = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      bio: true,
      name: true,
    },
  });

  if (!profile) {
    // return null;
    throw new NotFoundError();
  }

  return profile;
});
