import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { CONFIG } from "@root/site.config";
import {
    readLatestNewsArchive,
    readNewsArchiveSummaries,
} from "@entities/news/lib/news-archive";
import type { NewsArchive, NewsArchiveSummary } from "@entities/news";
import { NewsDigest } from "@features/news/news-list";
import { BaseLayout } from "@widgets/layouts";
import { NewsArchiveNav } from "@widgets/nav";

interface NewsPageProps {
    archive: NewsArchive | null;
    summaries: NewsArchiveSummary[];
}

const NewsPage: NextPage<NewsPageProps> = ({ archive, summaries }) => {
    return (
        <>
            <Head>
                <title>{`개발 뉴스 | ${CONFIG.blog.title}`}</title>
                <meta
                    name="description"
                    content="RSS · Hacker News · GitHub Trending 에서 매일 자동 수집한 개발 소식"
                />
            </Head>
            <BaseLayout
                aside={
                    <NewsArchiveNav
                        summaries={summaries}
                        currentDate={archive?.date}
                    />
                }
            >
                <NewsDigest archive={archive} />
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
