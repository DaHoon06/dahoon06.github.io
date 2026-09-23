import Head from "next/head";
import {
    BRAND_KEYWORDS,
    SITE,
    clampDescription,
    toAbsoluteUrl,
} from "@shared/config/seo";

type JsonLd = Record<string, unknown>;

export interface SeoHeadProps {
    title: string;
    description: string;
    /** 사이트 루트 기준 경로 — canonical·og:url 이 된다 */
    path: string;
    keywords?: string[];
    /** 상대 경로면 도메인을 붙인다. 없으면 기본 OG 이미지 */
    image?: string;
    type?: "website" | "article" | "profile";
    /** true 면 title 뒤에 사이트명을 붙이지 않는다 (홈) */
    rawTitle?: boolean;
    noindex?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
    jsonLd?: JsonLd | JsonLd[];
}

/**
 * 페이지별 title·description·canonical·OG·Twitter·JSON-LD 를 한 번에 설정한다.
 * 모든 태그에 key 를 달아 next/head 가 중복 없이 마지막 값만 남기게 한다.
 */
const SeoHead = ({
    title,
    description,
    path,
    keywords = [],
    image,
    type = "website",
    rawTitle = false,
    noindex = false,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    jsonLd,
}: SeoHeadProps) => {
    const fullTitle = rawTitle ? title : `${title} | ${SITE.titleSuffix}`;
    const desc = clampDescription(description);
    const url = toAbsoluteUrl(path);
    const imageUrl = toAbsoluteUrl(image || SITE.defaultImage);
    const isDefaultImage = !image;
    const keywordList = Array.from(new Set([...keywords, ...BRAND_KEYWORDS]));
    const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <Head>
            <title key="title">{fullTitle}</title>
            <meta key="description" name="description" content={desc} />
            <meta
                key="keywords"
                name="keywords"
                content={keywordList.join(", ")}
            />
            <meta key="author" name="author" content={SITE.author} />
            <meta
                key="robots"
                name="robots"
                content={
                    noindex
                        ? "noindex, follow"
                        : "index, follow, max-image-preview:large"
                }
            />
            {!noindex && <link key="canonical" rel="canonical" href={url} />}

            <meta key="og:type" property="og:type" content={type} />
            <meta
                key="og:site_name"
                property="og:site_name"
                content={SITE.name}
            />
            <meta key="og:locale" property="og:locale" content={SITE.locale} />
            <meta key="og:title" property="og:title" content={fullTitle} />
            <meta
                key="og:description"
                property="og:description"
                content={desc}
            />
            <meta key="og:url" property="og:url" content={url} />
            <meta key="og:image" property="og:image" content={imageUrl} />
            <meta key="og:image:alt" property="og:image:alt" content={title} />
            {isDefaultImage && (
                <meta
                    key="og:image:width"
                    property="og:image:width"
                    content={`${SITE.defaultImageWidth}`}
                />
            )}
            {isDefaultImage && (
                <meta
                    key="og:image:height"
                    property="og:image:height"
                    content={`${SITE.defaultImageHeight}`}
                />
            )}

            {type === "article" && publishedTime && (
                <meta
                    key="article:published_time"
                    property="article:published_time"
                    content={publishedTime}
                />
            )}
            {type === "article" && modifiedTime && (
                <meta
                    key="article:modified_time"
                    property="article:modified_time"
                    content={modifiedTime}
                />
            )}
            {type === "article" && section && (
                <meta
                    key="article:section"
                    property="article:section"
                    content={section}
                />
            )}
            {type === "article" &&
                tags.map((tag) => (
                    <meta
                        key={`article:tag:${tag}`}
                        property="article:tag"
                        content={tag}
                    />
                ))}

            <meta
                key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta key="twitter:title" name="twitter:title" content={fullTitle} />
            <meta
                key="twitter:description"
                name="twitter:description"
                content={desc}
            />
            <meta key="twitter:image" name="twitter:image" content={imageUrl} />

            {jsonLdList.map((data, index) => (
                <script
                    key={`jsonld-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
                    }}
                />
            ))}
        </Head>
    );
};

export default SeoHead;
