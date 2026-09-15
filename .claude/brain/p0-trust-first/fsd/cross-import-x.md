# @x cross-import

## 개요

- 같은 레이어 슬라이스 간 import는 원칙적으로 금지된다.
- **`@x`**는 그 제약을 우회하는 **FSD 공식 cross-import 패턴**(v2.1 표준).
- `A/@x/B`는 **"A crossed with B"**로 읽는다.
- 다른 슬라이스에 **노출할 타입·데이터만** `@x`에 명시적으로 둔다.

## 파일 규칙

- 경로: `{slice}/@x/{consumer-slice}.ts`
- 각 파일은 **특정 소비자 슬라이스 전용** export만 포함.
- 파일명 = 소비자 슬라이스 이름 → 의존 방향이 드러난다.
- 기존 slice 루트 `index.ts`(public API)는 그대로 유지.

## 사용 기준

- **entities 레이어에서만** 사용한다 (엔티티 간 참조가 불가피할 때).
- 데이터 fetch 함수·비즈니스 로직 공유 용도로 쓰지 않는다 → **상위 레이어에서 조합**.
- `@x`가 과하면 슬라이스 병합 또는 상위 레이어 추출을 검토한다.

## 예시

```ts
// entities/song/@x/artist.ts
// artist 슬라이스가 song에서 필요로 하는 타입만 export
export type { SongBrief } from '../model/song.types';
export type { SongId } from '../model/song.types';
```

```ts
// entities/artist/model/artist.types.ts
import type { SongBrief } from '@/entities/song/@x/artist';

export interface ArtistDetail {
  id: number;
  name: string;
  songs: SongBrief[];
}
```
