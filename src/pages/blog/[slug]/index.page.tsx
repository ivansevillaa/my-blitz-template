import { useParam } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Text } from "@mantine/core";

import Layout from "src/core/layouts/RootLayout";

import getPost from "../queries/getPost";

export default function Post() {
  const slug = useParam("slug", "string");
  const [post] = useQuery(getPost, {
    slug: slug ?? "",
  });

  return (
    <Layout>
      <Text>
        Post: {post.title} - {post.slug}
      </Text>
    </Layout>
  );
}
