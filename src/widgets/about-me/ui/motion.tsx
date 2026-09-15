import {
    ReactNode,
    MouseEvent as ReactMouseEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";
import cn from "@shared/lib/cn";

/** 포트폴리오 공통 이징 — 빠르게 치고 부드럽게 감속 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** 포트폴리오 악센트 컬러 (블로그 브랜드 연보라와 동일 계열) */
export const ACCENT = "#c9cbf8";

interface RevealProps {
    children: ReactNode;
    className?: string;
    /** 등장 지연 (초) */
    delay?: number;
    /** 시작 y 오프셋 (px) */
    y?: number;
    once?: boolean;
}

/** 뷰포트 진입 시 아래에서 떠오르는 공용 리빌 래퍼 */
export const Reveal = ({
    children,
    className,
    delay = 0,
    y = 48,
    once = true,
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, margin: "-12% 0px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{ duration: 0.9, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
};

interface MagneticProps {
    children: ReactNode;
    className?: string;
    /** 커서를 따라가는 강도 (0~1) */
    strength?: number;
}

/** 커서를 자석처럼 따라오는 호버 래퍼 (터치 기기에선 이벤트가 없어 자연히 비활성) */
export const Magnetic = ({
    children,
    className,
    strength = 0.35,
}: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.2 });
    const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.2 });

    const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x: sx, y: sy }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            {children}
        </motion.div>
    );
};

const FillWord = ({
    children,
    progress,
    range,
}: {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const opacity = useTransform(progress, range, [0.14, 1]);
    return (
        <motion.span style={{ opacity }} className="inline-block">
            {children}
        </motion.span>
    );
};

interface ScrollFillTextProps {
    text: string;
    className?: string;
}

/** 스크롤 진행에 따라 단어가 하나씩 밝아지는 스테이트먼트 텍스트 */
export const ScrollFillText = ({ text, className }: ScrollFillTextProps) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.85", "end 0.45"],
    });
    const words = text.split(" ");

    return (
        <p ref={ref} className={cn("flex flex-wrap gap-x-[0.3em]", className)}>
            {words.map((word, i) => (
                <FillWord
                    key={`${word}-${i}`}
                    progress={scrollYProgress}
                    range={[i / words.length, (i + 1) / words.length]}
                >
                    {word}
                </FillWord>
            ))}
        </p>
    );
};

interface CountUpProps {
    value: number;
    suffix?: string;
    className?: string;
}

/** 뷰포트 진입 시 0부터 목표값까지 세는 카운터 */
export const CountUp = ({ value, suffix = "", className }: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration: 1.6,
            ease: EASE_OUT,
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value]);

    return (
        <span ref={ref} className={className}>
            {display}
            {suffix}
        </span>
    );
};

interface SectionHeadingProps {
    index: string;
    title: string;
    sub?: string;
}

/** 섹션 공통 헤딩 — (번호) + 대형 타이틀 */
export const SectionHeading = ({ index, title, sub }: SectionHeadingProps) => (
    <Reveal className="mb-14 md:mb-20">
        <div className="flex items-baseline gap-3 md:gap-5">
            <span className="text-sm md:text-base font-semibold tracking-widest text-[#c9cbf8]">
                ({index})
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
                {title}
            </h2>
        </div>
        {sub && (
            <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-zinc-500">
                {sub}
            </p>
        )}
    </Reveal>
);
