import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { queryClient } from "@shared/libs/react-query";
import { dehydrate, QueryClientProvider } from "@tanstack/react-query";
import { BlogLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";
import { PostList } from "@features/blog/ui/PostList";
import { CONFIG } from "@root/site.config";

export const getStaticProps: GetStaticProps = async () => {
    const posts = filterPosts(await getPosts());
    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.posts(),
        queryFn: () => posts,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        ...(CONFIG.isProd ? { revalidate: 3600 } : {}),
    };
};

interface BlogPageProps {
    dehydratedState: any;
}

const BlogPage = ({ dehydratedState }: BlogPageProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <BlogLayout>
                <h1>Blog</h1>
                <PostList q={""} />
            </BlogLayout>
        </QueryClientProvider>
    );
};

export default BlogPage;
