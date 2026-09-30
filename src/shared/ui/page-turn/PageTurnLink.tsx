import { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePageTurn } from "./usePageTurn";
import type { PageTurnDirection, PageTurnLabel } from "./usePageTurnStore";

interface PageTurnLinkProps {
    href: string;
    label: PageTurnLabel;
    direction?: PageTurnDirection;
    className?: string;
    children: ReactNode;
    "aria-label"?: string;
}

/**
 * 클릭 시 종이 넘김 전환으로 이동하는 링크.
 * 실제 a 태그라 새 탭 열기(⌘/Ctrl 클릭)·프리패치·크롤링은 그대로 동작한다.
 */
export const PageTurnLink = ({
    href,
    label,
    direction,
    className,
    children,
    ...rest
}: PageTurnLinkProps) => {
    const turnTo = usePageTurn();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
            return;
        e.preventDefault();
        void turnTo(href, { direction, label });
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={className}
            scroll={false}
            {...rest}
        >
            {children}
        </Link>
    );
};
