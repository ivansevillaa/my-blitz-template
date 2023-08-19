import { resolver } from "@blitzjs/rpc";
import db from "db";

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const posts = await db.post.findMany({
    where: {
      authorId: ctx.session.userId,
    },
    select: {
      title: true,
      slug: true,
    },
  });

  return posts;
});
