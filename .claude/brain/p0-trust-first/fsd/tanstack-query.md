# TanStack Query 컨벤션

## 파일

- `{entity}.query.ts`에 **query factory** + **queryOptions** 정의.
- query key는 **도메인 기준 + 파라미터 조합**으로 계층화한다.

## 예시

```ts
// .../api/song.query.ts
import { queryOptions } from '@tanstack/react-query';
import { getSongDetail, getSongList } from './get-song'; // 실제 경로에 맞게 조정

export const songQueries = {
  all: () => ['songs'] as const,
  lists: () => [...songQueries.all(), 'list'] as const,
  list: (filters: SongFilters) => [...songQueries.lists(), filters] as const,
  details: () => [...songQueries.all(), 'detail'] as const,
  detail: (id: number) => [...songQueries.details(), id] as const,
};

export const songQueryOptions = {
  list: (filters: SongFilters) =>
    queryOptions({
      queryKey: songQueries.list(filters),
      queryFn: () => getSongList(filters),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: songQueries.detail(id),
      queryFn: () => getSongDetail(id),
    }),
};
```

- 요청 함수 네이밍·타입: [api-requests.md](./api-requests.md)
