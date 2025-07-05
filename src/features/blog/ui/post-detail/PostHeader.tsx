import { PostType } from "@entities/notion/types";
import Image from "next/image";
import styles from "./PostHeader.module.scss";
import { formatDate } from "@entities/blog/lib/formatDate";
import { Tag } from "@entities/blog/ui/tag/Tag";

type PostHeaderProps = {
    data: PostType;
};

export const PostHeader = ({ data }: PostHeaderProps) => {
    return (
        <div className={styles.postHeader}>
            <h1 className="title">{data.title}</h1>
            {data.type[0] !== "Paper" && (
                <nav>
                    <div className="top">
                        <div className="date">
                            {formatDate(
                                data?.date?.start_date || data.createdTime,
                                "ko-KR"
                            )}
                        </div>
                    </div>
                    <div className="mid">
                        {data.tags && (
                            <div className="tags">
                                {data.tags.map((tag: string) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        )}
                    </div>
                    {data.thumbnail && (
                        <div className="thumbnail">
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
