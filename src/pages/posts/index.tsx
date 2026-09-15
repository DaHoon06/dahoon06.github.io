import { filterPosts, notionQueryKeys } from "@entities/notion";
import {
    readCachedArchiving,
    readCachedPosts,
} from "@entities/notion/lib/notion-cache";
import { queryClient } from "@shared/lib/react-query";
import {
    dehydrate,
    DehydratedState,
    HydrationBoundary,
} from "@tanstack/react-query";
import { GetStaticProps, NextPage } from "next";
import { CONFIG } from "@root/site.config";
import { BaseLayout } from "@widgets/layouts";
import { BlogSideNav } from "@widgets/nav";
import { PostListRenderer } from "@features/blog/post-list";

interface PostsPageProps {
    dehydratedState: DehydratedState;
}

const PostsPage: NextPage<PostsPageProps> = ({ dehydratedState }) => {
    return (
        <HydrationBoundary state={dehydratedState}>
            <BaseLayout aside={<BlogSideNav />}>
                <PostListRenderer heading="블로그" />
            </BaseLayout>
        </HydrationBoundary>
    );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
    const posts = filterPosts(readCachedPosts());
    const archivings = readCachedArchiving();

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
        props: { dehydratedState: dehydrate(queryClient) },
        ...(CONFIG.isProd ? { revalidate: 3600 } : {}),
    };
};
