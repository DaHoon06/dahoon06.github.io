import { ReactElement } from "react";
import { AdSlot } from "./AdSlot";

interface DisplayAdProps {
    className?: string;
}

/** 본문 하단 등에 넣는 반응형 디스플레이 광고 (display-ads 단위) */
export const DisplayAd = ({ className }: DisplayAdProps): ReactElement => (
    <AdSlot slot="display" className={className} />
);
