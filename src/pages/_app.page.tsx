import { AppProps, ErrorBoundary } from "@blitzjs/next";
import { Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Suspense } from "react";

import { withBlitz } from "src/blitz-client";
import RootErrorFallback from "src/core/components/RootErrorFallback";
import "src/core/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications position="top-center" />
        <Suspense fallback={<Loader />}>
          {getLayout(<Component {...pageProps} />)}
        </Suspense>
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default withBlitz(MyApp);
