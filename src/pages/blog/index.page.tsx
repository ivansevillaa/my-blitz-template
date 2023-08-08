import { useMutation, useQuery } from "@blitzjs/rpc";

import { Button, List } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import Layout from "src/core/layouts/RootLayout";

import addPost from "./mutations/addPost";
import getAllPosts from "./queries/getAllPosts";

export default function Blog() {
  const [posts] = useQuery(getAllPosts, {});
  const [addPostMutation, { isLoading }] = useMutation(addPost, {
    onSuccess: (response) => {
      notifications.show({
        title: "Post created",
        message: response.data.message,
      });
    },
  });

  return (
    <Layout title="Blog">
      <List>
        {posts.map((post) => {
          return <List.Item key={post.slug}>{post.title}</List.Item>;
        })}
      </List>
      <Button
        loading={isLoading}
        onClick={() => addPostMutation({ title: "New Post Title!!" })}
      >
        Create post
      </Button>
    </Layout>
  );
}
