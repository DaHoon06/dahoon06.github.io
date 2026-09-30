import { useCallback } from "react";
import { useRouter } from "next/router";
import { useReducedMotion } from "framer-motion";
import { COVER_MS } from "./constants";
import {
    type PageTurnDirection,
    type PageTurnLabel,
    usePageTurnStore,
} from "./usePageTurnStore";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const nextFrame = () => new Promise((r) => requestAnimationFrame(r));

/** 이동 직후 스크롤 위치 — 해시가 있으면 그 섹션, 없으면 맨 위 */
const scrollAfterRoute = (href: string) => {
    const hash = href.split("#")[1];
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
};

interface TurnOptions {
    direction?: PageTurnDirection;
    label: PageTurnLabel;
}

/**
 * 종이 넘김 효과와 함께 페이지를 이동한다.
 * 종이가 화면을 완전히 덮은 뒤 라우팅하므로, 새 페이지는 종이 뒤에서 렌더된다.
 * 모션 줄이기 설정이면 효과 없이 바로 이동한다.
 */
export const usePageTurn = () => {
    const router = useRouter();
    const reduceMotion = useReducedMotion();

    return useCallback(
        async (href: string, { direction = "forward", label }: TurnOptions) => {
            const { phase, start, setPhase, reset } =
                usePageTurnStore.getState();
            if (phase !== "idle") return;

            if (reduceMotion) {
                await router.push(href);
                return;
            }

            start(direction, label);
            await wait(COVER_MS[direction]);

            try {
                await router.push(href, undefined, { scroll: false });
            } catch {
                reset();
                return;
            }

            scrollAfterRoute(href);
            // 새 페이지가 실제로 페인트된 뒤에 넘기기 시작한다
            await nextFrame();
            await nextFrame();
            setPhase("turn");
        },
        [router, reduceMotion]
    );
};
