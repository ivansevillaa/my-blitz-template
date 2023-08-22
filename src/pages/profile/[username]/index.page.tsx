import { BlitzPage, Routes, useParam } from "@blitzjs/next";
import { getQueryClient, useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Modal, Text, Textarea, TextInput, Title } from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

import RootLayout from "src/core/layouts/RootLayout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

import updateUserProfile from "./mutations/updateUserProfile";
import getUserProfile from "./queries/getUserProfile";
import { UserProfileFormType, UserProfileInput } from "./types";

const ProfilePage: BlitzPage = () => {
  const username = useParam("username", "string");
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [profileData] = useQuery(getUserProfile, { username: username || "" });
  const [updateUserProfileMutation, { isLoading }] = useMutation(
    updateUserProfile,
    {
      onSuccess: async (data) => {
        notifications.show({
          title: "Profile updated",
          message: "Profile updated successfully",
        });
        close();

        if (data.username && username !== data.username) {
          await router.push(Routes.ProfilePage({ username: data.username }));
        }

        const queryClient = getQueryClient();
        await queryClient.invalidateQueries();
      },
    }
  );
  const form = useForm<UserProfileFormType>({
    initialValues: {
      name: profileData.name || "",
      username: profileData.username || "",
      bio: profileData.bio || "",
    },
    validate: zodResolver(UserProfileInput),
    validateInputOnBlur: true,
  });
  const user = useCurrentUser();

  const handleSubmit = async (values: UserProfileFormType) => {
    await updateUserProfileMutation(values);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Edit profile"
      >
        <Form form={form} onSubmit={handleSubmit}>
          <TextInput
            name="name"
            label="Name"
            placeholder="Name"
            radius="md"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <TextInput
            name="username"
            label="Username"
            placeholder="Username"
            radius="md"
            withAsterisk
            {...form.getInputProps("username")}
          />
          <Textarea
            name="bio"
            label="Bio"
            placeholder="Bio"
            radius="md"
            withAsterisk
            {...form.getInputProps("bio")}
          />
          <Button
            loading={isLoading}
            disabled={!form.isValid()}
            type="submit"
            radius="xl"
          >
            Save
          </Button>
        </Form>
      </Modal>
      <RootLayout title="Profile">
        <Title order={3}>{profileData?.username}</Title>
        <Text>{profileData?.bio}</Text>
        {user?.username === profileData.username && (
          <Button onClick={open}>Edit profile</Button>
        )}
      </RootLayout>
    </>
  );
};

export default ProfilePage;
