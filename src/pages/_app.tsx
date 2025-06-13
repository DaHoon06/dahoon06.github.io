import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@apps/styles/styled-components";
import "@apps/styles/global/index.scss";
import "react-tooltip/dist/react-tooltip.css";
import MetaHead from "@shared/ui/heads/MetaHead";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/libs/react-query";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <ThemeProvider theme={theme}>
                        <MetaHead />
                        <Component {...pageProps} />
                        <div id="modal" />
                    </ThemeProvider>
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}
