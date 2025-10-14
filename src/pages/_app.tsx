import type { AppProps } from "next/app";
import "@apps/styles/index.scss";
import "react-tooltip/dist/react-tooltip.css";
import MetaHead from "@shared/ui/heads/MetaHead";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/libs/react-query";
import { RouteProgressBar } from "@shared/ui/progress-bar";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-F3D23SCNJB"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F3D23SCNJB');
        `}
            </Script>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <RouteProgressBar />
                    <MetaHead />
                    <Component {...pageProps} />
                    <div id="modal" />
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}
