import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { queryClient } from "@shared/libs/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { CONFIG } from "@root/site.config";
import { recentlyPosts } from "@entities/notion/libs/recentlyPosts";
import { RecentlyPostList } from "@features/blog/ui/post-list/RecentlyPostList";
import { BlogLayout } from "@widgets/layouts";
import { MainBanner } from "@entities/portpolio/main-banner/ui/MainBanner";
import { TagList } from "@entities/blog/ui/tag/TagList";

interface HomePageProps {
    dehydratedState: any;
}

const HomePage = ({ dehydratedState }: HomePageProps) => {
    return (
        <HydrationBoundary state={dehydratedState}>
            <BlogLayout isSearch={false}>
                <MainBanner />
                <TagList />
                <RecentlyPostList />
            </BlogLayout>
        </HydrationBoundary>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const posts = filterPosts(await getPosts());
    const recentlyPost = recentlyPosts(posts, 4);

    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.posts(),
        queryFn: () => posts,
    });
    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.recentlyPosts(),
        queryFn: () => recentlyPost,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        ...(CONFIG.isProd ? { revalidate: 3600 } : {}),
    };
};
