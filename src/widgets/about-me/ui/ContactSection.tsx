import Link from "next/link";
import { ROUTES } from "@shared/routes";
import { profileData } from "../model";
import { Container, Headline, OutlineButton } from "./layout";
import { Reveal } from "./motion";

/** 연락처 + 푸터 */
export const ContactSection = () => (
    <section
        id="contact"
        className="relative scroll-mt-16 overflow-hidden pt-28 md:pt-40"
    >
        <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_40%_40%,rgba(255,255,255,0.06),transparent_70%)]"
        />

        <Container className="relative">
            <Reveal>
                <Headline>
                    새로운 도전을
                    <br />
                    함께 완성해 나갈 동료가 되겠습니다
                </Headline>
                <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-zinc-400">
                    코드를 작성하는 것을 넘어, 제품이 사용자에게 주는 가치를
                    함께 고민하는 동료를 찾으신다면 편하게 연락 주세요.
                </p>
            </Reveal>

            <Reveal delay={0.1}>
                <ul className="mt-10 space-y-1.5 border-l border-white/20 pl-5 text-sm">
                    <li>
                        <a
                            href={`mailto:${profileData.email}`}
                            className="text-zinc-200 transition-colors hover:text-white hover:underline"
                        >
                            {profileData.email}
                        </a>
                    </li>
                    <li>
                        <a
                            href={profileData.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-200 transition-colors hover:text-white hover:underline"
                        >
                            {profileData.github.replace("https://", "")}
                        </a>
                    </li>
                </ul>
                <div className="mt-10">
                    <OutlineButton
                        href={`mailto:${profileData.email}`}
                        external
                    >
                        메일 보내기
                    </OutlineButton>
                </div>
            </Reveal>

            <footer className="mt-32 flex flex-col gap-4 border-t border-white/10 py-10 text-xs text-zinc-500 md:mt-40 md:flex-row md:items-center md:justify-between">
                <p>
                    Copyright © {new Date().getFullYear()} {profileData.nameEn}
                    . All rights reserved.
                </p>
                <Link
                    href={ROUTES.HOME}
                    className="text-zinc-400 transition-colors hover:text-white"
                >
                    ← 블로그로 돌아가기
                </Link>
            </footer>
        </Container>
    </section>
);
