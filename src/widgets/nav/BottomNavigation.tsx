import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { isNavItemActive, NAV_ITEMS } from "@shared/config/nav";
import cn from "@shared/lib/cn";

/**
 * 모바일 하단 탭 바 (웹 앱뷰).
 *
 * 높이는 4rem이 아니라 `4rem + safe-area`다 — 고정 높이에 하단 패딩만 더하면
 * border-box 특성상 탭 콘텐츠 자리가 그만큼 깎여(iOS 34px) 아이콘·라벨이 밀린다.
 * 패딩은 홈 인디케이터를 피하는 용도로만 남긴다.
 *
 * 활성 표시는 상단 2px 잉크 바 — 헤더의 활성 표시(진한 글자색)와 같은 문법이다.
 * 이 잉크 바에 framer-motion `layoutId`(공유 레이아웃)를 쓰면 안 된다: 탭 바가
 * `_app`이 아니라 페이지별 레이아웃 안에 있어 라우팅마다 통째로 언마운트→마운트된다.
 * 그러면 framer는 직전(스크롤된) 위치 스냅샷에서 `position: fixed`인 새 위치로
 * 스프링 애니메이션을 걸어, 잉크 바가 화면 아래에서 튀어 올라오는 것처럼 보인다.
 */
export const BottomNavigation = (): ReactElement => {
    const router = useRouter();

    return (
        <nav
            data-slot="bottom-nav"
            className="fixed inset-x-0 bottom-0 z-40 flex h-[calc(4rem+env(safe-area-inset-bottom,_0px))] items-stretch border-t border-zinc-100 bg-white/95 pb-[env(safe-area-inset-bottom,_0px)] backdrop-blur-md md:hidden"
        >
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isNavItemActive(router.pathname, item);

                return (
                    <Link
                        key={item.key}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                            "relative flex flex-1 flex-col items-center justify-center gap-1 transition-colors",
                            active
                                ? "text-zinc-900"
                                : "text-zinc-400 hover:text-zinc-600"
                        )}
                    >
                        <span
                            aria-hidden
                            className={cn(
                                "absolute top-0 h-[2px] w-8 rounded-full bg-zinc-900 transition-opacity",
                                active ? "opacity-100" : "opacity-0"
                            )}
                        />
                        <Icon size={19} strokeWidth={active ? 2.2 : 1.8} />
                        <span
                            className={cn(
                                "text-[11px] leading-none",
                                active ? "font-semibold" : "font-medium"
                            )}
                        >
                            {item.shortLabel ?? item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
};
