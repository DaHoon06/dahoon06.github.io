import { notionQueryKeys } from "@entities/notion";
import { readCachedArchiving } from "@entities/notion/lib/notion-cache";
import { queryClient } from "@shared/lib/react-query";
import {
    dehydrate,
    DehydratedState,
    HydrationBoundary,
} from "@tanstack/react-query";
import { GetStaticProps, NextPage } from "next";
import { CONFIG } from "@root/site.config";
import { BaseLayout } from "@widgets/layouts";
import { ArchivingListRenderer } from "@features/blog/post-list";

interface ArchivingPageProps {
    dehydratedState: DehydratedState;
}

const ArchivingPage: NextPage<ArchivingPageProps> = ({ dehydratedState }) => {
    return (
        <HydrationBoundary state={dehydratedState}>
            <BaseLayout>
                <ArchivingListRenderer />
            </BaseLayout>
        </HydrationBoundary>
    );
};

export default ArchivingPage;

export const getStaticProps: GetStaticProps = async () => {
    const posts = readCachedArchiving();
    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.archivings(),
        queryFn: () => posts,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        ...(CONFIG.isProd ? { revalidate: 3600 } : {}),
    };
};
