import { HydrationBoundary } from "@tanstack/react-query";
import { BlogLayout } from "@widgets/layouts";
import { RecentlyPostList } from "@features/blog/ui/post-list/RecentlyPostList";

interface RecentlyPostsViewProps {
    dehydratedState: any;
}

export const RecentlyPostsView = ({
    dehydratedState,
}: RecentlyPostsViewProps) => {
    return (
        <HydrationBoundary state={dehydratedState}>
            <BlogLayout isSearch={false}>
                <RecentlyPostList />
            </BlogLayout>
        </HydrationBoundary>
    );
};
