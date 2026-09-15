import { ReactElement } from "react";
import { formatArchiveDate, type NewsArchive } from "@entities/news";
import { EmptyState } from "@shared/ui/empty-state";
import { NewsListRenderer } from "./NewsListRenderer";

interface NewsDigestProps {
    archive: NewsArchive | null;
}

export const NewsDigest = ({ archive }: NewsDigestProps): ReactElement => {
    if (!archive || archive.items.length === 0) {
        return (
            <div>
                <NewsHeading date={archive?.date} />
                <EmptyState
                    title="아직 수집된 소식이 없어요"
                    description="매일 아침 자동 수집이 돌면 이곳에 쌓입니다."
                />
            </div>
        );
    }

    return (
        <div>
            <NewsHeading date={archive.date} count={archive.items.length} />
            <NewsListRenderer items={archive.items} />
        </div>
    );
};

interface NewsHeadingProps {
    date?: string;
    count?: number;
}

const NewsHeading = ({ date, count }: NewsHeadingProps): ReactElement => (
    <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            개발 뉴스
        </h1>
        <p className="mt-1.5 text-sm text-zinc-400">
            {date ? formatArchiveDate(date) : "매일 아침 자동 수집"}
            {typeof count === "number" && ` · ${count}건`}
        </p>
    </header>
);
