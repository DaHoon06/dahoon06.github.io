import { ReactElement } from "react";
import { PostType } from "@entities/notion/types";
import Link from "next/link";
import { Category } from "./Category";
import Image from "next/image";
import { Tag } from "./Tag";
import styled from "styled-components";

interface PostCardProps {
    post: PostType;
}

function formatDate(date: any, local: any) {
    const d = new Date(date);
    const options: any = { year: "numeric", month: "short", day: "numeric" };
    const res = d.toLocaleDateString(local, options);
    return res;
}
const StyledWrapper = styled(Link)`
    article {
        position: relative;
        margin-bottom: 2rem;
        border-radius: 12px;
        background-color: #1e1e1e;
        overflow: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .category {
            position: absolute;
            top: 1rem;
            left: 1rem;
            z-index: 10;
        }

        .thumbnail {
            position: relative;
            width: 100%;
            background-color: #2a2a2a;
            padding-bottom: 60%;

            @media (min-width: 1024px) {
                padding-bottom: 45%;
            }

            img {
                object-fit: cover;
                border-bottom: 1px solid #333;
            }
        }

        .content {
            padding: 1.25rem;
            color: #d4d4d4;

            &[data-thumb="false"] {
                padding-top: 3.5rem;
            }

            &[data-category="false"] {
                padding-top: 1.5rem;
            }

            .top {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                @media (min-width: 768px) {
                    flex-direction: row;
                    align-items: baseline;
                }

                h2 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #ffffff;
                    cursor: pointer;
                    transition: color 0.2s ease;

                    &:hover {
                        color: #60a5fa;
                    }

                    @media (min-width: 768px) {
                        font-size: 1.375rem;
                    }
                }
            }

            .date {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                font-size: 0.875rem;
                color: #999;

                margin-bottom: 1rem;
            }

            .summary {
                margin-bottom: 1rem;

                p {
                    display: none;
                    line-height: 1.8;
                    color: #cccccc;

                    @media (min-width: 768px) {
                        display: block;
                    }
                }
            }

            .tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
        }
    }
`;

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
