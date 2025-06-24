import { useMatchMedia, useRouteLoading } from "@shared/hooks";
import React, { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import styles from "./HomeLayout.module.scss";

interface HomeLayoutProps {
    children: ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
    const isMobile = useMatchMedia("(max-width: 768px)");
    const { isLoaded, loadingCount } = useRouteLoading();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        isVisible && setIsVisible(!isVisible);
    }, [isMobile]);

    return (
        <>
            <Header
                isMobile={isMobile}
                isVisible={isVisible}
                func={() => {
                    setIsVisible(!isVisible);
                }}
            />
            <main className={styles.main}>{children}</main>
        </>
    );
};
