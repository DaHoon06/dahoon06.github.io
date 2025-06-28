export const notionQueryKeys = {
    scheme: () => ["scheme"],
    posts: () => ["posts"],
    recentlyPosts: () => ["recentlyPosts"],
    tags: () => ["tags"],
    categories: () => ["categories"],
    post: (slug: string) => ["post", slug],
};
