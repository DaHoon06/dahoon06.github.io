import { ReactElement } from "react";
import Link from "next/link";
import { TOOL_ITEMS } from "@shared/config/tools";
import { ROUTES } from "@shared/routes";
import { HomeSectionHeader } from "./HomeSectionHeader";

/** 홈 — 개발 도구 바로가기. 목록은 TOOL_ITEMS 한 곳에서만 관리한다 */
export const ToolsShortcut = (): ReactElement => (
    <section>
        <HomeSectionHeader
            title="개발 도구"
            description="브라우저에서 바로 쓰는 작은 유틸"
            href={ROUTES.TOOLS}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {TOOL_ITEMS.map(({ key, title, eyebrow, href, icon: Icon }) => (
                <Link
                    key={key}
                    href={href}
                    className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors group-hover:text-primary-900">
                        <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold tracking-tight text-zinc-900">
                            {title}
                        </span>
                        <span className="block truncate text-[11px] text-zinc-400">
                            {eyebrow}
                        </span>
                    </span>
                </Link>
            ))}
        </div>
    </section>
);
