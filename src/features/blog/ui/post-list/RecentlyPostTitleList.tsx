import { ReactElement } from "react";
import Link from "next/link";
import styles from "./RecentlyPostTitleList.module.scss";
import useRecentlyPostsQuery from "../../services/useRecentlyPostsQuery";

export const RecentlyPostTitleList = (): ReactElement => {
    const recentlyPosts = useRecentlyPostsQuery();
    return (
        <article className={styles.recentlyPostTitleList}>
            <header className={styles.header}>
                <h2>최근 글</h2>
            </header>
            <ul className={styles.postList}>
                {recentlyPosts.map((post, index) => (
                    <li
                        key={post.id}
                        className={
                            index === 0 ? styles.firstPost : styles.otherPost
                        }
                    >
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </article>
    );
};
