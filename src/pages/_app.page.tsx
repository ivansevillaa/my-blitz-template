import { AppProps, ErrorBoundary } from "@blitzjs/next";

import { MantineProvider } from "@mantine/core";
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
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default withBlitz(MyApp);
