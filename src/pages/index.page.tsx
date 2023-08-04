import { BlitzPage } from "@blitzjs/next";

import { Suspense } from "react";

import UserInfo from "src/core/components/UserInfo";
import Layout from "src/core/layouts/Layout";

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </Layout>
  );
};

export default Home;
