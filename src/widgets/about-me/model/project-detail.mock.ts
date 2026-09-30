/**
 * 프로젝트 상세 페이지 목업 데이터.
 *
 * TODO: 실제 수치·내용으로 교체한다. 지금 값은 레이아웃 확인용 가짜 데이터다.
 * 목록에 공통으로 보이는 정보(제목·역할·기간·기술 스택)는 portfolio-data.ts 의 projectsData 를 그대로 쓰고,
 * 여기에는 상세 페이지에만 필요한 내용만 둔다.
 */

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectHighlight {
    title: string;
    description: string;
}

export interface ProjectChallenge {
    problem: string;
    solution: string;
    result: string;
}

export interface ProjectDetail {
    /** 히어로 아래 한 줄 요약 */
    summary: string;
    overview: string[];
    metrics: ProjectMetric[];
    highlights: ProjectHighlight[];
    challenges: ProjectChallenge[];
    retrospective: string;
}

export const projectDetailMock: Record<string, ProjectDetail> = {
    ichart: {
        summary:
            "흩어진 음원 플랫폼 데이터를 한 화면에서 비교하는 실시간 차트 서비스",
        overview: [
            "멜론·지니·플로 등 여러 음원 플랫폼의 차트는 집계 주기와 형식이 모두 달라, 팬들은 순위를 비교하려고 여러 앱을 오가야 했습니다.",
            "아이차트는 각 플랫폼 데이터를 주기적으로 수집·정제해 하나의 기준으로 맞추고, 시간대별 추이를 차트로 보여 주는 서비스입니다. 프론트엔드 리드로서 화면 구조 설계부터 렌더링 성능, 배포 파이프라인까지 담당했습니다.",
        ],
        metrics: [
            { label: "수집 플랫폼", value: "6개" },
            { label: "LCP 개선", value: "-42%" },
            { label: "일 평균 방문", value: "12만+" },
        ],
        highlights: [
            {
                title: "차트 렌더링 구조 설계",
                description:
                    "수백 개 데이터 포인트를 가진 차트 여러 개가 한 화면에 뜨는 구조라, 뷰포트에 들어온 차트만 그리도록 지연 렌더링하고 데이터 다운샘플링을 적용했습니다.",
            },
            {
                title: "실시간 갱신 캐싱 전략",
                description:
                    "React Query 의 staleTime 을 수집 주기에 맞춰 조정하고, 정각 갱신 시점에만 무효화해 불필요한 요청을 줄였습니다.",
            },
            {
                title: "모노레포 공통 UI 정리",
                description:
                    "인스티즈 본 서비스와 공유하는 컴포넌트를 패키지로 분리해 두 서비스의 디자인 일관성을 맞췄습니다.",
            },
        ],
        challenges: [
            {
                problem:
                    "정각마다 트래픽이 몰리며 차트 API 응답이 3초 이상 지연됐습니다.",
                solution:
                    "집계 결과를 Redis 에 미리 적재하고, 프론트에서는 직전 스냅샷을 먼저 보여 준 뒤 최신 데이터로 교체하도록 바꿨습니다.",
                result: "정각 피크 응답 시간 3.2s → 0.4s",
            },
        ],
        retrospective:
            "데이터가 핵심인 서비스일수록 화면보다 데이터 흐름을 먼저 설계해야 한다는 것을 배웠습니다. 다음에는 수집 단계부터 타입을 공유해 백엔드와의 계약을 더 단단하게 만들고 싶습니다.",
    },
    unisurvey: {
        summary:
            "누구나 설문을 만들고, 배포하고, 결과를 실시간으로 보는 플랫폼",
        overview: [
            "기존 설문 도구는 문항 유형이 제한적이고 결과 분석을 엑셀로 따로 해야 하는 불편이 있었습니다.",
            "유니서베이는 드래그 앤 드롭 설문 에디터와 응답 대시보드를 한곳에 모은 B2B/B2C 설문 플랫폼입니다. 에디터·대시보드 프론트엔드와 일부 NestJS API 를 맡았습니다.",
        ],
        metrics: [
            { label: "누적 설문", value: "3만+" },
            { label: "문항 유형", value: "20종" },
            { label: "응답 반영", value: "실시간" },
        ],
        highlights: [
            {
                title: "설문 에디터",
                description:
                    "문항 추가·순서 변경·분기 로직을 드래그 앤 드롭으로 편집하고, 편집 상태를 Zustand 로 관리해 되돌리기/다시하기를 지원했습니다.",
            },
            {
                title: "실시간 응답 대시보드",
                description:
                    "Socket.io 로 응답 이벤트를 받아 차트를 즉시 갱신하고, 이벤트가 몰릴 때는 배치로 묶어 렌더링 횟수를 제한했습니다.",
            },
            {
                title: "Vue → Next.js 전환",
                description:
                    "Vue2 기반 레거시 화면을 Next.js 로 단계적으로 옮기며 공용 디자인 시스템을 새로 정리했습니다.",
            },
        ],
        challenges: [
            {
                problem:
                    "문항이 100개를 넘는 설문에서 에디터 입력 지연이 체감될 정도로 커졌습니다.",
                solution:
                    "문항 단위로 상태 구독을 쪼개고 리스트를 가상화해, 편집 중인 문항만 다시 렌더링되도록 했습니다.",
                result: "입력 지연 약 300ms → 16ms 이하",
            },
        ],
        retrospective:
            "사용자가 오래 머무는 편집 화면은 작은 지연도 크게 느껴진다는 것을 체감했습니다. 성능을 기능 요구사항처럼 초기에 정의하는 습관이 생긴 프로젝트입니다.",
    },
    backoffice: {
        summary: "여러 설문 서비스를 한곳에서 운영하는 템플릿 기반 어드민",
        overview: [
            "서비스마다 따로 있던 관리 화면 때문에 운영팀은 같은 작업을 여러 번 반복해야 했습니다.",
            "백오피스는 설문 템플릿·사용자·권한·통계를 한곳에서 관리하는 어드민 플랫폼입니다. 화면 설계와 프론트엔드 구현, 권한 API 연동을 담당했습니다.",
        ],
        metrics: [
            { label: "통합 서비스", value: "4개" },
            { label: "운영 작업 시간", value: "-60%" },
            { label: "권한 역할", value: "5단계" },
        ],
        highlights: [
            {
                title: "권한별 접근 제어",
                description:
                    "메뉴·버튼 단위로 권한을 선언하는 방식으로 설계해, 역할이 추가돼도 화면 코드를 수정하지 않도록 했습니다.",
            },
            {
                title: "통계 대시보드",
                description:
                    "서비스별 지표를 같은 기준으로 비교할 수 있도록 기간 필터와 차트 컴포넌트를 공통화했습니다.",
            },
            {
                title: "템플릿 관리",
                description:
                    "자주 쓰는 설문 구성을 템플릿으로 저장·복제할 수 있게 해 신규 설문 준비 시간을 줄였습니다.",
            },
        ],
        challenges: [
            {
                problem:
                    "권한 체크 로직이 화면마다 흩어져 있어 누락으로 인한 노출 사고가 있었습니다.",
                solution:
                    "라우트·컴포넌트 단위 가드를 하나의 권한 맵으로 모으고, 권한 맵 기반 테스트를 추가했습니다.",
                result: "권한 관련 이슈 재발 0건",
            },
        ],
        retrospective:
            "내부 도구일수록 사용자(운영팀)와 가까이서 일할 수 있다는 장점이 있었습니다. 짧은 피드백 루프로 기능을 다듬는 경험이 이후 서비스 개발에도 도움이 됐습니다.",
    },
};

export const getProjectDetail = (slug: string): ProjectDetail | undefined =>
    projectDetailMock[slug];
