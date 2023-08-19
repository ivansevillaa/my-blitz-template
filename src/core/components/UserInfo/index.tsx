import { Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Container, Text } from "@mantine/core";
import Link from "next/link";

import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import logout from "src/pages/auth/mutations/logout";

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
        <Button component={Link} href={Routes.Blog()}>
          Blog
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
