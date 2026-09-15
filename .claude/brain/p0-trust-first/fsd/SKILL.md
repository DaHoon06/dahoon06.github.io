# FSD 규약 (루트 brain · p0)

Feature-Sliced Design 적용 시 **아래 파일만** 읽으면 된다.

## 언제 읽나

- 새 슬라이스·세그먼트 추가, import 경계, `@x` 사용 여부를 결정할 때
- entities `api`·TanStack Query·요청 파일 네이밍을 맞출 때

## 문서 맵

| 문서 | 내용 |
| --- | --- |
| [project-structure.md](./project-structure.md) | Next `app/` vs `src/` FSD 레이어 디렉터리 트리 |
| [layer-rules.md](./layer-rules.md) | 레이어 단방향 의존성, shared vs 그 외 **경계** |
| [cross-import-x.md](./cross-import-x.md) | `@x` cross-import (entities 전용) |
| [segments.md](./segments.md) | `ui` / `api` / `model` / `lib` / `config` 역할 |
| [tanstack-query.md](./tanstack-query.md) | `{entity}.query.ts`, queryKey·queryOptions |
| [api-requests.md](./api-requests.md) | `{method}-*.ts`, 타입 동반 선언 |


## 한 줄 요약

**의존성**: `app` → `pages` → `widgets` → `features` → `entities` → `shared`. 같은 레이어 슬라이스 간 import 금지(예외는 entities의 `@x`만).
