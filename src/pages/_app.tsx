import type { AppProps } from "next/app";
import "@apps/styles/index.scss";
import "react-tooltip/dist/react-tooltip.css";
import MetaHead from "@shared/ui/heads/MetaHead";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/libs/react-query";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <MetaHead />
                    <Component {...pageProps} />
                    <div id="modal" />
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}
