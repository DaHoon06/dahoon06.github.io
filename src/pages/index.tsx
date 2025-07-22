import { useState } from "react";
import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { queryClient } from "@shared/libs/react-query";
import {
    dehydrate,
    DehydratedState,
    HydrationBoundary,
} from "@tanstack/react-query";
import { GetStaticProps, NextPage } from "next";
import { CONFIG } from "@root/site.config";
import { recentlyPosts } from "@entities/notion/libs/recentlyPosts";
import { BlogLayout } from "@widgets/layouts";
import { PostList } from "@features/blog/ui/post-list/PostList";
import { TagList } from "@features/blog/ui/tag-list/TagList";
import styles from "./index.module.scss";
import Footer from "@widgets/layouts/Footer";

interface HomePageProps {
    dehydratedState: DehydratedState;
}

const HomePage: NextPage<HomePageProps> = ({ dehydratedState }) => {
    const [keyword, setKeyword] = useState("");
    return (
        <HydrationBoundary state={dehydratedState}>
            <BlogLayout isSearch={true} onChangeKeyword={setKeyword}>
                <div className={styles.container}>
                    <div className={styles.post}>
                        <PostList keyword={keyword} />
                    </div>
                    <div className={styles.aside}>
                        <TagList />
                    </div>
                </div>
            </BlogLayout>
            <Footer />
        </HydrationBoundary>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const posts = filterPosts(await getPosts());
    const recentlyPost = recentlyPosts(posts, 4);
    console.log(posts);
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
