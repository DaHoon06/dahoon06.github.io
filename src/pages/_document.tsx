import Document, { Head, Html, Main, NextScript } from "next/document";

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
