export const notionQueryKeys = {
    scheme: () => ["scheme"],
    posts: () => ["posts"],
    tags: () => ["tags"],
    categories: () => ["categories"],
    post: (slug: string) => ["post", slug],
};
