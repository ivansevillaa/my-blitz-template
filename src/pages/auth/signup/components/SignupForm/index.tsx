import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  Button,
  Checkbox,
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
import Link from "next/link";

import { GoogleIcon } from "src/core/components/SocialIcons/GoogleIcons";
import signup from "src/pages/auth/signup/mutations/signup";

import { SignupFormType, SignupInput } from "../../types";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);

  const form = useForm<SignupFormType>({
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  });

  const handleSubmit = async (values: SignupFormType) => {
    await signupMutation(values);
    onSuccess?.();
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
            <Checkbox
              name="terms"
              label="I agree to sell my privacy"
              {...form.getInputProps("terms", { type: "checkbox" })}
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
            <Button disabled={!form.isValid()} type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Group>
  );
};

export default SignupForm;
