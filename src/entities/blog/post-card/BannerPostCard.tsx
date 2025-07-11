import { PostType } from "@entities/notion/types";
import styles from "./BannerPostCard.module.scss";
import Image from "next/image";
import { useMemo } from "react";
import { Category } from "../shared/ui/Category";
import { Tag } from "../tag/Tag";
import { DateFormatter } from "../shared/ui/DateFormatter";

interface BannerPostCardProps {
    post: PostType;
}

export const BannerPostCard = ({ post }: BannerPostCardProps) => {
    const category = (post.category && post.category?.[0]) || undefined;

    const thumbnail = useMemo(
        () => post.thumbnail || "/images/default.png",
        [post.thumbnail]
    );

    const author = (post.author && post.author?.[0]) || undefined;

    return (
        <article className={styles.bannerPostCard}>
            <div className={styles.thumbnail}>
                <Image
                    src={thumbnail}
                    fill
                    alt={post.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className={styles.bannerPostCard__content}>
                {category && (
                    <div className={styles.category}>
                        <Category>{category}</Category>
                    </div>
                )}

                <div>
                    <h3 className={styles.title}>{post.title}</h3>
                    <div className={styles.summary}>
                        <p>{post.summary}</p>
                    </div>
                </div>

                <DateFormatter date={post.date.start_date} />

                <div className={styles.tags}>
                    {post.tags &&
                        post.tags.map((tag: string, idx: number) => (
                            <Tag key={idx}>{tag}</Tag>
                        ))}
                </div>
            </div>
        </article>
    );
};
