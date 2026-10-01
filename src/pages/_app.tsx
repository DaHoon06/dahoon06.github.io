import type { AppProps } from "next/app";
import "@apps/styles/index.scss";
import "react-tooltip/dist/react-tooltip.css";
import MetaHead from "@shared/ui/heads/MetaHead";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/react-query";
import { RouteProgressBar } from "@shared/ui/progress-bar";
import Script from "next/script";
import { Toaster } from "@shared/ui/toast/toaster";
import { ModalProvider } from "@apps/providers";
import { CONFIG } from "@root/site.config";

const { enable: gaEnable, config: gaConfig } = CONFIG.googleAnalytics;
const gaMeasurementId = gaConfig.measurementId;
const useGoogleAnalytics = gaEnable && Boolean(gaMeasurementId);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            {useGoogleAnalytics && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `}
                    </Script>
                </>
            )}
            <ModalProvider>
                <QueryClientProvider client={queryClient}>
                    <HydrationBoundary state={pageProps.dehydratedState}>
                        <RouteProgressBar />
                        <MetaHead />
                        <Component {...pageProps} />
                        <div id="modal" />
                        <Toaster />
                    </HydrationBoundary>
                </QueryClientProvider>
            </ModalProvider>
        </>
    );
}
