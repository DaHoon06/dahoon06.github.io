import { NextPage } from "next";
import { BaseLayout } from "@widgets/layouts";
import { mockStocks, mockEconomicIndicators } from "@shared/data/mock-dashboard";
import { TrendingUp, TrendingDown } from "lucide-react";
import cn from "@shared/lib/cn";

const StocksPage: NextPage = () => {
    return (
        <BaseLayout>
            <div className="space-y-6 max-w-2xl">
                <div>
                    <h2 className="text-lg font-bold text-zinc-800">주식 &amp; 경제 지표</h2>
                    <p className="text-sm text-zinc-400 mt-0.5">관심 종목 및 실시간 경제 현황</p>
                </div>

                {/* 경제 지표 */}
                <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">경제 지표</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {mockEconomicIndicators.map((item) => (
                            <div key={item.name} className="bg-white rounded-xl p-4 border border-zinc-200">
                                <p className="text-[11px] text-zinc-400">{item.name}</p>
                                <p className="text-base font-bold text-zinc-800 mt-1">{item.value}</p>
                                <p
                                    className={cn(
                                        "text-[11px] font-semibold flex items-center gap-0.5 mt-1",
                                        item.trend === "up" ? "text-red-500" : "text-blue-500",
                                    )}
                                >
                                    {item.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {item.change}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 관심 종목 */}
                <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">관심 종목</p>
                    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                        <div className="grid grid-cols-4 px-5 py-2 bg-zinc-50 border-b border-zinc-100">
                            <span className="text-[10px] font-semibold text-zinc-400 col-span-2">종목</span>
                            <span className="text-[10px] font-semibold text-zinc-400 text-right">현재가</span>
                            <span className="text-[10px] font-semibold text-zinc-400 text-right">등락률</span>
                        </div>
                        <div className="divide-y divide-zinc-100">
                            {mockStocks.map((stock) => {
                                const isUp = stock.change > 0;
                                const priceStr =
                                    stock.market === "KR"
                                        ? `${stock.price.toLocaleString()}원`
                                        : `$${stock.price.toLocaleString()}`;
                                return (
                                    <div key={stock.id} className="grid grid-cols-4 items-center px-5 py-3.5 hover:bg-zinc-50 transition-colors">
                                        <div className="col-span-2">
                                            <p className="text-sm font-semibold text-zinc-800">{stock.name}</p>
                                            <p className="text-[10px] text-zinc-400">
                                                {stock.ticker} · {stock.market}
                                            </p>
                                        </div>
                                        <p className="text-sm font-bold text-zinc-800 text-right">{priceStr}</p>
                                        <p
                                            className={cn(
                                                "text-xs font-semibold flex items-center justify-end gap-0.5",
                                                isUp ? "text-red-500" : "text-blue-500",
                                            )}
                                        >
                                            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                                            {isUp ? "+" : ""}
                                            {stock.changePercent.toFixed(2)}%
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-zinc-400">
                    * 표시된 데이터는 목데이터입니다. 실제 증권 API 연동 시 교체될 예정입니다.
                </p>
            </div>
        </BaseLayout>
    );
};

export default StocksPage;
