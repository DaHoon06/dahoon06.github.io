import Head from "next/head";

interface Props {
  title?: string;
  name?: string;
  description?: string;
  url?: string;
  image?: string;
}

const CustomHead = ({ title, description, name, url, image }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content="website" property="og:type" />
      <meta content={name} property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta content="ko_KR" property="og:locale" />
      <meta content="en_US" property="og:locale:alternate" />
      <meta content={url} property="og:url" />
      <meta property="og:type" content="website" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:card" content={description} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={url} />
    </Head>
  );
};

export default CustomHead;
