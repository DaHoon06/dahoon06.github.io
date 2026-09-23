import Link from "next/link";
import { postDateFormatter } from "@entities/blog";
import type { PostType } from "@entities/notion";
import { ROUTES } from "@shared/routes";
import { ImageLoader } from "@shared/ui/images";
import { Container, Headline, OutlineButton, SplitLayout } from "./layout";
import { Reveal } from "./motion";

/** 블로그 최신 글 — 무엇을 공부하고 기록하는지 보여주는 섹션 */
export const WritingSection = ({ posts }: { posts: PostType[] }) => {
    if (posts.length === 0) return null;

    return (
        <section id="writing" className="scroll-mt-16 py-28 md:py-40">
            <Container>
                <Reveal className="mb-16 md:mb-20">
                    <Headline>
                        기술과 경험을 기록하며,
                        <br />더 나은 개발자로 성장합니다
                    </Headline>
                </Reveal>

                <SplitLayout
                    aside={
                        <Reveal>
                            <p className="text-[15px] leading-[1.8] text-zinc-400">
                                실무에서 부딪힌 문제와 해결 과정, 새로 익힌
                                기술을 블로그에 꾸준히 정리하고 있습니다.
                            </p>
                            <div className="mt-10">
                                <OutlineButton href={ROUTES.POSTS}>
                                    전체 글 보기
                                </OutlineButton>
                            </div>
                        </Reveal>
                    }
                >
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
                        {posts.map((post, i) => (
                            <li key={post.id}>
                                <Reveal delay={(i % 2) * 0.08}>
                                    <Link
                                        href={ROUTES.POST(post.slug)}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[16/10]">
                                            <ImageLoader
                                                src={post.thumbnail || ""}
                                                alt={post.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 360px"
                                                className="grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                                            />
                                        </div>
                                        <h3 className="mt-5 line-clamp-2 text-lg font-medium leading-snug text-white">
                                            {post.title}
                                        </h3>
                                        {post.summary && (
                                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                                                {post.summary}
                                            </p>
                                        )}
                                        <p className="mt-3 text-xs text-zinc-500">
                                            {postDateFormatter(
                                                post.date?.start_date ||
                                                    post.createdTime
                                            )}
                                        </p>
                                    </Link>
                                </Reveal>
                            </li>
                        ))}
                    </ul>
                </SplitLayout>
            </Container>
        </section>
    );
};
