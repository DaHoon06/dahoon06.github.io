import { ReactElement } from "react";
import cn from "@shared/lib/cn";
import { PostType } from "@entities/notion/@x/blog";
import { formatDate } from "../lib/format-date";

type ArchivingFrameVariant = "featured" | "carousel" | "compact";

interface ArchivingFrameCardProps {
    post: PostType;
    /**
     * featured — PC 그리드 좌측 대형 액자
     * carousel — 모바일 가로 스크롤 슬라이드 (대형과 소형의 중간 크기)
     * compact  — PC 그리드 우측 소형 액자
     */
    variant?: ArchivingFrameVariant;
    className?: string;
}

const VARIANT_STYLE = {
    featured: {
        padding: "p-6 sm:p-7",
        title: "line-clamp-3 text-xl leading-snug sm:text-2xl",
        date: "mt-3 text-xs",
        labels: 3,
        summary: true,
    },
    carousel: {
        padding: "p-5",
        title: "line-clamp-3 text-[17px] leading-snug",
        date: "mt-3 text-xs",
        labels: 2,
        summary: true,
    },
    compact: {
        padding: "p-4 sm:p-5",
        title: "line-clamp-2 text-[15px] leading-snug",
        date: "mt-1.5 text-[11px]",
        labels: 2,
        summary: false,
    },
} as const;

/**
 * 아카이빙 "액자" 카드.
 *
 * 아카이빙 글은 대부분 썸네일이 없어서(업무 정리 문서라 대표 이미지를 안 넣는다)
 * 이미지가 없을 때도 그리드가 비어 보이지 않도록 slug 해시로 고정 그라디언트를
 * 깔고, 그 위에 같은 규격의 오버레이 텍스트를 올린다. 썸네일이 있으면 그 자리에
 * 이미지가 들어갈 뿐 레이아웃은 동일하다.
 */
const FRAME_GRADIENTS = [
    "from-[#4b4ea8] via-[#6366c4] to-[#c9cbf8]",
    "from-[#1f2544] via-[#4b4ea8] to-[#7c80e0]",
    "from-[#2d3561] via-[#5b5fc7] to-[#a6a9ef]",
    "from-[#3f3d66] via-[#7c80e0] to-[#c9cbf8]",
    "from-[#232946] via-[#3f4394] to-[#8f93e8]",
];

const pickGradient = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
    }
    return FRAME_GRADIENTS[hash % FRAME_GRADIENTS.length];
};

export const ArchivingFrameCard = ({
    post,
    variant = "compact",
    className,
}: ArchivingFrameCardProps): ReactElement => {
    const date = post.date?.start_date || post.createdTime;
    const labels = post.category?.length ? post.category : post.tags;
    const style = VARIANT_STYLE[variant];

    return (
        <article
            className={cn(
                "group relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-black/5",
                "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-900/15",
                className
            )}
        >
            {/* 배경: 썸네일 or 그라디언트 폴백 */}
            {post.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={post.thumbnail}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105",
                        pickGradient(post.slug || post.id)
                    )}
                >
                    {/* 아주 옅은 도트 패턴 — 단색 그라디언트만 있으면 밋밋해서 결을 준다 */}
                    <div
                        className="absolute inset-0 opacity-[0.18]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#fff 1px, transparent 1px)",
                            backgroundSize: "14px 14px",
                        }}
                    />
                </div>
            )}

            {/* 하단 텍스트 가독성용 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

            {/* 액자 테두리 */}
            <div className="pointer-events-none absolute inset-2.5 rounded-xl border border-white/25 transition-colors duration-300 group-hover:border-white/45 sm:inset-3" />

            <div
                className={cn(
                    "relative flex h-full flex-col justify-end",
                    style.padding
                )}
            >
                {labels && labels.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1.5">
                        {labels.slice(0, style.labels).map((label) => (
                            <span
                                key={label}
                                className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white/90 uppercase backdrop-blur-sm"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                <h3
                    className={cn(
                        "font-bold tracking-tight text-white",
                        style.title
                    )}
                >
                    {post.title}
                </h3>

                {style.summary && post.summary && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
                        {post.summary}
                    </p>
                )}

                {date && (
                    <p className={cn("text-white/55", style.date)}>
                        {formatDate(date, "ko-KR")}
                    </p>
                )}
            </div>
        </article>
    );
};
