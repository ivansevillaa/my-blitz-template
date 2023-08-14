import { resolver } from "@blitzjs/rpc";

import db from "db";
import { z } from "zod";

const Input = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ title, slug, content }, ctx) => {
    const createdPost = await db.post.create({
      data: {
        title,
        slug,
        content,
        author: {
          connect: {
            id: ctx.session.userId,
          },
        },
      },
    });
    return createdPost;
  }
);
