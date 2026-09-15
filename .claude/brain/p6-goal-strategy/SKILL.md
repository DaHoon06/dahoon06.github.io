# 현재 목표 · 우선순위 (p6-goal-strategy)

> 이 파일은 가장 자주 갱신된다. 작업 전 현재 내용을 확인한다.

---

## 현재 스프린트 (2026-05-04 기준)

### 진행 중

- **[uikit] 에디터 기능 확장** — Tiptap 기반 에디터 확장 컴포넌트 개발 중 (branch: `feature/editor`)
  - 기본 UI 에디터 추가 완료
  - 툴바 컴포넌트 (Bold/Italic/Underline/Strike, FontSize, TextColor, BgColor) 완료
  - 추가 확장 기능 개발 중

### 최근 완료

- `@instiz-team/uikit` v0.1.5 릴리즈
- ichart 패키지 Jest + RTL 테스트 환경 구축

---

## 모노레포 앱 현황

| 앱 | 설명 |
| --- | --- |
| `apps/instiz` | 메인 서비스 |
| `apps/instiz-admin` | 관리자 페이지 |
| `apps/ichart` | 차트 서비스 |
| `apps/ichart-admin` | 차트 관리자 |
| `apps/ui-docs` | 컴포넌트 문서 (Storybook 등) |
| `packages/uikit` | 공통 UI 컴포넌트 라이브러리 |

---

## 다음 우선순위

1. uikit 에디터 기능 안정화 및 ui-docs 문서 추가
2. 각 앱 brain(p4, p6) 초기 설정
3. 앱별 테스트 커버리지 확보

---

> 스프린트가 바뀌면 이 파일을 갱신한다.
