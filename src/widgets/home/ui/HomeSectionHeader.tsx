import { ReactElement } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HomeSectionHeaderProps {
    title: string;
    description?: string;
    /** "전체 보기" 링크 대상 (없으면 링크를 숨긴다) */
    href?: string;
    linkLabel?: string;
}

/** 홈 허브 섹션 공통 헤더 — ArchivingShowcase 헤더와 같은 톤을 맞춘다 */
export const HomeSectionHeader = ({
    title,
    description,
    href,
    linkLabel = "전체 보기",
}: HomeSectionHeaderProps): ReactElement => (
    <div className="mb-5 flex items-end justify-between gap-4">
        <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-900">
                {title}
            </h2>
            {description && (
                <p className="mt-1 text-sm text-zinc-500">{description}</p>
            )}
        </div>
        {href && (
            <Link
                href={href}
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
                {linkLabel}
                <ArrowRight size={13} />
            </Link>
        )}
    </div>
);
