import { resolver } from "@blitzjs/rpc";

export default resolver.pipe(resolver.authorize(), async () => {
  const posts = [
    {
      title: "Blog Post #1",
      slug: "post1",
    },
    {
      title: "Blog Post #2",
      slug: "post2",
    },
    {
      title: "Blog Post #3",
      slug: "post3",
    },
  ];

  return posts;
});
