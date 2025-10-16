import { PostType } from "@entities/notion/types";
import Image from "next/image";
import { formatDate } from "@entities/blog/lib/formatDate";

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
                <nav className="text-[#222]">
                    <div className="flex items-center">
                        <div className="text-lg font-medium my-2 md:ml-0">
                            {formatDate(
                                data?.date?.start_date || data.createdTime,
                                "ko-KR"
                            )}
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        {data.tags && (
                            <div className="flex gap-2 flex-nowrap overflow-x-auto max-w-full  rounded-lg p-1">
                                {data.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-[.8rem] font-normal text-white rounded-md p-1 transition-colors duration-200 bg-[#ff7337] "
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <hr className="my-2 border-gray-600" />

                    {data.thumbnail && (
                        <div
                            className="relative overflow-hidden rounded-3xl w-full mb-7"
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
