import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

/** 포트폴리오 공통 이징 — 빠르게 치고 부드럽게 감속 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
    children: ReactNode;
    className?: string;
    /** 등장 지연 (초) */
    delay?: number;
    /** 시작 y 오프셋 (px) */
    y?: number;
}

/** 뷰포트 진입 시 아래에서 살짝 떠오르는 공용 리빌 래퍼 */
export const Reveal = ({
    children,
    className,
    delay = 0,
    y = 24,
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{ duration: 0.8, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
};
