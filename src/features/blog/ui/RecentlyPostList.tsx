import { ReactElement } from "react";
import Link from "next/link";
import styles from "./RecentlyPostList.module.scss";
import useRecentlyPostsQuery from "../services/useRecentlyPostsQuery";
import { BannerPostCard, PostCard } from "@entities/blog/ui/post-card";

export const RecentlyPostList = (): ReactElement => {
    const recentlyPosts = useRecentlyPostsQuery();
    return (
        <div className={styles.recentlyPostList}>
            <header className={styles.header}>
                <h2>최근 글</h2>
                <Link href="/blog">더보기</Link>
            </header>
            <ul className={styles.postList}>
                {recentlyPosts.map((post, index) => (
                    <li
                        key={post.id}
                        className={
                            index === 0 ? styles.firstPost : styles.otherPost
                        }
                    >
                        {index === 0 ? (
                            <BannerPostCard post={post} />
                        ) : (
                            <PostCard post={post} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
