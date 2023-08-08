import { BlitzPage } from "@blitzjs/next";

import UserInfo from "src/core/components/UserInfo";
import Layout from "src/core/layouts/RootLayout";

import fetchName from "./blog/queries/getPost";

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <UserInfo />
    </Layout>
  );
};

export default Home;
