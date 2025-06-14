import { ReactElement } from "react";
import { PostType } from "@entities/notion/types";
import { Category } from "./Category";
import Image from "next/image";
import { Tag } from "./Tag";
import { StyledWrapper } from "./PostCard.styled";
import { formatDate } from "../lib/formatDate";

interface PostCardProps {
    post: PostType;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    const category = (post.category && post.category?.[0]) || undefined;

    return (
        <StyledWrapper href={`/blog/${post.slug}`}>
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
                    <div className="date">
                        {formatDate(
                            post?.date?.start_date || post.createdTime,
                            "ko-KR"
                        )}
                    </div>
                    <header className="top">
                        <h2>{post.title}</h2>
                    </header>

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
        </StyledWrapper>
    );
};
