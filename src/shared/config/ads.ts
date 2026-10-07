/** Google AdSense 퍼블리셔 ID — ads.txt 의 pub-ID 와 같은 값이어야 한다 */
export const ADSENSE_CLIENT = "ca-pub-9259748218576901";

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

/** AdSense 콘솔에서 만든 광고 단위의 data-ad-slot 값 */
export const AD_SLOTS = {
    /** display-ads — 반응형 디스플레이 광고 */
    display: "2550722190",
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;

/**
 * 로컬·개발 빌드에서 실제 광고를 요청하면 무효 트래픽으로 잡힐 수 있어
 * production 빌드(next build)에서만 광고를 띄운다.
 * (CONFIG.isProd 는 VERCEL_ENV 기준이라 GitHub Pages 배포에서는 항상 false)
 */
export const ADS_ENABLED = process.env.NODE_ENV === "production";
