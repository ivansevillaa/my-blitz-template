import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, Container, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import Layout from "src/core/layouts/RootLayout";
import forgotPassword from "src/pages/auth/forgot-password/mutations/forgotPassword";

import { ForgotPasswordFormType, ForgotPasswordInput } from "./types";

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);

  const form = useForm<ForgotPasswordFormType>({
    validate: zodResolver(ForgotPasswordInput),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: ForgotPasswordFormType) => {
    await forgotPasswordMutation(values);
  };

  return (
    <Layout title="Forgot Your Password?">
      <Container>
        <Title order={1}>Forgot your password?</Title>

        {isSuccess ? (
          <>
            <Title order={2}>Request Submitted</Title>
            <Text>
              If your email is in our system, you will receive instructions to
              reset your password shortly.
            </Text>
          </>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              name="email"
              label="Email"
              placeholder="Email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <Button type="submit">Send Reset Password Instructions</Button>
          </form>
        )}
      </Container>
    </Layout>
  );
};

export default ForgotPasswordPage;
