import { ReactNode, MouseEvent, createElement } from "react";

import { MODALS } from "@apps/config/modal";
import type { ModalName, ModalProps } from "@apps/config/modal";
import { useEscapeKey } from "@shared/hooks/useEscapeKey";
import { useScrollLock } from "@shared/hooks/useScrollLock";
import { ModalItem, useModalStore } from "@shared/stores/useModalStore";
import type { ModalDefinition } from "@shared/types/modal.types";

interface ModalProviderProps {
    children: ReactNode;
}

const ModalOverlay = ({ onClose }: { onClose: () => void }) => {
    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="z-modal-backdrop fixed inset-0"
            style={{ backdropFilter: "brightness(0.5)" }}
            onClick={handleOverlayClick}
        />
    );
};

const getModalDefinition = <Name extends ModalName>(
    modalName: Name
): ModalDefinition<ModalProps[Name]> =>
    MODALS[modalName] as ModalDefinition<ModalProps[Name]>;

function DynamicModal<ModalNameType extends ModalName>({
    modal,
}: {
    modal: ModalItem<ModalNameType>;
}) {
    const { name, props } = modal;
    const { component: ModalComponent, hasOverlay = false } =
        getModalDefinition(name);
    const { close } = useModalStore();

    const handleOverlayClose = () => {
        close(name);
    };

    return (
        <>
            {hasOverlay && <ModalOverlay onClose={handleOverlayClose} />}
            <div className="z-modal pointer-events-none fixed inset-0 flex items-center justify-center p-5">
                <div
                    className="pointer-events-auto max-h-full max-w-full"
                    onClick={(event) => event.stopPropagation()} // 모달 내부 클릭 시 버블링 차단
                >
                    {createElement(ModalComponent, props)}
                </div>
            </div>
        </>
    );
}

const ModalRenderer = () => {
    const modalList = useModalStore((state) => state.modalList);
    const { close } = useModalStore();

    const hasModal = modalList.length > 0;

    useScrollLock(hasModal);
    useEscapeKey(() => {
        if (hasModal) {
            const latestModal = modalList[modalList.length - 1];
            close(latestModal?.name);
        }
    }, hasModal);

    return (
        <>
            {modalList.map((modalComponent, index) => (
                <DynamicModal
                    key={`${modalComponent.name}-${index}`}
                    modal={modalComponent}
                />
            ))}
        </>
    );
};

export function ModalProvider({ children }: ModalProviderProps) {
    return (
        <>
            {children}
            <ModalRenderer />
        </>
    );
}
