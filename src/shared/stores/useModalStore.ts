import { create } from "zustand";

import { ModalName, ModalProps } from "../types/modal.types";

export type ModalItem<Name extends ModalName = ModalName> = {
    name: Name;
    props: ModalProps[Name];
};

interface ModalState {
    modalList: ModalItem[];

    open: <Component extends ModalName>(
        modalName: Component,
        props: ModalProps[Component]
    ) => void;
    close: (modalName?: ModalName) => void;
    closeAll: () => void;
}

export const useModalStore = create<ModalState>()((set, get) => ({
    modalList: [],

    open: (modalName, props) => {
        set((state) => ({
            modalList: [
                ...state.modalList,
                {
                    name: modalName,
                    props,
                },
            ],
        }));
    },

    close: (modalName) => {
        const { modalList } = get();
        if (modalList.length === 0) return;

        set({
            modalList: modalName
                ? modalList.filter((modal) => modal.name !== modalName)
                : modalList.slice(0, -1),
        });
    },

    closeAll: () => {
        const { modalList } = get();
        if (modalList.length > 0) {
            set({ modalList: [] });
        }
    },
}));
