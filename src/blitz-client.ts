import { AuthClientPlugin } from "@blitzjs/auth";
import { setupBlitzClient } from "@blitzjs/next";
import { BlitzRpcPlugin, getQueryClient } from "@blitzjs/rpc";

export const authConfig = {
  cookiePrefix: "rocus",
};

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      reactQueryOptions: {
        mutations: {
          // this will be overridden in case you
          // define onSuccess() inside your `useMutation` options
          onSuccess: async () => {
            const queryClient = getQueryClient();
            await queryClient.invalidateQueries();
          },
        },
      },
    }),
  ],
});
