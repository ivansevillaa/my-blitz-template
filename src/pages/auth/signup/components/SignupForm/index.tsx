import Link from "next/link";

import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { TwitterIcon } from "@mantine/ds";
import { useForm } from "@mantine/form";

import { GoogleIcon } from "src/core/components/SocialIcons/GoogleIcons";

import signup from "src/pages/auth/mutations/signup";

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
    <Group h="100%" position="center">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to insert_name, register with
        </Text>
        <Group grow mb="md" mt="md">
          <Button leftIcon={<GoogleIcon />} variant="default" radius="xl">
            Google
          </Button>
          <Button
            leftIcon={<TwitterIcon size="1rem" color="#00ACEE" />}
            variant="default"
            radius="xl"
          >
            Twitter
          </Button>
        </Group>
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
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
          </Stack>
          <Group position="apart" mt="xl">
            <Anchor
              component={Link}
              color="dimmed"
              href={Routes.LoginPage()}
              size="xs"
            >
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Group>
  );
};

export default SignupForm;
