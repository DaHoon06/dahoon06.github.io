export type ActivityType = "post" | "archive" | "project" | "note";
export type ProjectStatus = "진행 중" | "완료" | "계획 중";
export type SkillCategory = "Frontend" | "Backend" | "Language" | "Database" | "DevOps";
export type TrendDirection = "up" | "down" | "neutral";

export interface DashboardStat {
  label: string;
  value: string;
  sublabel: string;
  trend: TrendDirection;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime?: string;
}

export interface TechSkill {
  name: string;
  level: number;
  category: SkillCategory;
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  progress: number;
  tags: string[];
  status: ProjectStatus;
  link?: string;
}

export interface WeeklyActivity {
  day: string;
  count: number;
}

export interface TodayStats {
  visitors: number;
  pageViews: number;
  weeklyPosts: number;
  comments: number;
}

export interface EconomicIndicator {
  name: string;
  value: string;
  change: string;
  trend: TrendDirection;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
}

export interface StockItem {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  market: "KR" | "US";
}

// ─── 홈 대시보드 ───────────────────────────────────────────────

export const mockTodayStats: TodayStats = {
  visitors: 178,
  pageViews: 423,
  weeklyPosts: 13,
  comments: 7,
};

// 월~일
export const mockWeeklyActivity: WeeklyActivity[] = [
  { day: "월", count: 2 },
  { day: "화", count: 0 },
  { day: "수", count: 3 },
  { day: "목", count: 1 },
  { day: "금", count: 2 },
  { day: "토", count: 4 },
  { day: "일", count: 1 },
];

// 최근 14일 방문자
export const mockVisitorTrend: number[] = [
  134, 118, 156, 145, 178, 201, 89, 167, 198, 212, 188, 156, 203, 178,
];

// ─── 경제 지표 ────────────────────────────────────────────────

export const mockEconomicIndicators: EconomicIndicator[] = [
  { name: "KOSPI", value: "2,847.52", change: "+1.23%", trend: "up" },
  { name: "KOSDAQ", value: "876.23", change: "-0.45%", trend: "down" },
  { name: "USD/KRW", value: "₩1,342", change: "+2.30", trend: "up" },
  { name: "비트코인", value: "₩98,234K", change: "+3.45%", trend: "up" },
  { name: "WTI 원유", value: "$78.45", change: "-0.82%", trend: "down" },
  { name: "금 (Gold)", value: "$2,312", change: "+0.28%", trend: "up" },
];

// ─── 뉴스 ────────────────────────────────────────────────────

export const mockNews: NewsItem[] = [
  { id: "1", title: "OpenAI, GPT-5 상반기 출시 일정 공개", source: "TechCrunch Korea", time: "30분 전", category: "AI" },
  { id: "2", title: "삼성전자, HBM4 양산 돌입… SK하이닉스와 경쟁 가열", source: "ZDNet Korea", time: "1시간 전", category: "반도체" },
  { id: "3", title: "카카오페이, 일본 결제 시장 진출 선언", source: "한국경제", time: "2시간 전", category: "핀테크" },
  { id: "4", title: "메타, AR 글래스 '오리온' 2026년 출시 공식화", source: "The Verge", time: "3시간 전", category: "AR/VR" },
  { id: "5", title: "Next.js 16, React 19 완전 지원 정식 릴리즈", source: "Vercel Blog", time: "4시간 전", category: "개발" },
  { id: "6", title: "애플, WWDC 2026 날짜 발표 — 6월 9일 개최", source: "9to5Mac", time: "5시간 전", category: "Apple" },
  { id: "7", title: "구글 DeepMind, 단백질 구조 예측 차세대 모델 공개", source: "Nature", time: "6시간 전", category: "AI" },
  { id: "8", title: "MS, GitHub Copilot 에이전트 모드 GA 발표", source: "GitHub Blog", time: "7시간 전", category: "개발" },
];

// ─── 주식 ────────────────────────────────────────────────────

export const mockStocks: StockItem[] = [
  { id: "1", name: "삼성전자", ticker: "005930", price: 78900, change: 900, changePercent: 1.16, market: "KR" },
  { id: "2", name: "카카오", ticker: "035720", price: 45200, change: -300, changePercent: -0.66, market: "KR" },
  { id: "3", name: "NAVER", ticker: "035420", price: 198000, change: 4100, changePercent: 2.12, market: "KR" },
  { id: "4", name: "SK하이닉스", ticker: "000660", price: 187500, change: 3500, changePercent: 1.9, market: "KR" },
  { id: "5", name: "Apple", ticker: "AAPL", price: 213.45, change: 2.15, changePercent: 1.02, market: "US" },
  { id: "6", name: "NVIDIA", ticker: "NVDA", price: 875.23, change: -12.45, changePercent: -1.4, market: "US" },
  { id: "7", name: "Microsoft", ticker: "MSFT", price: 425.6, change: 5.3, changePercent: 1.26, market: "US" },
];

// ─── 기존 데이터 ──────────────────────────────────────────────

export const mockStats: DashboardStat[] = [
  { label: "총 포스트", value: "42", sublabel: "+3 이번 달", trend: "up" },
  { label: "아카이브", value: "156", sublabel: "+12 이번 달", trend: "up" },
  { label: "총 조회수", value: "12.4k", sublabel: "+18% 이번 주", trend: "up" },
  { label: "프로젝트", value: "8", sublabel: "2개 진행 중", trend: "neutral" },
];

export const mockActivity: Activity[] = [
  {
    id: "1",
    type: "post",
    title: "Next.js 15 App Router 완벽 가이드",
    description: "App Router의 새로운 기능과 서버 컴포넌트 활용법",
    date: "2026-06-06",
    tags: ["Next.js", "React"],
    readTime: "8분",
  },
  {
    id: "2",
    type: "archive",
    title: "React 18 Concurrent Features 정리",
    description: "Suspense, useTransition, useDeferredValue 실전 활용",
    date: "2026-06-04",
    tags: ["React"],
    readTime: "12분",
  },
  {
    id: "3",
    type: "post",
    title: "TypeScript 5.0 데코레이터 신기능",
    description: "Stage 3 데코레이터 스펙과 실제 사용 패턴",
    date: "2026-06-01",
    tags: ["TypeScript"],
    readTime: "6분",
  },
];

export const mockTechStack: TechSkill[] = [
  { name: "Next.js", level: 90, category: "Frontend" },
  { name: "React", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Language" },
  { name: "Vue.js", level: 78, category: "Frontend" },
  { name: "NestJS", level: 75, category: "Backend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "MongoDB", level: 70, category: "Database" },
  { name: "TailwindCSS", level: 88, category: "Frontend" },
];

export const mockProjects: MockProject[] = [
  {
    id: "1",
    title: "Personal Dashboard Blog",
    description: "블로그를 어드민 대시보드 스타일로 리디자인",
    progress: 65,
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
    status: "진행 중",
  },
  {
    id: "2",
    title: "Open Source UI Kit",
    description: "React 기반 재사용 가능한 컴포넌트 라이브러리",
    progress: 40,
    tags: ["React", "Storybook"],
    status: "진행 중",
  },
  {
    id: "3",
    title: "Timestamp Converter Tool",
    description: "유닉스 타임스탬프 변환 & 계산 웹 도구",
    progress: 100,
    tags: ["Next.js", "TypeScript"],
    status: "완료",
    link: "/tools/timestamp-converter",
  },
];
