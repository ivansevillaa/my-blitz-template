import { useQuery } from "@blitzjs/rpc";

import { List } from "@mantine/core";

import Layout from "src/core/layouts/RootLayout";

import getAllPosts from "./queries/getAllPosts";

export default function Blog() {
  const [posts] = useQuery(getAllPosts, {});

  return (
    <Layout title="Blog">
      <List>
        {posts.map((post) => {
          return <List.Item key={post.slug}>{post.title}</List.Item>;
        })}
      </List>
    </Layout>
  );
}
