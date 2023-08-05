import Head from "next/head";

import { BlitzLayout } from "@blitzjs/next";

import { AppShell, Footer, Header, List, Text } from "@mantine/core";
import React from "react";

const RootLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>{title || "Rocus"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        header={
          <Header height={60}>
            <Text>Logo</Text>
          </Header>
        }
        footer={
          <Footer height={120}>
            <Text>Copyright @ {year}</Text>
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
};

export default RootLayout;
