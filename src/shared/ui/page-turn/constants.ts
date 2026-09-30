import type { PageTurnDirection } from "./usePageTurnStore";

/** 종이를 넘길 때의 이징 — 들어 올릴 때 천천히, 중간에 빠르게, 내려놓을 때 다시 천천히 */
export const PAGE_EASE = [0.645, 0.045, 0.355, 1] as const;

/** 모서리를 든 뒤 넘기는 구간의 이징 — 완만한 in-out 이라 넘어가는 모습이 오래 보인다 */
export const TURN_EASE = [0.45, 0, 0.55, 1] as const;

/** 종이가 넘어가는 시간 (초) — 앞 30%는 모서리를 드는 구간 */
export const TURN_DURATION = 1.2;

/** 넘김이 끝나는 각도 — -90° 를 살짝 넘기면 종이가 화면 밖으로 완전히 빠진다 */
export const TURNED_ANGLE = -95;

/**
 * 종이가 화면을 덮는 시간 (ms).
 * forward는 현재 페이지가 종이로 바뀌는 짧은 페이드,
 * backward는 왼쪽 화면 밖에서 종이가 넘어와 덮는 회전이라 더 길다.
 */
export const COVER_MS: Record<PageTurnDirection, number> = {
    forward: 320,
    backward: 800,
};
