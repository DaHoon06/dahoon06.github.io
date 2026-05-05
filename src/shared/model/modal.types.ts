import type { ComponentType } from "react";
import type { AlertProps } from "@shared/ui/modal";
import type { SignInModalProps } from "@features/auth/sign-in/ui/SignInModal";

export interface ModalRegistry {
    alert: AlertProps;
    signIn: SignInModalProps;
}

export type ModalName = Extract<keyof ModalRegistry, string>;

export type ModalProps = {
    [Key in ModalName]: ModalRegistry[Key];
};

export interface ModalDefinition<Props> {
    component: ComponentType<Props>;
    props?: Props;
    hasOverlay?: boolean;
}
