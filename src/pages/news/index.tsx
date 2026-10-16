import { GetStaticProps, NextPage } from "next";
import {
    readLatestNewsArchive,
    readNewsArchiveSummaries,
} from "@entities/news/lib/news-archive";
import type { NewsArchive, NewsArchiveSummary } from "@entities/news";
import { NewsDigest } from "@features/news/news-list";
import { BaseLayout } from "@widgets/layouts";
import { NewsArchiveNav, NewsArchiveStrip } from "@widgets/nav";
import { PAGE_SEO, breadcrumbJsonLd } from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";

/** 모바일 칩은 가로 스크롤이라 최근 것만 깐다 (PC 달력은 전체) */
const STRIP_LIMIT = 30;

const newsJsonLd = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "개발 뉴스", path: PAGE_SEO.news.path },
]);

interface NewsPageProps {
    archive: NewsArchive | null;
    summaries: NewsArchiveSummary[];
}

const NewsPage: NextPage<NewsPageProps> = ({ archive, summaries }) => {
    return (
        <>
            {/* 자동 수집 링크 모음이라 검색·AdSense 심사 대상에서 뺀다 */}
            <SeoHead {...PAGE_SEO.news} noindex jsonLd={newsJsonLd} />
            <BaseLayout
                aside={
                    <NewsArchiveNav
                        summaries={summaries}
                        currentDate={archive?.date}
                    />
                }
            >
                <NewsDigest
                    archive={archive}
                    dateNav={
                        <NewsArchiveStrip
                            summaries={summaries.slice(0, STRIP_LIMIT)}
                            currentDate={archive?.date}
                        />
                    }
                />
            </BaseLayout>
        </>
    );
};

export default NewsPage;

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
    return {
        props: {
            archive: readLatestNewsArchive(),
            summaries: readNewsArchiveSummaries(),
        },
    };
};
