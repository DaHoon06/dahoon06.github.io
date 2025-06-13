import { PostsType } from "../types";

export function getAllSelectItemsFromPosts(
    key: "tags" | "category",
    posts: PostsType
) {
    const selectedPosts = posts.filter((post) => post?.[key]);
    const items = [...selectedPosts.map((p) => p[key]).flat()];
    const itemObj: { [itemName: string]: number } = {};
    items.forEach((item) => {
        if (!item) return;
        if (item in itemObj) {
            itemObj[item]++;
        } else {
            itemObj[item] = 1;
        }
    });
    return itemObj;
}
