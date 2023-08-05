import Link from "next/link";
import { useRouter } from "next/router";

import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { assert } from "blitz";

import { Text, Title } from "@mantine/core";

import { Form, FORM_ERROR } from "src/core/components/Form";
import { LabeledTextField } from "src/core/components/LabeledTextField";
import Layout from "src/core/layouts/RootLayout";

import resetPassword from "src/features/auth/mutations/resetPassword";
import { ResetPassword } from "src/features/auth/schemas";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const token = router.query.token?.toString();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  return (
    <div>
      <Title order={1}>Set a New Password</Title>

      {isSuccess ? (
        <div>
          <Title order={2}>Password Reset Successfully</Title>
          <Text>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </Text>
        </div>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword}
          initialValues={{
            password: "",
            passwordConfirmation: "",
            token,
          }}
          onSubmit={async (values) => {
            try {
              assert(token, "token is required.");
              await resetPasswordMutation({ ...values, token });
            } catch (error: any) {
              if (error.name === "ResetPasswordError") {
                return {
                  [FORM_ERROR]: error.message,
                };
              } else {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                };
              }
            }
          }}
        >
          <LabeledTextField name="password" label="New Password" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </div>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>;

export default ResetPasswordPage;
