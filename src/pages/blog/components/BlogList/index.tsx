import { PromiseReturnType } from "blitz";

import { List } from "@mantine/core";

import getAllPosts from "../../queries/getAllPosts";

type Posts = PromiseReturnType<typeof getAllPosts>;
// type Post = Posts[number];

interface Props {
  posts: Posts;
}

export default function BlogList({ posts }: Props) {
  return (
    <List>
      {posts.map((post) => {
        return <List.Item key={post.slug}>{post.title}</List.Item>;
      })}
    </List>
  );
}
