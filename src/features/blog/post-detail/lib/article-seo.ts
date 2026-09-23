import type { PostType } from "@entities/notion";
import {
    SITE,
    breadcrumbJsonLd,
    clampDescription,
    personJsonLd,
    toAbsoluteUrl,
} from "@shared/config/seo";
import type { SeoHeadProps } from "@shared/ui/heads/SeoHead";

type ArticleSection = {
    /** 목록 경로 — "/posts" | "/archiving" */
    basePath: string;
    /** 브레드크럼·article:section 에 쓰는 한글 이름 */
    name: string;
};

const toIsoDate = (value?: string): string | undefined => {
    if (!value) return undefined;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

/** 이모지·공백을 걷어낸 카테고리명 — "😎 일상" → "일상" */
const cleanCategory = (category?: string): string | undefined =>
    category?.replace(/[^\p{L}\p{N}\s·-]/gu, "").trim() || undefined;

/**
 * 블로그 글·아카이빙 상세 공통 SEO.
 * summary 가 비어 있으면 제목·카테고리로 설명문을 만들어 description 이 빈 채로 나가지 않게 한다.
 */
export const buildArticleSeo = (
    post: PostType,
    section: ArticleSection
): SeoHeadProps => {
    const path = `${section.basePath}/${post.slug}`;
    const category = cleanCategory(post.category?.[0]);
    const tags = post.tags ?? [];
    const publishedTime = toIsoDate(post.date?.start_date || post.createdTime);
    const modifiedTime = toIsoDate(post.lastEditedTime) ?? publishedTime;

    // summary 가 짧으면(예: "컴포넌트 추상화") 제목·카테고리로 문장을 보강해 검색 결과 설명이 빈약하지 않게 한다
    const summary = post.summary?.trim() ?? "";
    const fallback = `${post.title}에 대해 정리한 전다훈 ${section.name}${category ? ` ${category}` : ""} 글입니다.`;
    const description = clampDescription(
        summary.length >= 40 ? summary : summary ? `${summary}. ${fallback}` : fallback
    );

    // 카카오·네이버·페이스북 미리보기는 SVG og:image 를 렌더링하지 못한다 → 기본 이미지로 대체
    const image =
        post.thumbnail && !/\.svg(\?|$)/i.test(decodeURIComponent(post.thumbnail))
            ? post.thumbnail
            : undefined;

    const keywords = [
        ...tags,
        ...(category ? [category] : []),
        section.name,
    ];

    return {
        title: post.title,
        description,
        path,
        keywords,
        image,
        type: "article",
        publishedTime,
        modifiedTime,
        section: category ?? section.name,
        tags,
        jsonLd: [
            {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description,
                url: toAbsoluteUrl(path),
                mainEntityOfPage: toAbsoluteUrl(path),
                image: toAbsoluteUrl(image || SITE.defaultImage),
                datePublished: publishedTime,
                dateModified: modifiedTime,
                inLanguage: "ko-KR",
                keywords: keywords.join(", "),
                articleSection: category ?? section.name,
                author: personJsonLd,
                publisher: personJsonLd,
            },
            breadcrumbJsonLd([
                { name: "홈", path: "/" },
                { name: section.name, path: section.basePath },
                { name: post.title, path },
            ]),
        ],
    };
};
