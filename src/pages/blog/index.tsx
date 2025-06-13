import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { queryClient } from "@shared/libs/react-query";
import { dehydrate } from "@tanstack/react-query";
import { BlogLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
    const posts = filterPosts(await getPosts());
    await queryClient.prefetchQuery(notionQueryKeys.posts(), () => posts);
    console.log(posts);
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 3600,
    };
};

const BlogPage = () => {
    return (
        <BlogLayout>
            <h1>Blog</h1>
        </BlogLayout>
    );
};

export default BlogPage;
