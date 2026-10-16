import { ReactElement, useEffect, useRef } from "react";

/**
 * 화면 맨 위 3px 읽기 진행 바.
 * 스크롤마다 리렌더하지 않도록 상태 대신 ref로 transform만 바꾼다.
 */
export const ReadingProgress = (): ReactElement => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const { scrollHeight, clientHeight } = document.documentElement;
            const max = scrollHeight - clientHeight;
            const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${ratio})`;
            }
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
        >
            <div
                ref={barRef}
                className="h-full w-full origin-left bg-[linear-gradient(72deg,#291e95,#00a3cc)] transition-transform duration-75 ease-linear"
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    );
};
