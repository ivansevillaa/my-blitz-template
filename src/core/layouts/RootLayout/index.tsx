import Head from "next/head";

import { BlitzLayout } from "@blitzjs/next";

import React from "react";

const RootLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Rocus"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default RootLayout;
