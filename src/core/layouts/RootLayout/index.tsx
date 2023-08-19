import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  AppShell,
  Button,
  Footer,
  Group,
  Header,
  Loader,
  Text,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import React, { Suspense } from "react";

import RootErrorFallback from "src/core/components/RootErrorFallback";
import logout from "src/pages/auth/mutations/logout";

const RootLayout: BlitzLayout<{
  title?: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [logoutMutation] = useMutation(logout);
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>{title || "Rocus"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        header={
          <Header height={80}>
            <Group h="100%" p="lg" sx={{ justifyContent: "space-between" }}>
              <Anchor href={Routes.Home()} component={Link} underline={false}>
                Logo
              </Anchor>
              <Button
                onClick={async () => {
                  await logoutMutation();
                }}
              >
                Logout
              </Button>
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
        <ErrorBoundary FallbackComponent={RootErrorFallback}>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ErrorBoundary>
      </AppShell>
    </>
  );
};

export default RootLayout;
