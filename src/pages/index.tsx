import {
    filterPosts,
    getPosts,
    getArchiving,
    notionQueryKeys,
} from "@entities/notion";
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

interface HomePageProps {
    dehydratedState: DehydratedState;
}

const HomePage: NextPage<HomePageProps> = ({ dehydratedState }) => {
    return (
        <HydrationBoundary state={dehydratedState}>
            <BaseLayout aside={<BlogSideNav />}>
                <PostListRenderer
                    heading={`안녕하세요, ${CONFIG.profile.name}입니다`}
                    description={CONFIG.profile.bio}
                />
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
