import Link from "next/link";
import { useRouter } from "next/router";

import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { assert } from "blitz";

import {
  Anchor,
  Button,
  Container,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import Layout from "src/core/layouts/RootLayout";

import resetPassword from "src/features/auth/mutations/resetPassword";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const token = router.query.token?.toString();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      assert(token, "token is required.");
      await resetPasswordMutation({ ...values, token });
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          errorMessage: error.message,
        };
      } else {
        return {
          errorMessage: "Sorry, we had an unexpected error. Please try again.",
        };
      }
    }
  };

  return (
    <Container>
      <Title order={1}>Set a New Password</Title>

      {isSuccess ? (
        <>
          <Title order={2}>Password Reset Successfully</Title>
          <Text>
            Go to the{" "}
            <Anchor component={Link} href={Routes.Home()}>
              homepage
            </Anchor>
          </Text>
        </>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            name="password"
            label="New Password"
            placeholder="New Password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          <PasswordInput
            name="passwordConfirmation"
            label="Confirm New Password"
            placeholder="Password"
            withAsterisk
            {...form.getInputProps("passwordConfirmation")}
          />
          <Button type="submit">Reset Password</Button>
        </form>
      )}
    </Container>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";
ResetPasswordPage.getLayout = (page) => (
  <Layout title="Reset Your Password">{page}</Layout>
);

export default ResetPasswordPage;
