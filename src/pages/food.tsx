import { useState } from "react";
import { NextPage } from "next";
import { BaseLayout } from "@widgets/layouts";
import {
    UtensilsCrossed,
    TrendingUp,
    TrendingDown,
    ChefHat,
    Store,
    ShoppingBasket,
    Clock,
    Flame,
    Star,
} from "lucide-react";
import cn from "@shared/lib/cn";
import {
    mockTodayMeals,
    mockWeeklyCalories,
    mockRecipes,
    mockIngredientPrices,
    mockDeliveryTrends,
    mockFoodNews,
    mockRestaurantStats,
    mockMenuRanking,
    mockPlatformReviews,
    mockCostRatios,
} from "@shared/data/mock-food";

const TABS = [
    { id: "lifestyle", label: "식생활 관리", icon: UtensilsCrossed },
    { id: "trend", label: "외식 산업 트렌드", icon: Store },
    { id: "operation", label: "식당 운영 지표", icon: ChefHat },
] as const;

type TabId = (typeof TABS)[number]["id"];

const totalCalories = mockTodayMeals.reduce((acc, m) => acc + m.calories, 0);
const targetCalories = 2000;

function LifestyleTab() {
    const maxCal = Math.max(...mockWeeklyCalories.map((d) => d.calories));

    return (
        <div className="space-y-5">
            {/* Today meals */}
            <div className="grid gap-4 sm:grid-cols-3">
                {mockTodayMeals.map((meal) => (
                    <div
                        key={meal.type}
                        className="bg-white rounded-xl border border-zinc-200 p-4"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-zinc-800">{meal.type}</span>
                            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                                <Clock size={11} />
                                {meal.time}
                            </span>
                        </div>
                        <ul className="space-y-1 mb-3">
                            {meal.menu.map((item) => (
                                <li key={item} className="text-xs text-zinc-600">
                                    · {item}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-3 border-t border-zinc-100">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                                    <Flame size={11} className="text-orange-400" />
                                    칼로리
                                </span>
                                <span className="text-[11px] font-semibold text-zinc-700">
                                    {meal.calories} / {meal.target}kcal
                                </span>
                            </div>
                            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#ff7337] rounded-full"
                                    style={{ width: `${Math.min((meal.calories / meal.target) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Daily total */}
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-zinc-800">오늘 총 섭취</h3>
                    <span className="text-xs font-semibold text-[#ff7337]">
                        {totalCalories} / {targetCalories}kcal
                    </span>
                </div>
                <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#ff7337] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
                    />
                </div>
                <p className="text-[11px] text-zinc-400 mt-2">
                    목표까지 {Math.max(targetCalories - totalCalories, 0)}kcal 남음
                </p>
            </div>

            {/* Weekly calorie chart */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-800 mb-4">이번 주 칼로리</h3>
                <div className="flex items-end gap-2 h-28">
                    {mockWeeklyCalories.map((d) => {
                        const height = Math.round((d.calories / maxCal) * 100);
                        const overTarget = d.calories > d.target;
                        return (
                            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full flex items-end justify-center" style={{ height: "88px" }}>
                                    <div
                                        className={cn(
                                            "w-full rounded-t-md transition-all duration-300",
                                            overTarget ? "bg-red-400" : "bg-[#ff7337]",
                                        )}
                                        style={{ height: `${height}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-zinc-400">{d.day}</span>
                            </div>
                        );
                    })}
                </div>
                <p className="text-[11px] text-zinc-400 mt-2">
                    <span className="inline-block w-2 h-2 rounded-sm bg-red-400 mr-1" />
                    목표 초과일
                </p>
            </div>

            {/* Recipes */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-800 mb-4">저장된 레시피</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                    {mockRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 hover:border-zinc-200 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                <UtensilsCrossed size={16} className="text-[#ff7337]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-zinc-800 truncate">{recipe.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-zinc-400 flex items-center gap-0.5">
                                        <Clock size={9} />
                                        {recipe.time}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 flex items-center gap-0.5">
                                        <Flame size={9} className="text-orange-400" />
                                        {recipe.calories}kcal
                                    </span>
                                </div>
                                <div className="flex gap-1 mt-1 flex-wrap">
                                    {recipe.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[9px] bg-orange-50 text-[#ff7337] px-1.5 py-0.5 rounded font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TrendTab() {
    return (
        <div className="space-y-5">
            {/* Ingredient prices */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-800">식재료 가격 지수</h3>
                    <span className="text-[11px] text-zinc-400">전주 대비</span>
                </div>
                <div className="space-y-2.5">
                    {mockIngredientPrices.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingBasket size={13} className="text-zinc-400 shrink-0" />
                                <span className="text-xs text-zinc-700 font-medium">{item.name}</span>
                                <span className="text-[11px] text-zinc-400">{item.unit}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-zinc-800">
                                    {item.price.toLocaleString()}원
                                </span>
                                <span
                                    className={cn(
                                        "text-[11px] font-medium flex items-center gap-0.5 w-14 justify-end",
                                        item.trend === "up" ? "text-red-500" : "text-blue-500",
                                    )}
                                >
                                    {item.trend === "up" ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                                    {item.trend === "up" ? "+" : ""}{item.change}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delivery trends */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-800 mb-4">배달 플랫폼 인기 메뉴</h3>
                <div className="space-y-2">
                    {mockDeliveryTrends.map((item) => (
                        <div key={item.rank} className="flex items-center gap-3">
                            <span
                                className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                                    item.rank <= 3
                                        ? "bg-[#ff7337] text-white"
                                        : "bg-zinc-100 text-zinc-500",
                                )}
                            >
                                {item.rank}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-800">{item.menu}</span>
                                    <span
                                        className={cn(
                                            "text-[11px] font-medium flex items-center gap-0.5",
                                            item.change >= 0 ? "text-red-500" : "text-blue-500",
                                        )}
                                    >
                                        {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                        {item.change >= 0 ? "+" : ""}{item.change}%
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-zinc-400">{item.platform}</span>
                                    <span className="text-[10px] text-zinc-400">
                                        {item.orders.toLocaleString()}건
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Food news */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-800 mb-4">외식 산업 뉴스</h3>
                <div className="space-y-3">
                    {mockFoodNews.map((news) => (
                        <div key={news.id} className="flex gap-3 pb-3 border-b border-zinc-100 last:border-0 last:pb-0">
                            <span
                                className={cn(
                                    "text-[10px] font-semibold px-2 py-0.5 rounded h-fit shrink-0 mt-0.5",
                                    news.category === "트렌드"
                                        ? "bg-orange-50 text-[#ff7337]"
                                        : news.category === "이슈"
                                        ? "bg-red-50 text-red-500"
                                        : "bg-blue-50 text-blue-500",
                                )}
                            >
                                {news.category}
                            </span>
                            <div>
                                <p className="text-xs font-medium text-zinc-800 leading-snug">{news.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-zinc-400">{news.source}</span>
                                    <span className="text-[10px] text-zinc-300">·</span>
                                    <span className="text-[10px] text-zinc-400">{news.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function OperationTab() {
    return (
        <div className="space-y-5">
            {/* Stats grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {mockRestaurantStats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl border border-zinc-200 p-4">
                        <p className="text-[11px] text-zinc-400 mb-1">{stat.label}</p>
                        <p className="text-base font-bold text-zinc-800">{stat.value}</p>
                        <p
                            className={cn(
                                "text-[11px] font-medium mt-1 flex items-center gap-0.5",
                                stat.change >= 0 ? "text-emerald-500" : "text-red-500",
                            )}
                        >
                            {stat.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                            {stat.change >= 0 ? "+" : ""}{stat.change}% 전일 대비
                        </p>
                    </div>
                ))}
            </div>

            {/* Menu ranking */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-800 mb-4">메뉴별 판매 현황</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-zinc-100">
                                <th className="text-left pb-2 font-semibold text-zinc-500 pr-4">순위</th>
                                <th className="text-left pb-2 font-semibold text-zinc-500 pr-4">메뉴</th>
                                <th className="text-right pb-2 font-semibold text-zinc-500 pr-4">판매수</th>
                                <th className="text-right pb-2 font-semibold text-zinc-500 pr-4">매출</th>
                                <th className="text-right pb-2 font-semibold text-zinc-500">마진율</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockMenuRanking.map((row) => (
                                <tr key={row.rank} className="border-b border-zinc-50 last:border-0">
                                    <td className="py-2.5 pr-4">
                                        <span
                                            className={cn(
                                                "w-5 h-5 inline-flex items-center justify-center rounded-full text-[10px] font-bold",
                                                row.rank <= 3
                                                    ? "bg-[#ff7337] text-white"
                                                    : "bg-zinc-100 text-zinc-500",
                                            )}
                                        >
                                            {row.rank}
                                        </span>
                                    </td>
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">{row.name}</td>
                                    <td className="py-2.5 pr-4 text-right text-zinc-600">{row.sales}개</td>
                                    <td className="py-2.5 pr-4 text-right text-zinc-600">
                                        {row.revenue.toLocaleString()}원
                                    </td>
                                    <td className="py-2.5 text-right">
                                        <span className="text-emerald-600 font-semibold">{row.margin}%</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Platform reviews */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-800 mb-4">플랫폼별 리뷰 현황</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                    {mockPlatformReviews.map((p) => (
                        <div
                            key={p.platform}
                            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-zinc-50 border border-zinc-100"
                        >
                            <span className="text-xs font-bold text-zinc-700">{p.platform}</span>
                            <div className="flex items-center gap-1">
                                <Star size={14} className="text-amber-400 fill-amber-400" />
                                <span className="text-lg font-bold text-zinc-800">{p.score}</span>
                            </div>
                            <p className="text-[11px] text-zinc-400">{p.reviews.toLocaleString()}개 리뷰</p>
                            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-400 rounded-full"
                                    style={{ width: `${p.positive}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-zinc-400">긍정 {p.positive}%</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cost ratios */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-800 mb-4">비용 구조</h3>
                <div className="flex gap-1 h-8 rounded-lg overflow-hidden mb-4">
                    {mockCostRatios.map((item) => (
                        <div
                            key={item.label}
                            className="h-full transition-all duration-300"
                            style={{ width: `${item.ratio}%`, backgroundColor: item.color }}
                            title={`${item.label}: ${item.ratio}%`}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {mockCostRatios.map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                            <span
                                className="w-2.5 h-2.5 rounded-sm shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[11px] text-zinc-600">{item.label}</span>
                            <span className="text-[11px] font-semibold text-zinc-800 ml-auto">{item.ratio}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const FoodPage: NextPage = () => {
    const [activeTab, setActiveTab] = useState<TabId>("lifestyle");

    return (
        <BaseLayout>
            <div className="space-y-5">
                {/* Header */}
                <div>
                    <h2 className="text-lg font-bold text-zinc-800">요리</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">식생활 관리부터 외식 산업 트렌드까지</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-zinc-100 p-1 rounded-lg w-fit">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                    active
                                        ? "bg-white text-zinc-800 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-700",
                                )}
                            >
                                <Icon size={13} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab content */}
                {activeTab === "lifestyle" && <LifestyleTab />}
                {activeTab === "trend" && <TrendTab />}
                {activeTab === "operation" && <OperationTab />}
            </div>
        </BaseLayout>
    );
};

export default FoodPage;
