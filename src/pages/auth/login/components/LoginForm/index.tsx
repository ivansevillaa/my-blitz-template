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
import { useForm, zodResolver } from "@mantine/form";
import { PromiseReturnType } from "blitz";
import Link from "next/link";

import { GoogleIcon } from "src/core/components/SocialIcons/GoogleIcons";
import login from "src/pages/auth/login/mutations/login";

import { LoginFormType, LoginInput } from "../../types";

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [loginMutation] = useMutation(login);

  const form = useForm<LoginFormType>({
    validate: zodResolver(LoginInput),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: LoginFormType) => {
    const user = await loginMutation(values);
    onSuccess?.(user);
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
            <Anchor
              component={Link}
              color="dimmed"
              href={Routes.ForgotPasswordPage()}
              size="xs"
              align="end"
            >
              {"Forgot your password?"}
            </Anchor>
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
            <Button disabled={!form.isValid()} type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Group>
  );
};

export default LoginForm;
