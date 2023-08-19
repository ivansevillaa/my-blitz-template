import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  Button,
  Container,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { assert } from "blitz";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "src/core/layouts/RootLayout";
import resetPassword from "src/pages/auth/reset-password/mutations/resetPassword";

import { ResetPasswordFormType, ResetPasswordInput } from "./types";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const token = router.query.token?.toString();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  const form = useForm<ResetPasswordFormType>({
    validate: zodResolver(ResetPasswordInput),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: ResetPasswordFormType) => {
    assert(token, "token is required.");
    await resetPasswordMutation({ ...values, token });
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
