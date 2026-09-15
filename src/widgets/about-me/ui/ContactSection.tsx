import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";
import { ROUTES } from "@shared/routes";
import { profileData } from "../model";
import { Magnetic, Reveal } from "./motion";

const MARQUEE_TEXT = Array.from({ length: 6 }, () => "LET'S WORK TOGETHER");

/** 대형 마퀴 + 마그네틱 CTA로 마무리하는 컨택트 푸터 */
export const ContactSection = () => {
    return (
        <section className="w-full overflow-hidden pb-16 pt-28 md:pt-40">
            {/* 대형 마퀴 스트립 */}
            <div className="flex overflow-hidden border-y border-white/10 py-6 md:py-8">
                <div className="flex w-max motion-reduce:[animation:none] [animation:pf-marquee_28s_linear_infinite]">
                    {[0, 1].map((copy) => (
                        <div
                            key={copy}
                            aria-hidden={copy === 1}
                            className="flex items-center gap-8 pr-8"
                        >
                            {MARQUEE_TEXT.map((text, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-8 whitespace-nowrap"
                                >
                                    <span
                                        className={
                                            i % 2 === 0
                                                ? "text-5xl font-black tracking-tight text-white md:text-7xl"
                                                : "text-5xl font-black tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(201,203,248,0.7)] md:text-7xl"
                                        }
                                    >
                                        {text}
                                    </span>
                                    <span className="text-2xl text-[#c9cbf8]">
                                        ✦
                                    </span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
                <div className="flex flex-col items-center gap-10 py-24 text-center md:py-32">
                    <Reveal>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                            (05) — Contact
                        </p>
                        <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                            새로운 도전을
                            <br />
                            함께할 준비가 되어 있어요
                        </h2>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <Magnetic strength={0.4}>
                            <a
                                href={`mailto:${profileData.email}`}
                                className="group flex h-36 w-36 flex-col items-center justify-center gap-1 rounded-full bg-[#c9cbf8] text-black transition-colors duration-300 hover:bg-white md:h-44 md:w-44"
                            >
                                <FaEnvelope
                                    size={20}
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                                />
                                <span className="text-sm font-bold tracking-widest">
                                    SAY HELLO
                                </span>
                            </a>
                        </Magnetic>
                    </Reveal>

                    <Reveal delay={0.25}>
                        <div className="flex items-center gap-4">
                            <a
                                href={profileData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-colors hover:border-[#c9cbf8] hover:text-[#c9cbf8]"
                            >
                                <FaGithub size={16} />
                            </a>
                            <a
                                href={profileData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-colors hover:border-[#c9cbf8] hover:text-[#c9cbf8]"
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                        </div>
                    </Reveal>
                </div>

                <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-600 md:flex-row">
                    <p>
                        © {new Date().getFullYear()}. {profileData.name}. All
                        rights reserved.
                    </p>
                    <Link
                        href={ROUTES.HOME}
                        className="font-semibold text-zinc-400 transition-colors hover:text-[#c9cbf8]"
                    >
                        ← 블로그로 돌아가기
                    </Link>
                </footer>
            </div>
        </section>
    );
};
