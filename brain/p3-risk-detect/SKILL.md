# 위험 감지 · 방어 (p3-risk-detect)

공통 테스트 전략, 에러 처리 가드레일이다.

---

## 테스트 원칙

- **단위 테스트**: Jest + React Testing Library (RTL).
- **통합 테스트**: 실제 의존성 사용. DB·API mock 최소화.
- 테스트 파일은 테스트 대상 파일 **같은 위치**에 `*.test.ts(x)` 또는 `__tests__/` 폴더에 둔다.
- 각 패키지의 jest 설정은 `packages/jest`의 공통 preset 상속.

## 커버리지 가이드라인

- 신규 컴포넌트·hook: **핵심 인터랙션 테스트** 필수 (빈 컴포넌트 렌더 테스트는 의미 없음).
- 비즈니스 로직(model, lib 세그먼트): **엣지 케이스** 포함 필수.
- UI 스냅샷: 의도적 변경인지 판단 어렵기 때문에 **지양**.

## 에러 처리

- API 에러: TanStack Query의 `onError` / Error Boundary 조합으로 처리.
- 예상 가능한 런타임 예외: 호출부에서 처리 (전역 catch로 숨기지 않음).
- 예상 불가 예외: 가장 가까운 Error Boundary가 처리.

## PR 전 체크

```bash
pnpm test:ci       # 실패 시 PR 블로킹
pnpm check-types   # 타입 오류 0개 유지
pnpm lint          # ESLint 경고도 가능하면 해소
```

## 금지 패턴

- `as any` 남용 — 타입 좁히기(narrowing)로 대체.
- `// @ts-ignore` — 불가피하면 `// @ts-expect-error` + 이유 주석.
- `console.log` 커밋 — 디버그 로그는 PR 전 제거.
