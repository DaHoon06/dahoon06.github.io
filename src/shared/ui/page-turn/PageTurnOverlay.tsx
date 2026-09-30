import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
    COVER_MS,
    PAGE_EASE,
    TURN_DURATION,
    TURN_EASE,
    TURNED_ANGLE,
} from "./constants";
import { usePageTurnStore } from "./usePageTurnStore";

/** 종이 질감 — 옅은 괘선 + 왼쪽 여백선 */
const PAPER_TEXTURE =
    "repeating-linear-gradient(to bottom, transparent 0 31px, rgba(0,0,0,0.05) 31px 32px), linear-gradient(to right, transparent 0 63px, rgba(201,203,248,0.9) 63px 65px, transparent 65px)";

/**
 * 화면 전체를 덮는 종이 한 장.
 * 왼쪽 가장자리를 책등(spine)으로 삼아 rotateY 를 음수로 돌려 넘긴다.
 * (음수 방향이라 오른쪽 끝이 보는 사람 쪽으로 들리며 넘어간다)
 * 책등이 화면 끝이라 -90° 를 넘으면 종이가 화면 밖으로 나가므로, TURNED_ANGLE 까지만 돌린다.
 *
 * _app 에 한 번만 두고, usePageTurn / PageTurnLink 가 store 로 단계를 바꾼다.
 */
export const PageTurnOverlay = () => {
    const { phase, direction, label, reset } = usePageTurnStore();

    const rotateY = useMotionValue(0);
    const opacity = useMotionValue(0);

    // 종이가 들릴수록 앞면의 들린 쪽이 어두워진다
    const frontShade = useTransform(rotateY, [0, -90], [0, 0.4]);
    // 종이 아래 드러나는 페이지에 드리우는 그림자 — 종이가 넘어가거나 사라지면 함께 걷힌다
    const castShadow = useTransform(
        [rotateY, opacity],
        ([r = 0, o = 0]: number[]) =>
            0.55 * Math.max(0, 1 - r / TURNED_ANGLE) * o
    );

    useEffect(() => {
        if (phase === "cover") {
            if (direction === "forward") {
                // 현재 화면이 한 장의 종이로 바뀐다
                rotateY.set(0);
                opacity.set(0);
                animate(opacity, 1, {
                    duration: COVER_MS.forward / 1000,
                    ease: "easeOut",
                });
            } else {
                // 왼쪽으로 넘겨 둔 종이를 다시 되돌려 덮는다
                rotateY.set(TURNED_ANGLE);
                opacity.set(1);
                animate(rotateY, 0, {
                    duration: COVER_MS.backward / 1000,
                    ease: PAGE_EASE,
                });
            }
            return;
        }

        if (phase === "turn") {
            const controls =
                direction === "forward"
                    ? // 모서리를 살짝 들어 올렸다가(lift) 한 번에 넘긴다
                      animate(rotateY, [0, -14, TURNED_ANGLE], {
                          duration: TURN_DURATION,
                          times: [0, 0.3, 1],
                          ease: ["easeOut", TURN_EASE],
                      })
                    : animate(opacity, 0, { duration: 0.45, ease: "easeOut" });
            controls.then(reset);
            return () => controls.stop();
        }
    }, [phase, direction, rotateY, opacity, reset]);

    if (phase === "idle" || !label) return null;

    return (
        <div
            aria-hidden
            className="fixed inset-0 z-[100] overflow-hidden"
            style={{ perspective: 2400 }}
        >
            <motion.div
                className="absolute inset-0 bg-black"
                style={{ opacity: castShadow }}
            />

            <motion.div
                className="absolute inset-0"
                style={{
                    rotateY,
                    opacity,
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* 앞면 */}
                <div
                    className="absolute inset-0 overflow-hidden bg-[#f1efe9] shadow-[0_0_60px_rgba(0,0,0,0.45)]"
                    style={{
                        backfaceVisibility: "hidden",
                        backgroundImage: PAPER_TEXTURE,
                    }}
                >
                    <div className="flex h-full flex-col justify-between py-16 pr-8 pl-24 md:py-24 md:pr-20 md:pl-40">
                        <div>
                            {label.eyebrow && (
                                <p className="text-sm tracking-wide text-zinc-500">
                                    {label.eyebrow}
                                </p>
                            )}
                            <p className="mt-4 text-4xl font-bold leading-tight tracking-tight break-keep text-zinc-900 md:text-7xl">
                                {label.title}
                            </p>
                        </div>
                        <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">
                            Dahoon&apos;s Portfolio
                        </p>
                    </div>
                    {/* 오른쪽 가장자리가 들릴 때의 음영 */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent"
                        style={{ opacity: frontShade }}
                    />
                </div>
            </motion.div>
        </div>
    );
};
