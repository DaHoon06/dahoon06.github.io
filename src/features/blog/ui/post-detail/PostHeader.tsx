import { PostType } from "@entities/notion/types";
import Image from "next/image";
import { formatDate } from "@entities/blog/posts/lib/formatDate";
import { Tag } from "@entities/blog/tag/Tag";

type PostHeaderProps = {
    data: PostType;
};

export const PostHeader = ({ data }: PostHeaderProps) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {data.title}
            </h1>

            {data.type[0] !== "Paper" && (
                <nav className="text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="text-lg font-medium my-4 md:ml-0">
                            {formatDate(
                                data?.date?.start_date || data.createdTime,
                                "ko-KR"
                            )}
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        {data.tags && (
                            <div className="flex gap-2 flex-nowrap overflow-x-auto max-w-full bg-primary-000 rounded-lg p-2">
                                {data.tags.map((tag: string) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        )}
                    </div>
                    {data.thumbnail && (
                        <div
                            className="relative overflow-hidden rounded-3xl w-full bg-zinc-900 mb-7"
                            style={{ paddingBottom: "50%" }}
                        >
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
