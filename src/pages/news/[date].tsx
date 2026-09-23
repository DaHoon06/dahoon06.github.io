import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
    listNewsDates,
    readNewsArchive,
    readNewsArchiveSummaries,
} from "@entities/news/lib/news-archive";
import {
    formatArchiveDate,
    type NewsArchive,
    type NewsArchiveSummary,
} from "@entities/news";
import { NewsDigest } from "@features/news/news-list";
import { BaseLayout } from "@widgets/layouts";
import { NewsArchiveNav, NewsArchiveStrip } from "@widgets/nav";
import { PAGE_SEO, breadcrumbJsonLd } from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";

interface NewsDatePageProps {
    archive: NewsArchive | null;
    summaries: NewsArchiveSummary[];
}

const NewsDatePage: NextPage<NewsDatePageProps> = ({ archive, summaries }) => {
    const dateLabel = archive ? formatArchiveDate(archive.date) : "";
    const title = archive ? `${dateLabel} 개발 뉴스` : "개발 뉴스";
    const path = archive ? `/news/${archive.date}` : PAGE_SEO.news.path;
    // 상위 헤드라인 몇 개를 설명문에 넣어 날짜별 페이지가 서로 다른 설명을 갖게 한다
    const headlines = (archive?.items ?? [])
        .slice(0, 3)
        .map((item) => item.title)
        .join(", ");
    const description = archive
        ? `${dateLabel} 개발 뉴스 ${archive.items.length}건${headlines ? ` — ${headlines}` : ""}`
        : PAGE_SEO.news.description;

    return (
        <>
            <SeoHead
                title={title}
                description={description}
                path={path}
                keywords={[
                    "개발 뉴스",
                    "IT 뉴스",
                    `${dateLabel} 뉴스`,
                    "Hacker News",
                    "GitHub Trending",
                ]}
                jsonLd={breadcrumbJsonLd([
                    { name: "홈", path: "/" },
                    { name: "개발 뉴스", path: PAGE_SEO.news.path },
                    { name: title, path },
                ])}
            />
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
                            summaries={summaries}
                            currentDate={archive?.date}
                        />
                    }
                />
            </BaseLayout>
        </>
    );
};

export default NewsDatePage;

/** output: "export" 라 모든 날짜를 빌드 시점에 확정해야 한다 */
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: listNewsDates().map((date) => ({ params: { date } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<NewsDatePageProps> = async ({
    params,
}) => {
    const date = `${params?.date ?? ""}`;

    return {
        props: {
            archive: readNewsArchive(date),
            summaries: readNewsArchiveSummaries(),
        },
    };
};
