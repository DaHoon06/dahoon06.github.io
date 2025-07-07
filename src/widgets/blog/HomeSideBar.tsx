import { ReactElement } from "react";
import { RecentlyPostTitleList } from "@features/blog/ui/post-list/RecentlyPostTitleList";
import { TagList } from "@features/blog/ui/tag-list/TagList";
import styles from "./HomeSideBar.module.scss";

export const HomeSideBar = (): ReactElement => {
    return (
        <aside className={styles.homeSideBar}>
            <RecentlyPostTitleList />
            <TagList />
        </aside>
    );
};
