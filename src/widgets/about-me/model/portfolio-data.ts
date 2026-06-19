export type CareerType = "career" | "education";

export interface CareerItem {
    title: string;
    company: string;
    period: string;
    description: string;
    type: CareerType;
    location: string;
}

export interface TechGroup {
    type: string;
    stacks: string[];
}

export interface Project {
    title: string;
    description: string;
    role?: string;
    period?: string;
    company: string;
    techs: TechGroup[];
    images?: string[];
    link?: string;
    github?: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export const profileData = {
    name: "전다훈",
    nameEn: "Da-hoon Jeon",
    title: "Frontend Developer",
    bio: [
        "새로운 도전을 두려워하지 않고, 더 나은 경험을 위한 코드를 고민합니다.",
        "더 나은 UI와 더 빠른 웹을 위해 항상 배우고, 도전합니다.",
        "끊임없는 실험과 개선으로 성장하는 프론트엔드 개발자입니다.",
    ],
    email: "dahoon226@gmail.com",
    github: "https://github.com/dahoon06",
    linkedin: "https://linkedin.com",
    stats: {
        experience: "4+",
        projects: "10+",
    },
} as const;

export const skillsData: SkillCategory[] = [
    {
        category: "Frontend",
        items: [
            "Next.js",
            "React",
            "TypeScript",
            "TailwindCSS",
            "Zustand",
            "React Query",
            "Vue2/3",
            "Styled-components",
        ],
    },
    {
        category: "Backend",
        items: [
            "Django",
            "NestJS",
            "Python",
            "Node.js",
            "MySQL",
            "MongoDB",
            "Redis",
            "Celery",
        ],
    },
    {
        category: "DevOps & Tools",
        items: [
            "Docker",
            "AWS",
            "Nginx",
            "CloudFlare",
            "Git",
            "GitHub",
            "GitLab",
            "Sentry",
        ],
    },
];

export const careerData: CareerItem[] = [
    {
        title: "Frontend Engineer",
        company: "인스티즈(Instiz)",
        period: "2024.12 - Present",
        description: "연애 커뮤니티 및 음원 순위 차트 서비스 개발 및 유지보수",
        type: "career",
        location: "Seoul, Korea",
    },
    {
        title: "Platform Engineer",
        company: "피앰아이(PMI)",
        period: "2021.01 - 2024.12",
        description: "B2B 설문조사 서비스 및 백오피스 개발 및 유지보수",
        type: "career",
        location: "Seoul, Korea",
    },
    {
        title: "방송통신대학교",
        company: "한국방송통신대학교",
        period: "2024.03 - Present",
        description: "컴퓨터과학과",
        type: "education",
        location: "Seoul, Korea",
    },
    {
        title: "KH 정보교육원",
        company: "",
        period: "2021.03 - 2021.08",
        description: "UI / UX 스마트 콘텐츠 융합 웹 개발자 과정",
        type: "education",
        location: "Seoul, Korea",
    },
];

export const projectsData: Project[] = [
    {
        title: "아이차트(iChart)",
        description:
            "실시간 음원 데이터를 수집·정제하여 차트로 시각화하는 서비스. 멜론·지니·플로 등 주요 플랫폼 데이터를 Scrapy로 크롤링하고, Chart.js로 트렌드를 시각화합니다.",
        role: "Frontend Lead",
        period: "2024.12 - Present",
        company: "인스티즈",
        techs: [
            {
                type: "Frontend",
                stacks: [
                    "Next.js",
                    "TypeScript",
                    "TailwindCSS",
                    "Chart.js",
                    "React-Query",
                    "Zustand",
                ],
            },
            {
                type: "Backend",
                stacks: [
                    "Django",
                    "Celery",
                    "Python",
                    "MySQL",
                    "Redis",
                    "Scrapy",
                ],
            },
            {
                type: "Infra",
                stacks: [
                    "Sentry",
                    "Jest",
                    "Docker",
                    "AWS",
                    "CloudFlare",
                    "Nginx",
                ],
            },
        ],
        images: [],
    },
    {
        title: "유니서베이(Unisurvey)",
        description:
            "누구나 손쉽게 설문을 만들고 관리·배포할 수 있는 B2B/B2C 기반 설문 제작 플랫폼. 수집된 응답 데이터를 차트로 시각화하고, Socket.io를 통한 실시간 응답 현황 모니터링을 지원합니다.",
        role: "Frontend / Full-stack",
        period: "2021.01 - 2024.12",
        company: "피앰아이",
        techs: [
            {
                type: "Frontend",
                stacks: [
                    "Next.js",
                    "TypeScript",
                    "Styled-components",
                    "React Query",
                    "Zustand",
                    "Vue2/3",
                ],
            },
            {
                type: "Backend",
                stacks: ["NestJS", "TypeScript", "MongoDB"],
            },
            {
                type: "Infra",
                stacks: ["Docker", "AWS", "Socket.io", "GitHub"],
            },
        ],
        images: [
            "/images/project/pmi/unisurvey-preview1.gif",
            "/images/project/pmi/unisurvey-preview2.gif",
        ],
        link: "https://unisurvey.co.kr",
    },
    {
        title: "백오피스 관리 시스템",
        description:
            "설문 템플릿 기반 관리 시스템 구축. 다양한 설문 타입을 통합 관리하고, 운영 효율을 높이는 어드민 플랫폼입니다. 권한별 접근 제어와 대시보드 통계 기능을 포함합니다.",
        role: "Frontend / Full-stack",
        period: "2022.06 - 2024.12",
        company: "피앰아이",
        techs: [
            {
                type: "Frontend",
                stacks: [
                    "Next.js",
                    "TypeScript",
                    "Styled-components",
                    "React Query",
                    "Vue2/3",
                ],
            },
            {
                type: "Backend",
                stacks: ["NestJS", "TypeScript", "MongoDB"],
            },
            {
                type: "Infra",
                stacks: ["Docker", "AWS", "GitHub"],
            },
        ],
        images: [],
    },
];
