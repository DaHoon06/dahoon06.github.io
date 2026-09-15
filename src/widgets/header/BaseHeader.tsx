import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { isNavItemActive, NAV_ITEMS } from "@shared/config/nav";
import { ROUTES } from "@shared/routes";
import { Logo } from "@shared/ui/Logo";
import cn from "@shared/lib/cn";

export const BaseHeader = (): ReactElement => {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-5 sm:px-6 lg:px-8">
                <Link
                    href={ROUTES.HOME}
                    className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
                >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#111]">
                        <Logo className="flex" />
                    </span>
                </Link>

                {/* 모바일에서는 하단 탭 바가 같은 메뉴를 들고 있어 감춘다 */}
                <nav className="hidden items-center gap-0.5 md:flex md:gap-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={cn(
                                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                                isNavItemActive(router.pathname, item)
                                    ? "text-zinc-900"
                                    : "text-zinc-500 hover:text-zinc-900"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};
