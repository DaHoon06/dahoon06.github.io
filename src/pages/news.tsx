import { NextPage } from "next";
import { BaseLayout } from "@widgets/layouts";
import { mockNews } from "@shared/data/mock-dashboard";
import { Clock, ExternalLink } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
    AI: "bg-violet-100 text-violet-700",
    반도체: "bg-blue-100 text-blue-700",
    핀테크: "bg-emerald-100 text-emerald-700",
    "AR/VR": "bg-pink-100 text-pink-700",
    개발: "bg-orange-100 text-orange-700",
    Apple: "bg-zinc-100 text-zinc-700",
};

const NewsPage: NextPage = () => {
    return (
        <BaseLayout>
            <div className="space-y-5 max-w-2xl">
                <div>
                    <h2 className="text-lg font-bold text-zinc-800">IT 뉴스</h2>
                    <p className="text-sm text-zinc-400 mt-0.5">기술 트렌드와 개발 소식</p>
                </div>

                <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden">
                    {mockNews.map((news) => {
                        const catClass = CATEGORY_COLORS[news.category] ?? "bg-zinc-100 text-zinc-600";
                        return (
                            <div
                                key={news.id}
                                className="flex items-start gap-4 px-5 py-4 hover:bg-zinc-50 transition-colors group cursor-pointer"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${catClass}`}>
                                            {news.category}
                                        </span>
                                        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                                            <Clock size={10} />
                                            {news.time}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-zinc-800 group-hover:text-[#ff7337] transition-colors">
                                        {news.title}
                                    </p>
                                    <p className="text-[11px] text-zinc-400 mt-1">{news.source}</p>
                                </div>
                                <ExternalLink size={14} className="shrink-0 text-zinc-300 group-hover:text-[#ff7337] transition-colors mt-0.5" />
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-xs text-zinc-400">
                    * 표시된 뉴스는 목데이터입니다. 실제 뉴스 API 연동 시 교체될 예정입니다.
                </p>
            </div>
        </BaseLayout>
    );
};

export default NewsPage;
