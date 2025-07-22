import { useMatchMedia, useRouteLoading } from "@shared/hooks";
import React, { ReactNode, useEffect, useState } from "react";
import { Header } from "./header";
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
                func={() => {
                    setIsVisible(!isVisible);
                }}
            />
            <main className={styles.main}>{children}</main>
        </>
    );
};
