import { ReactElement, useMemo } from "react";
import { PostType } from "@entities/notion/types";
import Image from "next/image";
import styles from "./PostCard.module.scss";
import { DateFormatter } from "../shared/ui/DateFormatter";
import { Category } from "../shared/ui/Category";
import { Tag } from "../tag/Tag";
import { Author } from "../shared/ui/Author";

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
                <Author
                    profileImage={post.author?.[0]?.profile_photo || ""}
                    name={post.author?.[0]?.name || ""}
                />

                {/* {category && (
                    <div className={styles.category}>
                        <Category>{category}</Category>
                    </div>
                )} */}

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

                    <DateFormatter date={post.date.start_date} />

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
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </article>
    );
};
