import { resolver } from "@blitzjs/rpc";

import { z } from "zod";

const Input = z.object({
  title: z.string(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ title }) => {
  console.log(`creating ${title}`);
  return {
    data: {
      message: `Post ${title} created successfully`,
    },
  };
});
