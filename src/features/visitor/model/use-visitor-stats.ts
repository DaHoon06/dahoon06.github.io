import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@shared/config/api";

export interface VisitorStats {
    today: number;
    total: number;
}

const SITE = "blog";
const VISITED_KEY = `visit:${SITE}`;

/** 서버와 같은 기준(KST 자정)으로 "오늘"을 정한다 */
const todayKst = () =>
    new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);

const readVisited = (): string | null => {
    try {
        return localStorage.getItem(VISITED_KEY);
    } catch {
        return null;
    }
};

const writeVisited = (date: string) => {
    try {
        localStorage.setItem(VISITED_KEY, date);
    } catch {
        // 시크릿 모드 등 — 서버가 해시로 중복을 걸러 내므로 무시해도 된다
    }
};

/**
 * 오늘 처음 들어온 브라우저만 POST /visit 로 방문을 기록하고,
 * 이미 기록했으면 CDN 에 캐시되는 GET /visit/stats 로 숫자만 읽는다.
 * (서버도 IP·UA 해시로 하루 1회만 세므로 localStorage 는 호출 수를 줄이는 용도)
 */
const fetchVisitorStats = async (): Promise<VisitorStats> => {
    const today = todayKst();
    const alreadyVisited = readVisited() === today;

    const res = alreadyVisited
        ? await fetch(`${API_BASE_URL}/visit/stats?site=${SITE}`)
        : await fetch(`${API_BASE_URL}/visit`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ site: SITE }),
          });
    if (!res.ok) throw new Error(`visit ${res.status}`);

    if (!alreadyVisited) writeVisited(today);
    return res.json();
};

export const useVisitorStats = () =>
    useQuery({
        queryKey: ["visitor-stats", SITE],
        queryFn: fetchVisitorStats,
        staleTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
    });
