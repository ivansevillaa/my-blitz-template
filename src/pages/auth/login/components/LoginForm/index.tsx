import Link from "next/link";

import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { AuthenticationError, PromiseReturnType } from "blitz";

import { Anchor, Button, Container, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import login from "src/features/auth/mutations/login";

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const user = await loginMutation(values);
      props.onSuccess?.(user);
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { errorMessage: "Sorry, those credentials are invalid" };
      } else {
        return {
          errorMessage:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        };
      }
    }
  };

  return (
    <Container>
      <Title order={1}>Login</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          name="email"
          label="Email"
          placeholder="Email"
          withAsterisk
          {...form.getInputProps("email")}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Password"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <Button type="submit">Login</Button>
      </form>
      <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
      <Text>Or</Text>
      <Anchor component={Link} href={Routes.SignupPage()}>
        Sign Up
      </Anchor>
    </Container>
  );
};

export default LoginForm;
