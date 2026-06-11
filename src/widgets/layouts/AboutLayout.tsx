import { ReactNode } from "react";
import { BaseLayout } from "./BaseLayout";

interface AboutLayoutProps {
    children: ReactNode;
}

export const AboutLayout = ({ children }: AboutLayoutProps) => {
    return <BaseLayout>{children}</BaseLayout>;
};
