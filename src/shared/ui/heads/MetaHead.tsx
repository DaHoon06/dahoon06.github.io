import Head from "next/head";

/**
 * 모든 페이지 공통 head — 뷰포트·PWA·테마 색만 둔다.
 * title·description·OG 같은 페이지별 메타는 각 페이지의 SeoHead 가 책임진다.
 */
const MetaHead = () => {
    return (
        <Head>
            <meta
                key="viewport"
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
            {/* 홈 화면에 추가했을 때 앱처럼 전체 화면으로 뜬다 */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta name="apple-mobile-web-app-title" content="Dahoon06" />

            <meta name="color-scheme" content="dark light" />
            <meta
                name={"theme-color"}
                content={"#fff"}
                media={"(prefers-color-scheme: light)"}
            />
            <meta
                name={"theme-color"}
                content={"#fff"}
                media={"(prefers-color-scheme: dark)"}
            />
        </Head>
    );
};

export default MetaHead;
