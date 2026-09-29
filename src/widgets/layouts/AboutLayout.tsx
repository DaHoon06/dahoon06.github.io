import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { ChevronUp } from "lucide-react";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";
import { BottomNavigation } from "@widgets/nav";
import { SocialLinks } from "@widgets/about-me";

const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Career", href: "#career" },
    { label: "Projects", href: "#projects" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
];

/**
 * 포트폴리오 전용 레이아웃.
 *
 * 블로그의 BaseLayout(흰 배경 + 스티키 헤더)을 쓰지 않고,
 * 블랙 & 화이트 모노톤 + Lenis 스무스 스크롤 + 섹션 앵커 헤더로 구성한다.
 * 모바일 하단 탭은 사이트 공통 내비게이션이므로 유지한다.
 */
export const AboutLayout = ({ children }: { children: ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            anchors: { offset: -64 },
        });
        lenisRef.current = lenis;

        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        lenis.on("scroll", onScroll);

        let rafId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    const scrollToTop = () => {
        if (lenisRef.current) lenisRef.current.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-[#161616] pb-[calc(4rem+env(safe-area-inset-bottom,_0px))] break-keep text-zinc-100 selection:bg-white selection:text-black md:pb-0">
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
                    scrolled
                        ? "border-b border-white/5 bg-[#161616]/80 backdrop-blur-md"
                        : "border-b border-transparent"
                )}
            >
                <div className="mx-auto flex h-16 w-full max-w-[1100px] items-center justify-between px-5 md:px-8">
                    <div className="flex items-center gap-12">
                        <Link
                            href={ROUTES.HOME}
                            className="text-[15px] font-medium text-white transition-opacity hover:opacity-70"
                        >
                            Dahoon&apos;s Portfolio
                        </Link>
                        <nav className="hidden items-center gap-8 md:flex">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <SocialLinks />
                </div>
            </header>

            {children}

            <button
                type="button"
                onClick={scrollToTop}
                aria-label="맨 위로"
                className={cn(
                    "fixed right-5 bottom-[calc(5rem+env(safe-area-inset-bottom,_0px))] z-40 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-700/80 text-white backdrop-blur transition-all duration-300 hover:bg-zinc-600 md:right-10 md:bottom-10",
                    scrolled
                        ? "opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0"
                )}
            >
                <ChevronUp size={20} />
            </button>

            <BottomNavigation />
        </div>
    );
};
