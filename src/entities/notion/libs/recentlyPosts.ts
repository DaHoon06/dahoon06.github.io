import { PostsType } from "../types";

export const recentlyPosts = (
    posts: PostsType,
    limit: number = 4
): PostsType => {
    return posts.slice(0, limit);
};
