import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { queryClient } from "@shared/libs/react-query";
import {
    dehydrate,
    HydrationBoundary,
    QueryClientProvider,
} from "@tanstack/react-query";
import { BlogLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";
import { PostList } from "@features/blog/ui/PostList";
import { CONFIG } from "@root/site.config";
import SearchInput from "@entities/blog/ui/SearchInput";
import { useState } from "react";
import { CategorySelect } from "@entities/blog/ui/CategorySelect";

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
    const [keyword, setKeyword] = useState("");
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <BlogLayout>
                    <SearchInput
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <CategorySelect />
                    <PostList keyword={keyword} />
                </BlogLayout>
            </HydrationBoundary>
        </QueryClientProvider>
    );
};

export default BlogPage;
