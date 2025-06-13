import Head from "next/head";

const MetaHead = () => {
  return (
    <Head>
      <title>프론트엔드 개발자 | 전다훈(Dahoon06)</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0"
      />
      <meta httpEquiv="Subject" content="전다훈 포트폴리오" />
      <meta httpEquiv="Title" content="프론트엔드 개발자 | 전다훈" />
      <meta httpEquiv="Author" content="dahoon06" />
      <meta httpEquiv="Copyright" content="dahoon06" />
      <meta httpEquiv="Distribution" content="dahoon06" />
      <meta
        name="keywords"
        content="전다훈, dahoob06, 포트폴리오, 프론트엔드, 백엔드, 풀스택, 개발"
      />
      <meta name="description" content={"전다훈 포트폴리오"} />
      <meta httpEquiv="Imagetoolbar" content="no" />
      <meta
        httpEquiv="Page-Enter"
        content="revealtrans(Duration=1,Transition=12)"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-web-app-capable" content="yes" />

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
