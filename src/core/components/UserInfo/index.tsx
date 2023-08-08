import Link from "next/link";

import { Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";

import { Button, Container, Text } from "@mantine/core";

import logout from "src/features/auth/mutations/logout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </Button>
        <Container>
          <Text>
            User id: <code>{currentUser.id}</code>
          </Text>
          <Text>
            User role: <code>{currentUser.role}</code>
          </Text>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Button component={Link} href={Routes.SignupPage()}>
          Sign Up
        </Button>
        <Button component={Link} href={Routes.LoginPage()}>
          Login
        </Button>
      </>
    );
  }
};

export default UserInfo;
