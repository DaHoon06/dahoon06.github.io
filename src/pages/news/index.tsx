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
            <SeoHead {...PAGE_SEO.news} jsonLd={newsJsonLd} />
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

export default NewsPage;

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
    return {
        props: {
            archive: readLatestNewsArchive(),
            summaries: readNewsArchiveSummaries(),
        },
    };
};
