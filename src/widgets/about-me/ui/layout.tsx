import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import cn from "@shared/lib/cn";

/** 포트폴리오 공통 컨테이너 — 본문 폭 1100px 고정 */
export const Container = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => (
    <div
        className={cn("mx-auto w-full max-w-[1100px] px-5 md:px-8", className)}
    >
        {children}
    </div>
);

/**
 * 좌측 설명(aside) + 우측 본문 2단 레이아웃.
 * 데스크톱에서 aside는 스크롤을 따라오는 sticky 컬럼이 된다.
 */
export const SplitLayout = ({
    aside,
    children,
}: {
    aside: ReactNode;
    children: ReactNode;
}) => (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[260px_1fr] md:gap-16 lg:grid-cols-[300px_1fr] lg:gap-24">
        <aside className="md:sticky md:top-28 md:self-start">{aside}</aside>
        <div className="min-w-0">{children}</div>
    </div>
);

/** 섹션 대제목 + 리드 문단 */
export const SectionTitle = ({
    title,
    lead,
    className,
}: {
    title: ReactNode;
    lead?: ReactNode;
    className?: string;
}) => (
    <div className={cn("mb-12 md:mb-16", className)}>
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {title}
        </h2>
        {lead && (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-400 md:text-base">
                {lead}
            </p>
        )}
    </div>
);

/** 섹션 리드 헤드라인 (한글 두 줄 인사말 등) */
export const Headline = ({ children }: { children: ReactNode }) => (
    <h2 className="text-[1.75rem] font-bold leading-[1.45] tracking-tight text-white md:text-[2rem]">
        {children}
    </h2>
);

/** 각진 아웃라인 버튼 — 내부 링크는 next/link, 외부/메일은 a 태그 */
export const OutlineButton = ({
    href,
    children,
    external,
}: {
    href: string;
    children: ReactNode;
    external?: boolean;
}) => {
    const className =
        "group inline-flex items-center gap-2 border border-white/20 px-5 py-4 text-sm text-white transition-colors hover:border-white hover:bg-white hover:text-black";
    const content = (
        <>
            {children}
            <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
            />
        </>
    );

    if (external) {
        return (
            <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={className}
            >
                {content}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
};

/** 작은 라벨 (value 01 등) */
export const Eyebrow = ({ children }: { children: ReactNode }) => (
    <p className="text-[11px] tracking-wide text-zinc-500">{children}</p>
);
