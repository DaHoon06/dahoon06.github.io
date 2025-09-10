import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// NProgress 설정
NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    easing: "ease",
    speed: 500,
    trickleSpeed: 200,
});

const RouteProgressBar = () => {
    const pathname = usePathname();

    useEffect(() => {
        const handleStart = () => NProgress.start();
        const handleComplete = () => NProgress.done();

        handleStart();

        // 라우팅이 완료되면 NProgress 종료
        handleComplete();

        // 컴포넌트가 언마운트될 때 클린업
        return () => {
            NProgress.done();
        };
    }, [pathname]);

    return null;
};

export default RouteProgressBar;
