import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { NewsArchiveSummary } from "@entities/news";
import { NewsArchiveCalendar } from "./NewsArchiveCalendar";

interface NewsCalendarSheetProps {
    open: boolean;
    onClose: () => void;
    summaries: NewsArchiveSummary[];
    /** 현재 보고 있는 날짜 */
    currentDate?: string;
}

/**
 * 모바일 전용 달력 바텀시트.
 *
 * 가로 칩(`NewsArchiveStrip`)은 최근 날짜만 깔아 둬서 한 달 넘은 날로 가려면 한참 밀어야
 * 했다. PC aside 와 같은 달력을 시트로 띄워 아무 날짜나 바로 고르게 한다.
 * 하단 탭바(z-40) 위에 덮여야 해서 body 로 포털한다.
 */
export const NewsCalendarSheet = ({
    open,
    onClose,
    summaries,
    currentDate,
}: NewsCalendarSheetProps): ReactElement | null => {
    // 포털 대상(document)은 SSR/정적 export 단계엔 없다
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // 열려 있는 동안 배경 스크롤을 막고 Esc 로 닫는다
    useEffect(() => {
        if (!open) return;

        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <motion.div
                        aria-hidden
                        className="absolute inset-0 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="날짜 선택"
                        className="absolute inset-x-0 bottom-0 mx-auto max-w-md rounded-t-2xl bg-white px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,_0px))] shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "tween",
                            duration: 0.25,
                            ease: "easeOut",
                        }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.6 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 80 || info.velocity.y > 500)
                                onClose();
                        }}
                    >
                        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-zinc-200" />
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">
                                날짜로 보기
                            </h2>
                            <button
                                type="button"
                                aria-label="닫기"
                                onClick={onClose}
                                className="-mr-1.5 flex size-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                            >
                                <X aria-hidden className="size-4" />
                            </button>
                        </div>
                        <NewsArchiveCalendar
                            summaries={summaries}
                            currentDate={currentDate}
                            onSelect={onClose}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
