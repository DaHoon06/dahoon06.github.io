import { create } from "zustand";

/**
 * 종이 넘김 전환 단계.
 * - cover: 이전 페이지 위로 종이가 덮인다 (이 동안 라우팅한다)
 * - turn: 새 페이지가 렌더된 뒤 종이가 넘어가며 새 페이지를 드러낸다
 */
export type PageTurnPhase = "idle" | "cover" | "turn";

/** forward: 다음 장으로 넘김, backward: 이전 장으로 되돌림 */
export type PageTurnDirection = "forward" | "backward";

export interface PageTurnLabel {
    /** 종이 상단 작은 라벨 (회사·번호 등) */
    eyebrow?: string;
    title: string;
}

interface PageTurnState {
    phase: PageTurnPhase;
    direction: PageTurnDirection;
    label: PageTurnLabel | null;
    start: (direction: PageTurnDirection, label: PageTurnLabel) => void;
    setPhase: (phase: PageTurnPhase) => void;
    reset: () => void;
}

export const usePageTurnStore = create<PageTurnState>((set) => ({
    phase: "idle",
    direction: "forward",
    label: null,
    start: (direction, label) => set({ phase: "cover", direction, label }),
    setPhase: (phase) => set({ phase }),
    reset: () => set({ phase: "idle", label: null }),
}));
