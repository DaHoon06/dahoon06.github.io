import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { ExtendedRecordMap } from "notion-types";
import { PostType } from "@entities/notion";
import { formatDate } from "@entities/blog/lib/format-date";
import { ROUTES } from "@shared/routes";
import { CONFIG } from "@root/site.config";
import { getReadingMinutes } from "../lib/reading-time";

type PostHeaderProps = {
    data: PostType & { recordMap?: ExtendedRecordMap };
};

/** 카테고리·태그 배지 — 글자색 테두리의 알약 모양 */
const BADGE_CLASS =
    "inline-flex min-h-[1.35rem] items-center rounded-full border border-current px-[0.45rem] py-[0.12rem] text-[0.72rem] font-bold leading-[1.2] opacity-80 transition-opacity hover:opacity-100";

export const PostHeader = ({ data }: PostHeaderProps) => {
    const isPaper = data.type[0] === "Paper";
    const readingMinutes = useMemo(
        () => getReadingMinutes(data.recordMap),
        [data.recordMap]
    );

    return (
        <header className="mb-[1.7rem]">
            <Link
                href={ROUTES.POSTS}
                className="mb-5 inline-flex items-center gap-1 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-700 sm:mb-6"
            >
                <ArrowLeft size={14} />
                목록으로
            </Link>

            <h1 className="border-b border-black/[0.07] pb-[calc(0.40625rem-1px)] text-[1.625rem] font-extrabold leading-[1.25] tracking-tight text-[#333] sm:text-[2rem]">
                {data.title}
            </h1>

            {!isPaper && (
                <>
                    <div className="mt-[1.2rem] flex flex-wrap items-center gap-x-3 gap-y-[0.45rem] text-[0.88rem] text-[#333] opacity-[0.78]">
                        <time
                            dateTime={data.date?.start_date || data.createdTime}
                        >
                            {formatDate(
                                data?.date?.start_date || data.createdTime,
                                "ko-KR"
                            )}
                        </time>
                        <span>약 {readingMinutes}분 읽기</span>

                        {!!(data.category?.length || data.tags?.length) && (
                            <span className="inline-flex flex-wrap items-center gap-[0.35rem]">
                                {/* 목록은 아직 카테고리 필터가 없어서 링크 없이 표시만 한다 */}
                                {data.category?.map((category) => (
                                    <span
                                        key={category}
                                        className={BADGE_CLASS}
                                    >
                                        {category}
                                    </span>
                                ))}
                                {data.tags?.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={ROUTES.POSTS_WITH_TAG(tag)}
                                        className={BADGE_CLASS}
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </span>
                        )}

                        {CONFIG.utterances.enable && (
                            <a
                                href="#post-comments"
                                className="border-b border-current text-[#0670d6]"
                            >
                                댓글로 이동
                            </a>
                        )}
                    </div>

                    {data.summary && (
                        <p className="mt-4 text-[0.9375rem] leading-[1.625] text-black/50">
                            {data.summary}
                        </p>
                    )}

                    {data.thumbnail && (
                        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md bg-zinc-100">
                            <Image
                                src={data.thumbnail}
                                alt={data.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 720px"
                                className="object-cover"
                            />
                        </div>
                    )}
                </>
            )}
        </header>
    );
};
