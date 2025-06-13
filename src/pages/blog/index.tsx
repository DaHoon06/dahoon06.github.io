import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { queryClient } from "@shared/libs/react-query";
import { dehydrate } from "@tanstack/react-query";
import { BlogLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";
import { useQuery } from "@tanstack/react-query";
import { PostList } from "@features/blog/ui/PostList";

export const getStaticProps: GetStaticProps = async () => {
    const posts = filterPosts(await getPosts());
    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.posts(),
        queryFn: () => posts,
    });
    console.log(posts);
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        // revalidate: 3600, // 배포환경에서만 사용
    };
};

const BlogPage = () => {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery({
        queryKey: notionQueryKeys.posts(),
        queryFn: async () => filterPosts(await getPosts()),
    });

    if (isLoading)
        return (
            <BlogLayout>
                <div>Loading...</div>
            </BlogLayout>
        );
    if (error)
        return (
            <BlogLayout>
                <div>Error: {String(error)}</div>
            </BlogLayout>
        );

    return (
        <BlogLayout>
            <h1>Blog</h1>

            <PostList q={""} />
        </BlogLayout>
    );
};

export default BlogPage;
