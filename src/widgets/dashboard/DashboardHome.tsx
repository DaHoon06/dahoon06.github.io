import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { notionQueryKeys } from "@entities/notion";
import type { PostType } from "@entities/notion";
import { TrendingUp, TrendingDown, ArrowUpRight, Users, Eye, PenLine, MessageSquare } from "lucide-react";
import {
    mockTodayStats,
    mockWeeklyActivity,
    mockVisitorTrend,
    mockEconomicIndicators,
} from "@shared/data/mock-dashboard";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";

// ── Sparkline (SVG 방문자 추이) ──────────────────────────────

const Sparkline = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const W = 200;
    const H = 56;
    const pad = 3;

    const pts = data.map((v, i) => {
        const x = ((i / (data.length - 1)) * (W - pad * 2) + pad).toFixed(1);
        const y = (H - pad - ((v - min) / range) * (H - pad * 2)).toFixed(1);
        return `${x},${y}`;
    });

    const last = data.at(-1) ?? 0;
    const prev = data.at(-2) ?? last;
    const changePercent = prev !== 0 ? (((last - prev) / prev) * 100).toFixed(1) : "0.0";
    const isUp = +changePercent >= 0;
    const lastPt = pts.at(-1)?.split(",") ?? ["0", "0"];

    return (
        <div className="bg-white rounded-xl p-5 border border-zinc-200">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-xs font-medium text-zinc-500">방문자 추이</p>
                    <p className="text-xs text-zinc-400 mt-0.5">최근 14일</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-zinc-800">{last.toLocaleString()}</p>
                    <p className={cn("text-xs font-semibold flex items-center justify-end gap-0.5 mt-0.5", isUp ? "text-emerald-500" : "text-red-500")}>
                        {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {isUp ? "+" : ""}{changePercent}%
                    </p>
                </div>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff7337" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#ff7337" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon fill="url(#visGrad)" points={[`${pad},${H}`, ...pts, `${W - pad},${H}`].join(" ")} />
                <polyline
                    fill="none"
                    stroke="#ff7337"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={pts.join(" ")}
                />
                <circle cx={lastPt[0]} cy={lastPt[1]} r="3" fill="#ff7337" />
            </svg>
        </div>
    );
};

// ── 주간 작성 현황 바 차트 ───────────────────────────────────

