import dynamic from "next/dynamic";
import { ComponentType } from "react";

import type {
    ModalDefinition,
    ModalName as SharedModalName,
    ModalProps as SharedModalProps,
} from "@shared/types/modal.types";
import type { AlertProps } from "@shared/ui/modal";
import type { SignInModalProps } from "@features/auth/sign-in/ui/SignInModal";

function registryModal<Props = Record<string, unknown>>(
    importFunction: () => Promise<{ default: ComponentType<Props> }>,
    options: {
        props?: Props;
        hasOverlay?: boolean;
        ssr?: boolean;
    } = {}
): ModalDefinition<Props> {
    return {
        component: dynamic(importFunction, { ssr: options.ssr ?? false }),
        props: options.props,
        hasOverlay: options.hasOverlay ?? true,
    };
}

export type ModalName = SharedModalName;
export type ModalProps = SharedModalProps;

type ModalDefinitions = {
    [Key in ModalName]: ModalDefinition<ModalProps[Key]>;
};

export const MODALS = {
    signIn: registryModal<SignInModalProps>(
        () =>
            import("@features/auth/sign-in/ui/SignInModal").then((module) => ({
                default: module.default,
            })),
        {
            hasOverlay: true,
        }
    ),
    alert: registryModal<AlertProps>(
        () =>
            import("@shared/ui/modal").then((module) => ({
                default: module.Alert,
            })),
        {
            hasOverlay: true,
        }
    ),
} satisfies ModalDefinitions;
