import { BlitzPage } from "@blitzjs/next";

import { Suspense } from "react";

import UserInfo from "src/core/components/UserInfo";
import Layout from "src/core/layouts/RootLayout";

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <UserInfo />
    </Layout>
  );
};

export default Home;
