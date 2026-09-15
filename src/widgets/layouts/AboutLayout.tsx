import { ReactNode, useEffect } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import { ROUTES } from "@shared/routes";
import { BottomNavigation } from "@widgets/nav";

/**
 * 포트폴리오 전용 몰입형 레이아웃.
 *
 * 블로그의 BaseLayout(흰 배경 + 스티키 헤더)을 쓰지 않고,
 * 다크 풀블리드 + Lenis 스무스 스크롤 + 오버레이 헤더로 구성한다.
 * 모바일 하단 탭은 사이트 공통 내비게이션이므로 유지한다.
 */
export const AboutLayout = ({ children }: { children: ReactNode }) => {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        let rafId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#08080b] pb-[calc(4rem+env(safe-area-inset-bottom,_0px))] text-zinc-100 selection:bg-[#c9cbf8] selection:text-black md:pb-0">
            {/* 스크롤 진행 바 */}
            <motion.div
                style={{ scaleX: progress }}
                className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#c9cbf8] to-[#7c80e0]"
            />

            {/* 오버레이 헤더 — mix-blend-difference로 어떤 배경 위에서도 읽힌다 */}
            <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
                <div className="flex h-16 items-center justify-between px-6 text-white md:px-10">
                    <Link
                        href={ROUTES.HOME}
                        className="text-sm font-black tracking-[0.2em] transition-opacity hover:opacity-60"
                    >
                        DAHOON.DEV
                    </Link>
                    <Link
                        href={ROUTES.POSTS}
                        className="text-xs font-semibold tracking-[0.2em] transition-opacity hover:opacity-60"
                    >
                        BLOG ↗
                    </Link>
                </div>
            </header>

            {children}

            <BottomNavigation />
        </div>
    );
};
