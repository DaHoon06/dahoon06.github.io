import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { queryClient } from "@shared/libs/react-query";
import {
    dehydrate,
    DehydratedState,
    HydrationBoundary,
} from "@tanstack/react-query";
import { BlogLayout } from "@widgets/layouts";
import { GetStaticProps, NextPage } from "next";
import { PostList } from "@features/blog/ui/post-list/PostList";
import { CONFIG } from "@root/site.config";
import { useState } from "react";
import { recentlyPosts } from "@entities/notion/libs/recentlyPosts";
import { CategorySelect } from "@entities/blog/shared/ui/CategorySelect";

interface BlogPageProps {
    dehydratedState: DehydratedState;
}

const PostsPage: NextPage<BlogPageProps> = ({ dehydratedState }) => {
    const [keyword, setKeyword] = useState("");

    return (
        <HydrationBoundary state={dehydratedState}>
            <BlogLayout isSearch={true} onChangeKeyword={setKeyword}>
                <CategorySelect />
                <PostList keyword={keyword} />
            </BlogLayout>
        </HydrationBoundary>
    );
};

export default PostsPage;

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