const WeeklyBarChart = () => {
    const max = Math.max(...mockWeeklyActivity.map((d) => d.count), 1);
    const todayIndex = (new Date().getDay() + 6) % 7; // 월=0 … 일=6

    return (
        <div className="bg-white rounded-xl p-5 border border-zinc-200">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs font-medium text-zinc-500">이번 주 작성 현황</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        총 {mockWeeklyActivity.reduce((a, d) => a + d.count, 0)}개 작성
                    </p>
                </div>
                <span className="text-xs bg-[#ff7337]/10 text-[#ff7337] px-2 py-0.5 rounded-full font-medium">
                    이번 주
                </span>
            </div>

            <div className="flex items-end justify-between gap-1.5 h-[88px]">
                {mockWeeklyActivity.map((d, i) => {
                    const isToday = i === todayIndex;
                    const barH = max > 0 ? Math.max((d.count / max) * 72, d.count > 0 ? 4 : 0) : 0;
                    return (
                        <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                            <div className="relative w-full flex items-end" style={{ height: "72px" }}>
                                <div
                                    className={cn(
                                        "w-full rounded-t-md transition-all duration-300",
                                        isToday ? "bg-[#ff7337]" : d.count > 0 ? "bg-zinc-300" : "bg-zinc-100",
                                    )}
                                    style={{ height: `${barH}px` }}
                                />
                                {d.count > 0 && (
                                    <span className="absolute w-full text-center -top-5 text-[10px] font-bold text-zinc-500">
                                        {d.count}
                                    </span>
                                )}
                            </div>
                            <span className={cn("text-[10px] font-medium", isToday ? "text-[#ff7337]" : "text-zinc-400")}>
                                {d.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ── 오늘 통계 카드 ───────────────────────────────────────────

interface StatMeta {
    label: string;
    value: string | number;
    sub: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard = ({ label, value, sub, icon, color }: StatMeta) => (
    <div className="bg-white rounded-xl p-4 border border-zinc-200">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", color)}>
            {icon}
        </div>
        <p className="text-xl font-bold text-zinc-800">{value.toLocaleString()}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
        <p className="text-[11px] text-zinc-400 mt-1">{sub}</p>
    </div>
);

// ── 경제 지표 ────────────────────────────────────────────────

const EconomicGrid = () => (
    <div className="bg-white rounded-xl border border-zinc-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
            <p className="text-sm font-semibold text-zinc-700">경제 지표</p>
            <Link href={ROUTES.STOCKS} className="text-xs text-[#ff7337] flex items-center gap-0.5 hover:underline">
                자세히 <ArrowUpRight size={11} />
            </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-zinc-100">
            {mockEconomicIndicators.map((item) => (
                <div key={item.name} className="px-4 py-3">
                    <p className="text-[11px] text-zinc-400">{item.name}</p>
                    <p className="text-sm font-bold text-zinc-800 mt-0.5">{item.value}</p>
                    <p className={cn("text-[11px] font-semibold flex items-center gap-0.5 mt-0.5", item.trend === "up" ? "text-red-500" : "text-blue-500")}>
                        {item.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {item.change}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

// ── 최근 포스트 ──────────────────────────────────────────────

const RecentPosts = ({ posts }: { posts: PostType[] }) => {
    if (posts.length === 0) return null;

    return (
        <div className="bg-white rounded-xl border border-zinc-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <p className="text-sm font-semibold text-zinc-700">최근 포스트</p>
                <Link href={ROUTES.POSTS} className="text-xs text-[#ff7337] flex items-center gap-0.5 hover:underline">
                    모두 보기 <ArrowUpRight size={11} />
                </Link>
            </div>
            <div className="divide-y divide-zinc-50">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={ROUTES.POST(post.slug)}
                        className="flex items-start gap-4 px-5 py-4 hover:bg-zinc-50 transition-colors group"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                {post.tags?.[0] && (
                                    <span className="text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded font-medium">
                                        {post.tags[0]}
                                    </span>
                                )}
                                <span className="text-[10px] text-zinc-400">
                                    {post.date?.start_date ?? post.createdTime?.slice(0, 10)}
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-zinc-800 group-hover:text-[#ff7337] transition-colors truncate">
                                {post.title}
                            </p>
                            {post.summary && (
                                <p className="text-xs text-zinc-400 mt-0.5 truncate">{post.summary}</p>
                            )}
                        </div>
                        <ArrowUpRight size={14} className="shrink-0 text-zinc-300 group-hover:text-[#ff7337] transition-colors mt-0.5" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

// ── DashboardHome ────────────────────────────────────────────

export const DashboardHome = () => {
    const { data: posts } = useQuery<PostType[]>({
        queryKey: notionQueryKeys.posts(),
        enabled: false,
    });

    const now = new Date();
    const dateStr = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    });

    const recentPosts = posts?.slice(0, 5) ?? [];

    const statsMeta: StatMeta[] = [
        {
            label: "오늘 방문자",
            value: mockTodayStats.visitors,
            sub: "어제보다 +12%",
            icon: <Users size={16} className="text-blue-600" />,
            color: "bg-blue-50",
        },
        {
            label: "페이지뷰",
            value: mockTodayStats.pageViews,
            sub: "어제보다 +8%",
            icon: <Eye size={16} className="text-violet-600" />,
            color: "bg-violet-50",
        },
        {
            label: "이번 주 글",
            value: mockTodayStats.weeklyPosts,
            sub: "목표 5개 중",
            icon: <PenLine size={16} className="text-[#ff7337]" />,
            color: "bg-orange-50",
        },
        {
            label: "댓글",
            value: mockTodayStats.comments,
            sub: "새 댓글 +3",
            icon: <MessageSquare size={16} className="text-emerald-600" />,
            color: "bg-emerald-50",
        },
    ];

    return (
        <div className="space-y-5">
            {/* Greeting */}
            <div>
                <p className="text-xs text-zinc-400">{dateStr}</p>
                <h2 className="text-xl font-bold text-zinc-800 mt-1">안녕하세요, Dahoon06 👋</h2>
                <p className="text-sm text-zinc-500 mt-0.5">오늘도 기록을 남겨보세요.</p>
            </div>

            {/* Today stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {statsMeta.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WeeklyBarChart />
                <Sparkline data={mockVisitorTrend} />
            </div>

            {/* Economic indicators */}
            <EconomicGrid />

            {/* Recent posts */}
            <RecentPosts posts={recentPosts} />
        </div>
    );
};
