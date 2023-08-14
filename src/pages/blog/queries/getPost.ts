import { resolver } from "@blitzjs/rpc";

import db from "db";
import { z } from "zod";

const Input = z.object({
  slug: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ slug }, ctx) => {
    const post = db.post.findFirstOrThrow({
      where: {
        authorId: ctx.session.userId,
        slug,
      },
    });

    return post;
  }
);
