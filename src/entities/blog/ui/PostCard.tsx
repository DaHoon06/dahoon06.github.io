import { ReactElement } from "react";
import { PostType } from "@entities/notion/types";
import Link from "next/link";
import { Category } from "./Category";
import Image from "next/image";
import { Tag } from "./Tag";

interface PostCardProps {
    post: PostType;
}

function formatDate(date: any, local: any) {
    const d = new Date(date);
    const options: any = { year: "numeric", month: "short", day: "numeric" };
    const res = d.toLocaleDateString(local, options);
    return res;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    const category = (post.category && post.category?.[0]) || undefined;

    return (
        <Link href={`/blog/${post.slug}`}>
            <article>
                {category && (
                    <div className="category">
                        <Category>{category}</Category>
                    </div>
                )}

                {post.thumbnail && (
                    <div className="thumbnail">
                        <Image
                            src={post.thumbnail}
                            fill
                            alt={post.title}
                            style={{ objectFit: "cover" }}
                        />
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
                    <div className="date">
                        <div className="content">
                            {formatDate(
                                post?.date?.start_date || post.createdTime,
                                "ko-KR"
                            )}
                        </div>
                    </div>
                    <div className="summary">
                        <p>{post.summary}</p>
                    </div>
                    <div className="tags">
                        {post.tags &&
                            post.tags.map((tag: string, idx: number) => (
                                <Tag key={idx}>{tag}</Tag>
                            ))}
                    </div>
                </div>
            </article>
        </Link>
    );
};
