import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { PostType } from "@entities/notion";
import { formatDate } from "@entities/blog/lib/format-date";
import { ROUTES } from "@shared/routes";

type PostHeaderProps = {
    data: PostType;
};

export const PostHeader = ({ data }: PostHeaderProps) => {
    const isPaper = data.type[0] === "Paper";

    return (
        <header className="mb-8 sm:mb-10">
            <Link
                href={ROUTES.POSTS}
                className="mb-5 inline-flex items-center gap-1 text-[13px] font-medium text-zinc-400 transition-colors hover:text-primary-900 sm:mb-6"
            >
                <ArrowLeft size={14} />
                목록으로
            </Link>

            <h1 className="text-[20px] font-bold leading-[1.35] tracking-tight text-zinc-900 sm:text-[22px]">
                {data.title}
            </h1>

            {!isPaper && (
                <>
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-zinc-400">
                        <time
                            dateTime={data.date?.start_date || data.createdTime}
                        >
                            {formatDate(
                                data?.date?.start_date || data.createdTime,
                                "ko-KR"
                            )}
                        </time>
                        {data.tags && data.tags.length > 0 && (
                            <>
                                <span aria-hidden>·</span>
                                <span className="flex flex-wrap gap-1.5">
                                    {data.tags.map((tag: string) => (
                                        <Link
                                            key={tag}
                                            href={ROUTES.POSTS_WITH_TAG(tag)}
                                            className="rounded-full bg-zinc-100 px-2 py-0.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-primary-50 hover:text-primary-900"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </span>
                            </>
                        )}
                    </div>

                    {data.summary && (
                        <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">
                            {data.summary}
                        </p>
                    )}

                    {data.thumbnail && (
                        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 sm:rounded-2xl">
                            <Image
                                src={data.thumbnail}
                                alt={data.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 720px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    <hr className="mt-8 border-zinc-200" />
                </>
            )}
        </header>
    );
};
