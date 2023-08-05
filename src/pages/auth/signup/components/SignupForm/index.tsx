import Link from "next/link";

import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";

import { Anchor, Button, Container, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import signup from "src/features/auth/mutations/signup";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      await signupMutation(values);
      props.onSuccess?.();
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" };
      } else {
        return { errorMessage: error.toString() };
      }
    }
  };

  return (
    <Container>
      <Title order={1}>Create an Account</Title>
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
        <Button type="submit">Sign Up</Button>
      </form>
      <Text>Or</Text>
      <Anchor component={Link} href={Routes.LoginPage()}>
        Sign In
      </Anchor>
    </Container>
  );
};

export default SignupForm;
