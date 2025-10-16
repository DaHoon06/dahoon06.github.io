import Document, { Head, Html, Main, NextScript } from "next/document";

const MetaHead = () => {
    return (
        <>
            <meta
                name="description"
                content="프론트엔드 개발자 전다훈(Da-hoon Jeon)의 기술 블로그 | 이것저것 기록해봅니다."
            />
            <meta
                name="keywords"
                content="프론트엔드, 개발자, 전다훈, Dahoon06, Next.js, React, Vue.js, NestJS, GitHub Pages, 웹 개발, 포트폴리오"
            />
            <meta name="author" content="전다훈 (Da-hoon Jeon)" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#0f172a" />

            <meta property="og:type" content="website" />
            <meta
                property="og:title"
                content="프론트엔드 개발자 | 전다훈 (Dahoon06)"
            />
            <meta property="og:description" content="이것저것 기록해봅니다." />
            <meta property="og:url" content="https://dahoon06.github.io" />
            <meta property="og:site_name" content="Dahoon06 | 전다훈 블로그" />
            <meta property="og:locale" content="ko_KR" />
            <meta
                property="og:image"
                content="https://avatars.githubusercontent.com/DaHoon06"
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="프론트엔드 개발자 | 전다훈 (Dahoon06)"
            />
            <meta
                name="twitter:description"
                content="프론트엔드 기술과 개발 노하우를 공유하는 전다훈의 기술 블로그입니다."
            />
            <meta
                name="twitter:image"
                content="https://avatars.githubusercontent.com/DaHoon06"
            />

            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
                crossOrigin="anonymous"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://fonts.googleapis.com/earlyaccess/nanumgothic.css"
                crossOrigin="anonymous"
            />
            <link
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
                rel="stylesheet"
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
        </>
    );
};

class Dahoon06Document extends Document {
    render() {
        return (
            <Html lang="kr">
                <Head>
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
                        crossOrigin={"anonymous"}
                    />

                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://fonts.googleapis.com/earlyaccess/nanumgothic.css"
                        crossOrigin={"anonymous"}
                    />

                    <link
                        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
                        rel="stylesheet"
                    />

                    <meta
                        name="google-site-verification"
                        content="DKXaK73vI5S3vLqgQOayghfbLqkHd2xlVIir_4D6X_g"
                    />

                    <MetaHead />
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
