import { useModal } from "@shared/hooks/useModal";
import { motion, AnimatePresence } from "framer-motion";

type AlertButton = {
    label: string;
    onClick: () => void;
};

export type AlertProps = {
    title?: string;
    message: string;
    onConfirm?: () => void;
    cancel?: boolean;
    extraButtons?: AlertButton[];
};

const Alert = ({
    title,
    message,
    onConfirm,
    cancel,
    extraButtons,
}: AlertProps) => {
    const { close } = useModal();

    const hasTitle = !!title;

    const handleClickConfirm = () => {
        onConfirm?.();
        close("alert");
    };

    const handleClickClose = () => {
        close("alert");
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-background border-grayscale-100 flex w-[280px] flex-col gap-4 rounded-[16px] border p-5 shadow-[0_0_32px_0_rgba(137,136,136,0.15)]"
            >
                {hasTitle && (
                    <div className="text-grayscale-900 text-body-1">
                        {title}
                    </div>
                )}
                <div className="text-grayscale-900 text-body-2 h-auto min-h-[48px] whitespace-pre-line">
                    {message}
                </div>
                <div className="flex justify-end gap-5">
                    {cancel && (
                        <button
                            type="button"
                            onClick={handleClickClose}
                            className="text-grayscale-300 text-body-2"
                        >
                            닫기
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleClickConfirm}
                        className="text-grayscale-900 text-body-2"
                    >
                        확인
                    </button>

                    {extraButtons?.map((button, index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={button.onClick}
                            >
                                {button.label}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Alert;
