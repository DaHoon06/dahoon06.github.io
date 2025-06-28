import { ReactElement, useMemo } from "react";
import { PostType } from "@entities/notion/types";
import { Category } from "../Category";
import Image from "next/image";
import { Tag } from "../Tag";
import { formatDate } from "../../lib/formatDate";
import styles from "./PostCard.module.scss";
import { Author } from "../Author";

interface PostCardProps {
    post: PostType;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    const category = (post.category && post.category?.[0]) || undefined;
    const thumbnail = useMemo(
        () => post.thumbnail || "/images/default.png",
        [post.thumbnail]
    );
    console.log(thumbnail);
    const author = (post.author && post.author?.[0]) || undefined;

    return (
        <article className={styles.postCard}>
            <div>
                {category && (
                    <div className="category">
                        <Category>{category}</Category>
                    </div>
                )}

                <div
                    data-thumb={!!post.thumbnail}
                    data-category={!!category}
                    className="content"
                >
                    <header className="top">
                        <h2>{post.title}</h2>
                    </header>

                    <div className="summary">
                        <p>{post.summary}</p>
                    </div>

                    {author && (
                        <Author
                            profileImage={author.profile_photo}
                            name={author.name}
                            date={post.date.start_date}
                        />
                    )}

                    <div className="tags">
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
