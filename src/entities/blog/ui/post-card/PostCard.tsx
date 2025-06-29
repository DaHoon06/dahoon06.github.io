import { ReactElement, useMemo } from "react";
import { PostType } from "@entities/notion/types";
import { Category } from "../Category";
import Image from "next/image";
import { Tag } from "../Tag";
import styles from "./PostCard.module.scss";
import { postDateFormatter } from "@entities/blog/lib/formatDate";
import { DateFormmater } from "../DateFormatter";

interface PostCardProps {
    post: PostType;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    const category = (post.category && post.category?.[0]) || undefined;
    const thumbnail = useMemo(
        () => post.thumbnail || "/images/default.png",
        [post.thumbnail]
    );

    return (
        <article className={styles.postCard}>
            <div className={styles.postCard__content}>
                {category && (
                    <div className={styles.category}>
                        <Category>{category}</Category>
                    </div>
                )}

                <div
                    data-thumb={!!post.thumbnail}
                    data-category={!!category}
                    className={styles.content}
                >
                    <header className={styles.top}>
                        <h2>{post.title}</h2>
                    </header>

                    <div className={styles.summary}>
                        <p>{post.summary}</p>
                    </div>

                    <DateFormmater date={post.date.start_date} />

                    <div className={styles.tags}>
                        {post.tags &&
                            post.tags.map((tag: string, idx: number) => (
                                <Tag key={idx}>{tag}</Tag>
                            ))}
                    </div>
                </div>
            </div>

            <div className={styles.thumbnail}>
                <Image
                    src={thumbnail}
                    fill
                    alt={post.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </article>
    );
};
