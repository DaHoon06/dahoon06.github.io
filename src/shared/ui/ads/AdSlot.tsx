import { ReactElement, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import cn from "@shared/lib/cn";
import {
    ADS_ENABLED,
    ADSENSE_CLIENT,
    AD_SLOTS,
    type AdSlotKey,
} from "@shared/config/ads";

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export interface AdSlotProps {
    /** AD_SLOTS 에 등록된 광고 단위 키 */
    slot: AdSlotKey;
    format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
    fullWidthResponsive?: boolean;
    /** 광고가 로드되기 전 레이아웃이 밀리지 않도록 잡아 두는 높이(px) */
    minHeight?: number;
    className?: string;
}

/**
 * AdSense 광고 단위 하나를 그린다.
 * adsbygoogle.js 는 _document 에서 한 번만 로드하고, 여기서는 <ins> 를 채우는 push 만 한다.
 */
export const AdSlot = ({
    slot,
    format = "auto",
    fullWidthResponsive = true,
    minHeight = 100,
    className,
}: AdSlotProps): ReactElement | null => {
    const { asPath } = useRouter();

    if (!ADS_ENABLED) return null;

    return (
        <aside
            aria-label="광고"
            // 채울 광고가 없으면 AdSense 가 <ins> 에 data-ad-status="unfilled" 를 붙인다 — 빈 자리를 접는다
            className={cn(
                "w-full overflow-hidden has-[ins[data-ad-status=unfilled]]:hidden",
                className,
            )}
            style={{ minHeight }}
        >
            {/* 클라이언트 라우팅으로 페이지가 바뀌면 <ins> 를 새로 만들어 광고를 다시 요청한다 */}
            <AdUnit
                key={asPath}
                slot={AD_SLOTS[slot]}
                format={format}
                fullWidthResponsive={fullWidthResponsive}
            />
        </aside>
    );
};

interface AdUnitProps {
    slot: string;
    format: string;
    fullWidthResponsive: boolean;
}

const AdUnit = ({
    slot,
    format,
    fullWidthResponsive,
}: AdUnitProps): ReactElement => {
    const insRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        // StrictMode 이중 실행 등으로 이미 채워진 <ins> 에 다시 push 하면 에러가 난다
        if (insRef.current?.getAttribute("data-adsbygoogle-status")) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
            // 광고 차단기 등으로 실패해도 페이지는 그대로 둔다
        }
    }, []);

    return (
        <ins
            ref={insRef}
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={String(fullWidthResponsive)}
        />
    );
};
