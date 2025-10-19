import { ReactNode } from "react";
import { BaseHeader } from "@widgets/header";
import Footer from "@widgets/footer";

interface AboutLayoutProps {
    children: ReactNode;
}

export const AboutLayout = ({ children }: AboutLayoutProps) => {
    return (
        <div className="flex h-full min-h-[100vh] w-full flex-col">
            <BaseHeader />
            <main className="xs:p-0 mt-[60px] flex flex-1 w-full pb-[60px]">
                {children}
            </main>
            <Footer />
        </div>
    );
};
