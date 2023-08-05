import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";

import { Button, Container, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import Layout from "src/core/layouts/RootLayout";

import forgotPassword from "src/features/auth/mutations/forgotPassword";

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      await forgotPasswordMutation(values);
    } catch (error: any) {
      return {
        errorMessage: "Sorry, we had an unexpected error. Please try again.",
      };
    }
  };

  return (
    <Layout title="Forgot Your Password?">
      <Container>
        <Title order={1}>Forgot your password?</Title>

        {isSuccess ? (
          <>
            <Title order={2}>Request Submitted</Title>
            <Text>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
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
