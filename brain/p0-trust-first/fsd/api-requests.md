# API 요청 파일 컨벤션

## 파일명

- `{method}-*.ts` 형태 (예: `get-song.ts`, `create-order.ts`).
- **한 파일에 하나의 요청 함수**.

## 타입 선언

- 요청 파일 **상단**에서 params·response 타입을 함께 선언한다.
- **별도 `types.ts`로 분리하지 않는다** (요청 단위 응집).

## 예시

```ts
// entities/song/api/get-song.ts
import { httpClient } from '@/shared/lib/http-client';

interface GetSongParams {
  id: number;
}

interface SongResponse {
  id: number;
  title: string;
  artist: { id: number; name: string };
  duration: number;
}

export const getSong = async ({ id }: GetSongParams): Promise<SongResponse> => {
  const { data } = await httpClient.get(`/songs/${id}`);
  return data;
};
```

- Query 레이어와의 연결: [tanstack-query.md](./tanstack-query.md)
