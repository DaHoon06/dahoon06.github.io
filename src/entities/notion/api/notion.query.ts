export const notionQueryKeys = {
    scheme: () => ["scheme"] as const,
    posts: () => ["posts"] as const,
    recentlyPosts: () => ["recentlyPosts"] as const,
    tags: () => ["tags"] as const,
    categories: () => ["categories"] as const,
    post: (slug: string) => ["post", slug] as const,
    archivings: () => ["archivings"] as const,
    archiving: (slug: string) => ["archiving", slug] as const,
};
