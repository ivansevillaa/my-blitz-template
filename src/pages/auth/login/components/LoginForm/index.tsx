import Link from "next/link";

import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { AuthenticationError, PromiseReturnType } from "blitz";

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
        return { errors: "Sorry, those credentials are invalid" };
      } else {
        return {
          errors:
            "Sorry, we had an unexpected error. Please try again. - " +
            error.toString(),
        };
      }
    }
  };

  return (
    <Group h="100%" position="center">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to insert_name, login with
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
              radius="md"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Password"
              radius="md"
              withAsterisk
              {...form.getInputProps("password")}
            />
          </Stack>
          <Group position="apart" mt="xl">
            <Anchor
              component={Link}
              color="dimmed"
              href={Routes.SignupPage()}
              size="xs"
            >
              {"Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Group>
  );
};

export default LoginForm;
