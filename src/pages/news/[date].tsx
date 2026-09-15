import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { CONFIG } from "@root/site.config";
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
import { NewsArchiveNav } from "@widgets/nav";

interface NewsDatePageProps {
    archive: NewsArchive | null;
    summaries: NewsArchiveSummary[];
}

const NewsDatePage: NextPage<NewsDatePageProps> = ({ archive, summaries }) => {
    const title = archive
        ? `${formatArchiveDate(archive.date)} 개발 뉴스`
        : "개발 뉴스";

    return (
        <>
            <Head>
                <title>{`${title} | ${CONFIG.blog.title}`}</title>
                <meta
                    name="description"
                    content={`${title} — RSS · Hacker News · GitHub Trending 자동 수집`}
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
