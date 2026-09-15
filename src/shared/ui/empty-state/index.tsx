import { ReactElement, ReactNode } from "react";
import cn from "@shared/lib/cn";

interface EmptyStateProps {
    /** 카오모지 얼굴 */
    face?: string;
    title: string;
    description?: string;
    /** 버튼 등 보조 액션 */
    children?: ReactNode;
    className?: string;
}

export const EmptyState = ({
    face = "( ˃ ᴗ ˂ )",
    title,
    description,
    children,
    className,
}: EmptyStateProps): ReactElement => {
    return (
        <div
            className={cn(
                "mt-6 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-gradient-to-b from-zinc-50 to-white px-6 py-14 text-center",
                className,
            )}
        >
            {/* 말풍선 얼굴 */}
            <div className="relative animate-[float_3.2s_ease-in-out_infinite]">
                <div className="rounded-[28px] border border-zinc-200 bg-white px-6 py-4 text-xl font-medium tracking-tight text-zinc-700 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.25)]">
                    {face}
                </div>
                {/* 말풍선 꼬리 */}
                <div className="absolute -bottom-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-r border-b border-zinc-200 bg-white" />
            </div>

            <p className="mt-7 text-base font-bold tracking-tight text-zinc-800">
                {title}
            </p>
            {description && (
                <p className="mt-1.5 text-sm text-zinc-400">{description}</p>
            )}

            {children && <div className="mt-5">{children}</div>}
        </div>
    );
};
