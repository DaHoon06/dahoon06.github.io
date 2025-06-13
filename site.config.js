const CONFIG = {
    // profile setting (required)
    profile: {
        name: "Dahoon06",
        image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
        role: "FullStack Developer",
        bio: "Next.js React Vue.js NestJS MongoDB Node.js",
        email: "dahoon226@gmail.com",
        linkedin: "다훈-전-702984242",
        github: "dahoon06",
        instagram: "",
    },
    projects: [
        {
            icon: "/img/unisurvey_logo.jpeg",
            name: `유니서베이`,
            href: "https://unisurvey.co.kr/landing",
        },
        {
            icon: "",
            name: `패널허브`,
            href: "https://v3.panel-hub.io/",
        },
        {
            icon: "",
            name: `비즈챗`,
            href: "https://pmi.targeting.services/",
        },
    ],
    // blog setting (required)
    blog: {
        title: "Dahoon06 개발 블로그",
        description: "welcome to dahoon06 Store!",
        scheme: "dark", // 'light' | 'dark' | 'system'
    },

    // CONFIG configration (required)
    link: "https://dahoon06-store.vercel.app",
    since: 2024, // If leave this empty, current year will be used.
    lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
    ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

    // notion configuration (required)
    notionConfig: {
        pageId: process.env.NOTION_PAGE_ID,
    },

    // plugin configuration (optional)
    googleAnalytics: {
        enable: true,
        config: {
            measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
        },
    },
    googleSearchConsole: {
        enable: true,
        config: {
            siteVerification:
                process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
        },
    },
    naverSearchAdvisor: {
        enable: false,
        config: {
            siteVerification:
                process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
        },
    },
    utterances: {
        enable: true,
        config: {
            repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
            "issue-term": "og:title",
            label: "💬 Utterances",
        },
    },
    cusdis: {
        enable: false,
        config: {
            host: "https://cusdis.com",
            appid: "", // Embed Code -> data-app-id value
        },
    },
    isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
    revalidateTime: 3600, // revalidate time for [slug], index
};

module.exports = { CONFIG };
