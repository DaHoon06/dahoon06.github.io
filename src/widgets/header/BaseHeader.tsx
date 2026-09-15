import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CONFIG } from "@root/site.config";
import { ROUTES } from "@shared/routes";
import { Logo } from "@shared/ui/Logo";
import cn from "@shared/lib/cn";

interface NavItem {
    label: string;
    href: string;
    /** 활성 판별용 경로 prefix (href가 하위 페이지를 가리킬 때 사용) */
    match?: string;
    exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { label: "홈", href: ROUTES.HOME, exact: true },
    { label: "아카이빙", href: ROUTES.ARCHIVING },
    { label: "도구", href: ROUTES.TOOLS, match: "/tools" },
    { label: "About", href: ROUTES.ABOUT },
];

export const BaseHeader = (): ReactElement => {
    const router = useRouter();

    const isActive = ({ href, match, exact }: NavItem) =>
        exact
            ? router.pathname === href
            : router.pathname.startsWith(match ?? href);

    return (
        <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-5 sm:px-6 lg:px-8">
                <Link
                    href={ROUTES.HOME}
                    className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
                >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#111]">
                        <Logo className="flex" />
                    </span>
                    <span className="text-[17px] font-bold tracking-tight text-zinc-900">
                        {CONFIG.profile.name}
                    </span>
                </Link>

                <nav className="flex items-center gap-0.5 sm:gap-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3",
                                isActive(item)
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
