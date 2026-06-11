export const ROUTES = {
    HOME: "/",
    POSTS: "/posts",
    POST: (slug: string) => `/posts/${slug}`,
    POSTS_WITH_CATEGORY: (category: string) => `/posts?category=${category}`,
    POSTS_WITH_TAG: (tag: string) => `/posts?tag=${tag}`,
    ARCHIVING: "/archiving",
    ARCHIVING_DETAIL: (slug: string) => `/archiving/${slug}`,
    NEWS: "/news",
    STOCKS: "/stocks",
    TOOLS: "/tools/timestamp-converter",
    FOOD: "/food",
    ABOUT: "/about-me",
} as const;
