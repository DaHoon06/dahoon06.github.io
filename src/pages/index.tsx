import { filterPosts, getPosts, getArchiving, notionQueryKeys } from "@entities/notion";
import { queryClient } from "@shared/lib/react-query";
import {
    dehydrate,
    DehydratedState,
    HydrationBoundary,
} from "@tanstack/react-query";
import { GetStaticProps, NextPage } from "next";
import { CONFIG } from "@root/site.config";
import { BaseLayout } from "@widgets/layouts";
import { PostListRenderer } from "@features/blog/post-list/ui/PostListRenderer";

interface HomePageProps {
    dehydratedState: DehydratedState;
}

const HomePage: NextPage<HomePageProps> = ({ dehydratedState }) => {
    return (
        <HydrationBoundary state={dehydratedState}>
            <BaseLayout>
                <PostListRenderer />
            </BaseLayout>
        </HydrationBoundary>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const [posts, archivings] = await Promise.all([
        getPosts().then(filterPosts),
        getArchiving(),
    ]);

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: notionQueryKeys.posts(),
            queryFn: () => posts,
        }),
        queryClient.prefetchQuery({
            queryKey: notionQueryKeys.archivings(),
            queryFn: () => archivings,
        }),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        ...(CONFIG.isProd ? { revalidate: 3600 } : {}),
    };
};
