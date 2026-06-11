export const mockTodayMeals = [
    {
        type: "아침",
        time: "08:30",
        menu: ["현미밥", "된장찌개", "계란말이", "김치"],
        calories: 520,
        target: 600,
    },
    {
        type: "점심",
        time: "12:30",
        menu: ["닭가슴살 샐러드", "그릭요거트", "아메리카노"],
        calories: 480,
        target: 700,
    },
    {
        type: "저녁",
        time: "19:00",
        menu: ["연어 포케", "방울토마토", "두부조림"],
        calories: 610,
        target: 700,
    },
];

export const mockWeeklyCalories = [
    { day: "월", calories: 1820, target: 2000 },
    { day: "화", calories: 2100, target: 2000 },
    { day: "수", calories: 1950, target: 2000 },
    { day: "목", calories: 1680, target: 2000 },
    { day: "금", calories: 2250, target: 2000 },
    { day: "토", calories: 2400, target: 2000 },
    { day: "일", calories: 1610, target: 2000 },
];

export const mockRecipes = [
    {
        id: 1,
        name: "연어 아보카도 포케",
        category: "건강식",
        time: "15분",
        calories: 520,
        difficulty: "쉬움",
        tags: ["고단백", "저탄수"],
    },
    {
        id: 2,
        name: "닭가슴살 그릭 샐러드",
        category: "다이어트",
        time: "10분",
        calories: 380,
        difficulty: "쉬움",
        tags: ["저칼로리", "고단백"],
    },
    {
        id: 3,
        name: "두부 된장 리조또",
        category: "한식 퓨전",
        time: "25분",
        calories: 440,
        difficulty: "보통",
        tags: ["비건", "단백질"],
    },
    {
        id: 4,
        name: "현미 비빔밥",
        category: "한식",
        time: "20분",
        calories: 560,
        difficulty: "쉬움",
        tags: ["균형식", "채소"],
    },
];

// 외식 산업 트렌드

export const mockIngredientPrices = [
    { name: "삼겹살", unit: "100g", price: 2800, change: +3.2, trend: "up" },
    { name: "대파", unit: "1단", price: 1500, change: -8.5, trend: "down" },
    { name: "계란", unit: "30구", price: 8200, change: +1.1, trend: "up" },
    { name: "상추", unit: "100g", price: 980, change: -12.3, trend: "down" },
    { name: "닭가슴살", unit: "100g", price: 1950, change: +0.5, trend: "up" },
    { name: "두부", unit: "300g", price: 2200, change: -2.0, trend: "down" },
];

export const mockDeliveryTrends = [
    { rank: 1, menu: "반반치킨", platform: "배달의민족", orders: 42800, change: +5.2 },
    { rank: 2, menu: "떡볶이세트", platform: "쿠팡이츠", orders: 38200, change: +12.1 },
    { rank: 3, menu: "마라탕", platform: "배달의민족", orders: 31500, change: -3.4 },
    { rank: 4, menu: "초밥모둠", platform: "요기요", orders: 28900, change: +8.7 },
    { rank: 5, menu: "삼겹살구이", platform: "배달의민족", orders: 24600, change: +1.8 },
];

export const mockFoodNews = [
    {
        id: 1,
        title: "2026 외식 트렌드, '가성비 프리미엄'이 주도",
        source: "식품음료신문",
        time: "2시간 전",
        category: "트렌드",
    },
    {
        id: 2,
        title: "배달앱 수수료 인상 논란, 자영업자 부담 가중",
        source: "경향신문",
        time: "4시간 전",
        category: "이슈",
    },
    {
        id: 3,
        title: "간편식 시장 올해 5조 돌파 전망",
        source: "한국경제",
        time: "6시간 전",
        category: "시장",
    },
    {
        id: 4,
        title: "대체육 수요 급증, 식물성 단백질 레스토랑 확대",
        source: "푸드투데이",
        time: "8시간 전",
        category: "트렌드",
    },
];

// 식당 운영 지표

export const mockRestaurantStats = [
    { label: "오늘 매출", value: "1,284,000원", change: +8.2, icon: "sales" },
    { label: "평균 객단가", value: "18,300원", change: -2.1, icon: "spend" },
    { label: "테이블 회전율", value: "3.4회", change: +0.3, icon: "table" },
    { label: "오늘 방문객", value: "70명", change: +5.0, icon: "visitors" },
];

export const mockMenuRanking = [
    { rank: 1, name: "시그니처 파스타", sales: 28, revenue: 392000, margin: 68 },
    { rank: 2, name: "트러플 리조또", sales: 21, revenue: 357000, margin: 72 },
    { rank: 3, name: "티본 스테이크", sales: 14, revenue: 490000, margin: 58 },
    { rank: 4, name: "시저 샐러드", sales: 35, revenue: 245000, margin: 75 },
    { rank: 5, name: "티라미수", sales: 19, revenue: 133000, margin: 80 },
];

export const mockPlatformReviews = [
    { platform: "네이버", score: 4.7, reviews: 1248, positive: 94 },
    { platform: "카카오", score: 4.5, reviews: 832, positive: 91 },
    { platform: "구글", score: 4.6, reviews: 524, positive: 93 },
];

export const mockCostRatios = [
    { label: "식재료비", ratio: 32, color: "#ff7337" },
    { label: "인건비", ratio: 28, color: "#3b82f6" },
    { label: "임대료", ratio: 18, color: "#8b5cf6" },
    { label: "기타 경비", ratio: 10, color: "#10b981" },
    { label: "순이익", ratio: 12, color: "#f59e0b" },
];
