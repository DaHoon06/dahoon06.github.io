"use client";

import { useModalStore } from "@shared/stores/useModalStore";

export const useModal = () => {
    const open = useModalStore((state) => state.open);
    const close = useModalStore((state) => state.close);
    const closeAll = useModalStore((state) => state.closeAll);

    return {
        open,
        close,
        closeAll,
    };
};
