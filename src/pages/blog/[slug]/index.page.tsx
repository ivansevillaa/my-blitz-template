import { useParam } from "@blitzjs/next";

export default function Post() {
  const slug = useParam("slug", "string");
  return <p>Post: {slug}</p>;
}
