# 기본 원칙 · 경계 기준

## 레이어 단방향 의존성

- **순서**: `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- 하위 레이어는 상위 레이어를 **import하지 않는다**.
- **같은 레이어** 슬라이스 간 import는 **금지** (예외: [cross-import-x.md](./cross-import-x.md))

## shared 레이어

- **segment가 경계** (slice 없음).
- 각 segment 루트에 public API (`index.ts`) 구성.
- 직접 깊은 경로 접근은 가능하나, **segment 루트 경유를 권장** (선택).

## pages / widgets / features / entities

- **slice가 경계**.
- slice 루트에 `index.ts` **필수**.
- 외부에서는 **slice 루트만** import.
- `ui`, `api`, `model`, `lib`, `config` 등 segment는 **경계가 아님** (slice 내부 구조).

## 세그먼트 역할 요약

세그먼트별 책임은 [segments.md](./segments.md)를 본다.
