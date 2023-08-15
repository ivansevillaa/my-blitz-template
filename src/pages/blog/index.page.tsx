import { getQueryClient, useMutation, useQuery } from "@blitzjs/rpc";

import { Button, List, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import Layout from "src/core/layouts/RootLayout";

import addPost from "./mutations/addPost";
import getAllPosts from "./queries/getAllPosts";

export default function Blog() {
  const [posts] = useQuery(getAllPosts, {});
  const [addPostMutation, { isLoading }] = useMutation(addPost, {
    onSuccess: async (response) => {
      notifications.show({
        title: "Post created",
        message: `Post ${response.title} created successfully`,
      });

      const queryClient = getQueryClient();
      await queryClient.invalidateQueries();
    },
  });

  const form = useForm({
    initialValues: {
      title: "",
      slug: "",
      content: "",
    },
  });

  return (
    <Layout title="Blog">
      <form onSubmit={form.onSubmit((values) => addPostMutation(values))}>
        <TextInput
          name="title"
          label="Title"
          placeholder="Title"
          radius="md"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <TextInput
          name="slug"
          label="Slug"
          placeholder="Slug"
          radius="md"
          withAsterisk
          {...form.getInputProps("slug")}
        />
        <TextInput
          name="content"
          label="Content"
          placeholder="Content"
          radius="md"
          withAsterisk
          {...form.getInputProps("content")}
        />
        <Button loading={isLoading} type="submit">
          Create post
        </Button>
      </form>
      <List>
        {posts.map((post) => {
          return <List.Item key={post.slug}>{post.title}</List.Item>;
        })}
      </List>
    </Layout>
  );
}
