import { ReactElement, useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchivingFrameCard } from "@entities/blog";
import { PostType } from "@entities/notion";
import { ROUTES } from "@shared/routes";
import useArchivingsQuery from "../model/use-archivings-query";

const SHOWCASE_LIMIT = 5;

/**
 * 홈 상단 아카이빙 섹션.
 *
 * - PC(md 이상): 좌측 대형 1 + 우측 2x2 의 액자 모자이크 그리드
 * - 모바일: 같은 카드를 scroll-snap 가로 캐러셀로 (JS 캐러셀 라이브러리 없이 CSS만)
 */
export const ArchivingShowcase = (): ReactElement | null => {
    const archivings = useArchivingsQuery();
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const posts = useMemo<PostType[]>(
        () => archivings.slice(0, SHOWCASE_LIMIT),
        [archivings]
    );

    // 슬라이드 폭이 vw 기반이라 상수로 못 잡는다. 첫 슬라이드 실측값으로 계산한다.
    const handleScroll = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        const slide = track.firstElementChild as HTMLElement | null;
        if (!slide) return;

        const step = slide.offsetWidth + 16; // gap-4
        setActiveIndex(Math.round(track.scrollLeft / step));
    }, []);

    const moveTo = (index: number) => {
        const track = trackRef.current;
        const slide = track?.firstElementChild as HTMLElement | null;
        if (!track || !slide) return;

        track.scrollTo({
            left: index * (slide.offsetWidth + 16),
            behavior: "smooth",
        });
    };

    const [featured, ...rest] = posts;

    if (!featured) return null;

    return (
        <section className="mb-12">
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-zinc-900">
                        아카이빙
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        업무하며 마주친 문제와 정리해 둔 기록
                    </p>
                </div>
                <Link
                    href={ROUTES.ARCHIVING}
                    className="flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                >
                    전체 보기
                    <ArrowRight size={13} />
                </Link>
            </div>

            {/* PC — 액자 모자이크 */}
            <div className="hidden h-[420px] grid-cols-4 grid-rows-2 gap-3 md:grid">
                <Link
                    href={ROUTES.ARCHIVING_DETAIL(featured.slug)}
                    className="col-span-2 row-span-2 min-h-0"
                >
                    <ArchivingFrameCard post={featured} variant="featured" />
                </Link>

                {rest.map((post) => (
                    <Link
                        key={`${post.id}_${post.slug}`}
                        href={ROUTES.ARCHIVING_DETAIL(post.slug)}
                        className="min-h-0"
                    >
                        <ArchivingFrameCard post={post} />
                    </Link>
                ))}
            </div>

            {/* 모바일 — 가로 스크롤 캐러셀 */}
            <div className="md:hidden">
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="scrollbar-hide -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6"
                >
                    {posts.map((post) => (
                        <Link
                            key={`${post.id}_${post.slug}`}
                            href={ROUTES.ARCHIVING_DETAIL(post.slug)}
                            className="aspect-[3/4] w-[72%] max-w-[260px] shrink-0 snap-start"
                        >
                            <ArchivingFrameCard post={post} variant="carousel" />
                        </Link>
                    ))}
                </div>

                {posts.length > 1 && (
                    <div className="mt-4 flex justify-center gap-1.5">
                        {posts.map((post, index) => (
                            <button
                                key={`dot_${post.id}`}
                                type="button"
                                aria-label={`${index + 1}번째 아카이빙 보기`}
                                onClick={() => moveTo(index)}
                                className={
                                    index === activeIndex
                                        ? "h-1.5 w-5 rounded-full bg-zinc-800 transition-all"
                                        : "h-1.5 w-1.5 rounded-full bg-zinc-300 transition-all"
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
