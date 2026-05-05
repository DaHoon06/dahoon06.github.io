import { CONFIG } from "@root/site.config";
import { NextPageWithLayout } from "@shared/types";
import CustomHead from "@shared/ui/heads/CustomHead";
import { CustomError } from "@widgets/error";
import { BaseLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";
import path from "path";
import fs from "fs";
import { TableOfContents } from "@entities/blog";
import { PostType, notionQueryKeys, getRecordMap } from "@entities/notion";
import { useArchivingQuery } from "@features/blog/post-list";
import { dehydrate } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/react-query";
import { ArchivingDetail } from "@features/blog/post-detail/ui/ArchivingDetail";

const cachedArchiving = fs.readFileSync(
    path.join(process.cwd(), "posts/cachedArchiving.json"),
    "utf8"
);

const archivings = JSON.parse(cachedArchiving);

const ArchivingDetailPage: NextPageWithLayout = () => {
    const archiving: any = useArchivingQuery();
    if (!archiving) return <CustomError />;

    const image =
        archiving.thumbnail ??
        CONFIG.ogImageGenerateURL ??
        `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(archiving.title)}.png`;

    const date = archiving.date?.start_date || archiving.createdTime || "";

    const meta = {
        title: archiving.title,
        date: new Date(date).toISOString(),
        image,
        description: archiving.summary || "",
        type: archiving.type[0],
        url: `${CONFIG.link}/${archiving.slug}`,
    };

    return (
        <>
            <CustomHead {...meta} />
            <BaseLayout>
                <ArchivingDetail />
                <TableOfContents />
            </BaseLayout>
        </>
    );
};

export default ArchivingDetailPage;

export const getStaticPaths = async () => {
    return {
        paths: archivings.map(
            (archiving: PostType) => `/archiving/${archiving.slug}`
        ),
        fallback: CONFIG.isProd,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug as string;
    const archiving = archivings.find((t: PostType) => t.slug === slug);

    if (!archiving) {
        return { notFound: true };
    }

    const recordMap = await getRecordMap(archiving.id);

    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.archiving(`${slug}`),
        queryFn: () => ({ ...archiving, recordMap }),
    });

    return {
        props: { dehydratedState: dehydrate(queryClient) },
    };
};
