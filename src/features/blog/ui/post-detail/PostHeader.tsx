import { PostType } from "@entities/notion/types";
import Image from "next/image";
import styles from "./PostHeader.module.scss";
import { formatDate } from "@entities/blog/posts/lib/formatDate";
import { Tag } from "@entities/blog/tag/Tag";

type PostHeaderProps = {
    data: PostType;
};

export const PostHeader = ({ data }: PostHeaderProps) => {
    return (
        <div className={styles.postHeader}>
            <h1 className={styles.title}>{data.title}</h1>

            {data.type[0] !== "Paper" && (
                <nav>
                    <div className={styles.top}>
                        <div className={styles.date}>
                            {formatDate(
                                data?.date?.start_date || data.createdTime,
                                "ko-KR"
                            )}
                        </div>
                    </div>
                    <div className={styles.mid}>
                        {data.tags && (
                            <div className={styles.tags}>
                                {data.tags.map((tag: string) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        )}
                    </div>
                    {data.thumbnail && (
                        <div className={styles.thumbnail}>
                            <Image
                                src={data.thumbnail}
                                style={{ objectFit: "cover" }}
                                fill
                                alt={data.title}
                            />
                        </div>
                    )}
                </nav>
            )}
        </div>
    );
};
