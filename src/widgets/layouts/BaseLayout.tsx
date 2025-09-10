import { ReactNode } from "react";
import { BaseHeader } from "@widgets/header";
import Footer from "@widgets/footer";

interface BaseLayoutProps {
    children: ReactNode;
    onChangeKeyword?: (keyword: string) => void;
}

export const BaseLayout = ({ children, onChangeKeyword }: BaseLayoutProps) => {
    return (
        <div className="flex h-full min-h-[100vh] w-full flex-col">
            <BaseHeader onChangeKeyword={onChangeKeyword} />
            <div className="xs:p-0 mt-[60px] flex  w-full pb-[60px]">
                <main className="flex-1  max-w-[1000px] mx-auto">
                    {children}
                </main>
            </div>
            {/* <Footer /> */}
        </div>
    );
};
