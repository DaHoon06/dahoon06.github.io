import { ReactNode } from "react";
import { BaseHeader } from "@widgets/header";
import { BottomNavigation } from "@widgets/nav";
import { CONFIG } from "@root/site.config";

interface BaseLayoutProps {
    children: ReactNode;
    /** PC에서만 노출되는 우측 sticky 네비게이션 (모바일은 숨김) */
    aside?: ReactNode;
}

export const BaseLayout = ({ children, aside }: BaseLayoutProps) => {
    return (
        /* 하단 탭 바 높이만큼 본문 아래를 비워 둔다 (모바일 전용) */
        <div className="flex min-h-screen flex-col bg-white pb-[calc(4rem+env(safe-area-inset-bottom,_0px))] md:pb-0">
            <BaseHeader />

            <div className="mx-auto w-full max-w-[1180px] flex-1 px-5 sm:px-6 lg:px-8">
                <div className="flex gap-12 py-10 lg:py-14">
                    <main className="min-w-0 flex-1">{children}</main>

                    {aside && (
                        <aside className="hidden w-[248px] shrink-0 lg:block">
                            <div className="sticky top-[88px]">{aside}</div>
                        </aside>
                    )}
                </div>
            </div>

            <footer className="border-t border-zinc-100">
                <div className="mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-6 lg:px-8">
                    <p className="text-xs text-zinc-400">
                        © {CONFIG.since}. {CONFIG.profile.name}. All rights
                        reserved.
                    </p>
                </div>
            </footer>

            <BottomNavigation />
        </div>
    );
};
