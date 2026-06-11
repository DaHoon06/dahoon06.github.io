import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    LayoutDashboard,
    FileText,
    Archive,
    Newspaper,
    TrendingUp,
    Wrench,
    UtensilsCrossed,
    User,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";
import { BaseHeader } from "@widgets/header";
import { CONFIG } from "@root/site.config";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";
import { Logo } from "@shared/ui/Logo";

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { label: "홈", href: ROUTES.HOME, icon: LayoutDashboard, exact: true },
    { label: "블로그", href: ROUTES.POSTS, icon: FileText },
    { label: "아카이빙", href: ROUTES.ARCHIVING, icon: Archive },
    { label: "뉴스", href: ROUTES.NEWS, icon: Newspaper },
    { label: "주식", href: ROUTES.STOCKS, icon: TrendingUp },
    { label: "요리", href: ROUTES.FOOD, icon: UtensilsCrossed },
    { label: "도구", href: ROUTES.TOOLS, icon: Wrench },
];

function getPageTitle(pathname: string): string {
    if (pathname === ROUTES.HOME) return "홈";
    if (pathname.startsWith(ROUTES.POSTS)) return "블로그";
    if (pathname.startsWith(ROUTES.ARCHIVING)) return "아카이빙";
    if (pathname.startsWith(ROUTES.NEWS)) return "뉴스";
    if (pathname.startsWith(ROUTES.STOCKS)) return "주식";
    if (pathname.startsWith(ROUTES.FOOD)) return "요리";
    if (pathname.startsWith(ROUTES.TOOLS)) return "도구";
    if (pathname.startsWith(ROUTES.ABOUT)) return "어바웃";
    return "페이지";
}

export const BaseLayout = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();

    const isNavActive = (href: string, exact?: boolean) => {
        if (exact) return router.pathname === href;
        return router.pathname.startsWith(href);
    };

    const closeSidebar = () => setIsSidebarOpen(false);
    const pageTitle = getPageTitle(router.pathname);

    const desktopSidebarWidth = isCollapsed ? "lg:w-[60px]" : "lg:w-[240px]";
    const labelVisible = isCollapsed ? "lg:hidden" : "";
    const socialVisible = isCollapsed ? "hidden" : "hidden lg:flex";

    return (
        <div className="h-screen bg-zinc-100 flex overflow-hidden">
            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "flex flex-col bg-[#111111] overflow-y-auto shrink-0",
                    // Mobile: fixed overlay
                    "fixed inset-y-0 left-0 z-50 w-[240px]",
                    "transition-all duration-300 ease-in-out",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    // Desktop: static in flex flow
                    "lg:static lg:translate-x-0 lg:z-auto",
                    desktopSidebarWidth
                )}
            >
                {/* Logo + Collapse button */}
                <div
                    className={cn(
                        "flex h-14 shrink-0 items-center border-b border-white/[0.06]",
                        isCollapsed ? "lg:justify-center px-2" : "gap-3 px-4"
                    )}
                >
                    <button
                        onClick={() => isCollapsed && setIsCollapsed(false)}
                        className={cn(
                            "w-8 h-8 shrink-0 select-none",
                            isCollapsed ? "lg:cursor-pointer" : "cursor-default"
                        )}
                        title={isCollapsed ? "사이드바 펼치기" : undefined}
                    >
                        <Logo />
                    </button>
                    <span
                        className={cn(
                            "font-semibold text-white text-sm tracking-tight truncate hidden",
                            labelVisible === "" ? "lg:block" : ""
                        )}
                    >
                        Dahoon06
                    </span>
                    {/* Desktop collapse toggle — only visible when expanded */}
                    {!isCollapsed && (
                        <button
                            onClick={() => setIsCollapsed(true)}
                            className="hidden lg:flex items-center justify-center w-6 h-6 ml-auto rounded-md text-[#555] hover:text-white hover:bg-white/[0.08] transition-colors"
                            title="사이드바 접기"
                        >
                            <ChevronLeft size={14} />
                        </button>
                    )}
                </div>

                {/* Nav items */}
                <nav className="flex-1 px-2 py-3 space-y-0.5">
                    {NAV_ITEMS.map((item) => {
                        const active = isNavActive(item.href, item.exact);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeSidebar}
                                title={item.label}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-lg px-3 py-[9px]",
                                    "transition-colors duration-150 group",
                                    active
                                        ? "bg-white/[0.08] text-white"
                                        : "text-[#888] hover:bg-white/[0.04] hover:text-white"
                                )}
                            >
                                {active && (
                                    <span className="absolute left-0 inset-y-[8px] w-[3px] rounded-r-full bg-[#ff7337]" />
                                )}
                                <item.icon
                                    size={16}
                                    className={cn(
                                        "shrink-0 transition-colors",
                                        active
                                            ? "text-[#ff7337]"
                                            : "text-[#555] group-hover:text-[#999]"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "text-[13px] font-medium",
                                        labelVisible
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Divider */}
                <div className="mx-3 h-px bg-white/[0.06] shrink-0" />

                {/* Profile */}
                <div className="shrink-0 p-2 pb-4">
                    <div className="flex items-center gap-3 rounded-lg px-3 py-[9px]">
                        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden ring-1 ring-white/[0.12]">
                            {CONFIG.profile.image ? (
                                <img
                                    src={CONFIG.profile.image}
                                    alt={CONFIG.profile.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#2a2a2a] flex items-center justify-center">
                                    <User size={14} className="text-[#666]" />
                                </div>
                            )}
                        </div>
                        <div className={cn("min-w-0", labelVisible)}>
                            <p className="text-[13px] font-semibold text-white truncate leading-tight">
                                {CONFIG.profile.name}
                            </p>
                            <p className="text-[11px] text-[#666] truncate mt-0.5">
                                {CONFIG.profile.role}
                            </p>
                        </div>
                    </div>

                    {/* Social links */}
                    <div
                        className={cn(
                            "items-center gap-1 px-2 mt-1",
                            socialVisible
                        )}
                    >
                        <a
                            href={`https://github.com/${CONFIG.profile.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                            className="flex items-center justify-center w-7 h-7 rounded-md text-[#555] hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                            <IoLogoGithub size={13} />
                        </a>
                        <a
                            href={`mailto:${CONFIG.profile.email}`}
                            title="이메일"
                            className="flex items-center justify-center w-7 h-7 rounded-md text-[#555] hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                            <IoMailOutline size={13} />
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <BaseHeader
                    pageTitle={pageTitle}
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={() => setIsSidebarOpen((p) => !p)}
                />

                <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 pb-[84px] lg:pb-6">
                    {children}
                </main>

                <footer className="hidden lg:flex items-center shrink-0 px-6 py-3 border-t border-zinc-200 bg-white">
                    <p className="text-[11px] text-zinc-400">
                        Copyright © 2026. {CONFIG.profile.name}. All Rights
                        Reserved.
                    </p>
                </footer>
            </div>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t border-zinc-200 flex items-stretch lg:hidden z-30">
                {NAV_ITEMS.map((item) => {
                    const active = isNavActive(item.href, item.exact);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors",
                                active
                                    ? "text-[#ff7337]"
                                    : "text-zinc-400 hover:text-zinc-600"
                            )}
                        >
                            <item.icon size={20} />
                            <span className="text-[10px] font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};
