import { CONFIG } from "@root/site.config";
import Document, { Head, Html, Main, NextScript } from "next/document";

/**
 * _document 의 Head 는 next/head 가 덮어쓸 수 없다.
 * 그래서 여기엔 모든 페이지에 똑같이 들어가야 하는 것(폰트·아이콘·검색엔진 소유 확인·RSS)만 둔다.
 * title·description·OG 등 페이지별 메타는 각 페이지의 SeoHead 에서 설정한다.
 */
class Dahoon06Document extends Document {
    render() {
        return (
            <Html lang="ko">
                <Head>
                    {/* 본문 폰트 — 필요한 글자 조각(woff2)만 받는 dynamic subset */}
                    <link
                        rel="preconnect"
                        href="https://cdn.jsdelivr.net"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
                        crossOrigin="anonymous"
                    />

                    <meta
                        name="google-site-verification"
                        content="DKXaK73vI5S3vLqgQOayghfbLqkHd2xlVIir_4D6X_g"
                    />
                    <meta
                        name="naver-site-verification"
                        content="1a5e498298290f51a81ed75b9096df52e9042c0f"
                    />

                    <link
                        rel="alternate"
                        type="application/rss+xml"
                        title="전다훈 개발 블로그 RSS"
                        href={`${CONFIG.domain}/rss.xml`}
                    />

                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Dahoon06Document;
