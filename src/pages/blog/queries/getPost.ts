import { resolver } from "@blitzjs/rpc";

import { z } from "zod";

const Input = z.object({
  slug: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ slug }) => {
    console.log("slug", slug);
    const post = {
      title: `Blog Post #${slug}`,
      slug: `${slug}`,
    };
    return post;
  }
);
