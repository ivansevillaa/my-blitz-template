import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Alert,
  Anchor,
  AppShell,
  Button,
  Footer,
  Group,
  Header,
  Loader,
  Text,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import Head from "next/head";
import Link from "next/link";
import React, { Suspense } from "react";

import RootErrorFallback from "src/core/components/RootErrorFallback";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import logout from "src/pages/auth/mutations/logout";
import sendVerifyEmail from "src/pages/auth/verify-email/mutations/sendVerifyEmail";

const RootLayout: BlitzLayout<{
  title?: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [logoutMutation] = useMutation(logout);
  const [sendVerifyEmailMutation, { isLoading, isSuccess }] =
    useMutation(sendVerifyEmail);
  const year = new Date().getFullYear();
  const currentUser = useCurrentUser();

  const handleSendVerifyEmail = async () => {
    await sendVerifyEmailMutation();
  };

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
              {currentUser && (
                <Button
                  onClick={async () => {
                    await logoutMutation();
                  }}
                >
                  Logout
                </Button>
              )}
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
          <Suspense fallback={<Loader />}>
            {currentUser && !currentUser?.emailVerifiedAt && (
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title={isSuccess ? "Email sent!" : "Warning!"}
                color="red"
                mb="lg"
              >
                {!isSuccess && (
                  <>
                    <Text>
                      Your email is still not verified. Please check your inbox
                      for the email welcome email we sent
                    </Text>
                    <Button
                      color="red"
                      size="xs"
                      mt="xs"
                      onClick={handleSendVerifyEmail}
                      loading={isLoading}
                    >
                      Resend email
                    </Button>
                  </>
                )}
                {isSuccess && (
                  <Text>
                    The email has been sent and should arrive in the next few
                    minutes. Please be patient and check your spam folder
                  </Text>
                )}
              </Alert>
            )}
            {children}
          </Suspense>
        </ErrorBoundary>
      </AppShell>
    </>
  );
};

export default RootLayout;
