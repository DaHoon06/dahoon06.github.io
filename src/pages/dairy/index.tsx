import { getDairy } from "@entities/notion/libs/getDairy";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { useDairyQuery } from "@features/blog/post-list/model/queries";
import { PostList } from "@features/blog/post-list/ui/PostList";
import { CONFIG } from "@root/site.config";
import { queryClient } from "@shared/libs/react-query";
import {
    dehydrate,
    DehydratedState,
    HydrationBoundary,
} from "@tanstack/react-query";
import { BaseLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";

interface DairyPageProps {
    dehydratedState: DehydratedState;
}

const data = [
    {
        id: 1,
        date: "오늘",
        text: "아무 일도 없었는데 이상하게 마음이 무거웠다.",
        mood: "😶",
        gradient: "from-slate-600 to-slate-800",
    },
    {
        id: 2,
        date: "어제",
        text: "괜히 잘하고 싶어서 스스로를 더 몰아붙인 하루였다.",
        mood: "😔",
        gradient: "from-indigo-500 to-purple-600",
    },
    {
        id: 3,
        date: "3일 전",
        text: "생각보다 내가 버텨온 시간이 꽤 길다는 걸 알았다.",
        mood: "🙂",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        id: 4,
        date: "4일 전",
        text: "웃으면서 넘겼지만 마음 한구석엔 계속 남아 있었다.",
        mood: "😕",
        gradient: "from-rose-500 to-pink-600",
    },
    {
        id: 5,
        date: "5일 전",
        text: "오늘은 아무것도 하지 않았는데 그게 오히려 좋았다.",
        mood: "😌",
        gradient: "from-amber-400 to-orange-500",
    },
    {
        id: 6,
        date: "일주일 전",
        text: "괜찮다고 말했지만 사실 누군가 알아줬으면 했다.",
        mood: "🥲",
        gradient: "from-cyan-500 to-sky-600",
    },
];

export default function DairyPage({ dehydratedState }: DairyPageProps) {
    // const data = useDairyQuery();
    // console.log(data);
    return (
        <HydrationBoundary state={dehydratedState}>
            <BaseLayout>
                <div className="min-h-screen bg-background px-4 py-6">
                    <header className="mb-6">
                        <h1 className="text-xl font-semibold">오늘의 한 줄</h1>
                        <p className="text-sm text-zinc-400">
                            감정을 흘려보내는 공간
                        </p>
                    </header>

                    <div className="space-y-6 text-white">
                        {data.map((v) => (
                            <div
                                key={v.id}
                                className={`relative rounded-2xl p-5 bg-gradient-to-br ${v.gradient} shadow-xl`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm opacity-80">
                                        {v.date}
                                    </span>
                                    <span className="text-xl">{v.mood}</span>
                                </div>

                                <p className="text-lg leading-relaxed font-medium">
                                    {v.text}
                                </p>

                                <div className="mt-4 flex justify-end">
                                    <button className="text-xs opacity-80 hover:opacity-100">
                                        보관하기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BaseLayout>
        </HydrationBoundary>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const dairy = await getDairy();
    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.dairy(),
        queryFn: () => dairy,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        ...(CONFIG.isProd ? { revalidate: 3600 } : {}),
    };
};
