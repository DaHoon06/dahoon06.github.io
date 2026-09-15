import {
    Archive,
    Home,
    Newspaper,
    User,
    Wrench,
    type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@shared/routes";

export type NavItemType = {
    key: string;
    label: string;
    /** 하단 탭용 축약 라벨 (없으면 label을 쓴다) */
    shortLabel?: string;
    href: string;
    icon: LucideIcon;
    /** 활성 판별용 경로 prefix (href가 하위 페이지를 가리킬 때 사용) */
    match?: string;
    exact?: boolean;
};

/**
 * 헤더(데스크톱)와 하단 탭(모바일)이 **같은 목록 하나**를 본다.
 * 메뉴를 추가·삭제하는 자리는 여기 한 곳이다.
 */
export const NAV_ITEMS: NavItemType[] = [
    { key: "home", label: "홈", href: ROUTES.HOME, icon: Home, exact: true },
    {
        key: "archiving",
        label: "아카이빙",
        href: ROUTES.ARCHIVING,
        icon: Archive,
    },
    {
        key: "news",
        label: "뉴스",
        href: ROUTES.NEWS,
        match: "/news",
        icon: Newspaper,
    },
    {
        key: "tools",
        label: "도구",
        href: ROUTES.TOOLS,
        match: "/tools",
        icon: Wrench,
    },
    { key: "about", label: "About", href: ROUTES.ABOUT, icon: User },
];

export const isNavItemActive = (
    pathname: string,
    item: NavItemType
): boolean =>
    item.exact
        ? pathname === item.href
        : pathname.startsWith(item.match ?? item.href);
