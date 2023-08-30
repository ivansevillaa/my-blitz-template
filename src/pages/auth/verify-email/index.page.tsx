import { BlitzPage, Routes } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Anchor, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "src/core/layouts/RootLayout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

import verifyEmail from "./queries/verifyEmail";

const VerifyEmail: BlitzPage = () => {
  const { query } = useRouter();
  const currentUser = useCurrentUser();
  useQuery(
    verifyEmail,
    { token: typeof query.token === "string" ? query.token : "" },
    { enabled: Boolean(query.token) }
  );

  if (currentUser?.emailVerifiedAt) {
    return (
      <Layout title="Verify Email">
        <Text>Your email is already verified</Text>
        <Anchor component={Link} href={Routes.Home()} size="xs">
          Back to home
        </Anchor>
      </Layout>
    );
  }

  return (
    <Layout title="Verify Email">
      <Text>Your email was verified successfully</Text>
      <Anchor component={Link} href={Routes.Home()} size="xs">
        Back to home
      </Anchor>
    </Layout>
  );
};

export default VerifyEmail;
