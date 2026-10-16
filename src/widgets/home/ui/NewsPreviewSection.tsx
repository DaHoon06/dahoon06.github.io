import { ReactElement } from "react";
import { formatArchiveDate, NewsListItem, type NewsItem } from "@entities/news";
import { ROUTES } from "@shared/routes";
import { HomeSectionHeader } from "./HomeSectionHeader";

interface NewsPreviewSectionProps {
    /** 가장 최근 수집일 (KST YYYY-MM-DD) */
    date: string;
    /** getStaticProps 에서 점수순 상위 몇 건만 잘라 넘긴다 */
    items: NewsItem[];
}

/** 홈 — 최근 수집된 개발 뉴스 상위 몇 건 */
export const NewsPreviewSection = ({
    date,
    items,
}: NewsPreviewSectionProps): ReactElement | null => {
    if (items.length === 0) return null;

    return (
        <section className="mb-12">
            <HomeSectionHeader
                title="오늘의 개발 뉴스"
                description={`${formatArchiveDate(date)} 수집분 중 주목할 소식`}
                href={ROUTES.NEWS}
            />
            <div className="border-t border-zinc-200">
                {items.map((item) => (
                    <NewsListItem key={item.slug} item={item} />
                ))}
            </div>
        </section>
    );
};
