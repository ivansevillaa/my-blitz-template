import Head from "next/head";
import Link from "next/link";

import { BlitzLayout, Routes } from "@blitzjs/next";

import {
  Anchor,
  AppShell,
  Container,
  Footer,
  Group,
  Header,
  List,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import React, { Suspense } from "react";

const RootLayout: BlitzLayout<{
  title?: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
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
            <Group h="100%" p="lg">
              <Anchor href={Routes.Home()} component={Link} underline={false}>
                Logo
              </Anchor>
            </Group>
          </Header>
        }
        footer={
          <Footer height={120}>
            <Group h="100%" position="center">
              <Text>Copyright @ {year}</Text>
            </Group>
          </Footer>
        }
      >
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell>
    </>
  );
};

export default RootLayout;
