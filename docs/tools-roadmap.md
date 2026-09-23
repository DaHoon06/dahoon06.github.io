# Tools 섹션 — 현재 상태와 다음 도구 후보

> 대상: `dahoon06.github.io` (Next.js Pages Router, `output: "export"` 정적 배포)

블로그의 `/tools` 섹션에 개발용 유틸을 모으는 중이다. 이 문서는 **지금까지 만든 것**과
**다음에 무엇을 만들지 판단한 근거**를 남긴 것이다. 에이전트 세션이 끊겨도 이 파일만 읽으면
바로 이어서 작업할 수 있게 쓴다.

---

## 1. 현재 상태 (2026-09-23 기준)

`/tools`는 **허브 페이지**이고, 그 아래 도구 페이지가 붙는 구조다. 허브에 깔리는 카드 목록은
`src/shared/config/tools.ts` 한 곳에서만 관리한다 (`NAV_ITEMS`와 같은 패턴). **도구를 추가할 때
카드를 따로 하드코딩하지 말고 이 배열에 항목만 더하면 된다.**

### 만들어진 도구

| 경로 | 도구 | 슬라이스 |
| --- | --- | --- |
| `/tools` | 허브 (바로가기 카드) | `src/pages/tools/index.tsx` |
| `/tools/timestamp-converter` | 타임스탬프 변환기 | `src/features/playground/timestamp-converter/` |
| `/tools/uuid-generator` | UUID 생성기 (v1·v3·v4·v5·v7) | `src/features/playground/uuid-generator/` |
| `/tools/json-formatter` | JSON 포맷터 · 트리 뷰 · 오류 위치 | `src/features/playground/json-formatter/` |
| `/tools/jwt-decoder` | JWT 디코더 (exp·iat·nbf → KST, 만료 배지) | `src/features/playground/jwt-decoder/` |
| `/tools/base64-url` | Base64 / URL 인코더·디코더 · data URI · 쿼리 파서 | `src/features/playground/base64-url/` |

### 관련 파일

- `src/shared/routes/index.ts` — `TOOLS`(`/tools`), `TOOLS_TIMESTAMP`, `TOOLS_UUID`, `TOOLS_JSON`, `TOOLS_JWT`, `TOOLS_BASE64`
- `src/shared/config/tools.ts` — 허브 카드 목록 (title / eyebrow / description / icon / tags)
- `src/shared/config/seo.ts` — `PAGE_SEO.<도구>` (title·description 80자·keywords). 페이지는 `<SeoHead {...seo} jsonLd={...} />`
- `src/shared/lib/date.ts` — `formatKst` / `formatIsoKst` / `relativeTimeFromNow`. 타임스탬프 변환기와 JWT 디코더가 공유한다
  (features끼리 import 금지라 shared로 올렸다)
- `src/shared/lib/base64.ts` — UTF-8 안전한 Base64 (`encodeBase64` / `decodeBase64` / `bytesToBase64`). JWT와 Base64 도구가 공유
- `src/shared/config/nav.ts` — 헤더·하단탭의 "도구" 메뉴. `match: "/tools"`라 하위 경로에서도 활성 표시된다.

### 새 도구를 추가하는 순서

```
1. src/features/playground/<도구명>/  슬라이스 생성 (model / lib / ui 세그먼트)
2. src/pages/tools/<도구명>/index.tsx  페이지 추가 (SeoHead + BaseLayout + 허브로 돌아가는 breadcrumb)
3. src/shared/routes/index.ts 에 TOOLS_XXX 라우트 추가
4. src/shared/config/seo.ts 의 PAGE_SEO 에 항목 추가
5. src/shared/config/tools.ts 의 TOOL_ITEMS 에 카드 추가
6. npm run build 로 정적 export 확인 (out/tools/<도구명>.html 생성되는지)
   ※ next dev 가 떠 있으면 같은 .next 를 덮어써 dev 서버가 깨진다. dev 를 끄고 빌드하거나 복사본에서 빌드할 것
```

### 알아 둘 함정

UUID 생성기를 만들며 걸린 것이라 기록해 둔다.

- `uuid@9`에는 **v7이 없다.** 직접 구현했는데, 이 패키지의 `stringify`가 내부적으로 v1~v5만
  통과시키는 검증을 해서 v7 바이트를 넣으면 런타임 예외가 난다. 그래서 바이트 → 문자열 변환은
  자체 구현(`stringifyBytes`)으로 대체했다.
- 같은 이유로 v3/v5의 네임스페이스 자리에 v7 UUID를 넣으면 라이브러리가 거부한다. 한국어 에러
  메시지로 감싸 두었다.

JSON·JWT·Base64를 만들며 걸린 것:

- **최신 V8(Chrome 117+, Node 20+)의 `JSON.parse` 에러 메시지에는 위치가 없다**
  (`Unexpected token '}', "..." is not valid JSON`). 메시지에서 position을 뽑는 방식은 Firefox·구버전만
  통한다. 그래서 값을 만들지 않고 문법만 따라가는 스캐너(`json-formatter/lib/find-json-error.ts`)를
  두고, 메시지에 위치가 없으면 이걸로 줄·글자를 계산한다.
- `btoa`/`atob`는 Latin-1만 받아 한글에서 예외가 난다 → `TextEncoder`로 바이트를 거쳐 변환한다.
  바이트 → 문자열 변환은 `String.fromCharCode(...큰배열)`이 콜스택을 넘으므로 32KB 청크로 나눈다.
- `qs`는 의존성에 있지만 `@types/qs`가 없어 strict 타입체크를 통과하지 못한다. 쿼리 파싱은 네이티브
  `URLSearchParams`로 했다 (중첩 `a[b]=1` 해석은 안 함).
- tsconfig에 `noUncheckedIndexedAccess`가 켜져 있다. 배열 인덱싱·구조분해 결과는 `undefined` 가능성을
  처리해야 한다.

---

## 2. 다음 도구 후보

정적 export + 브라우저 전용이라는 제약에 맞는 것들만 골랐다. 서버가 없으므로 **입력값이 서버로
나가지 않는다**는 점 자체가 이 섹션의 차별점이 된다.

### 먼저 만들 것 3개 (우선순위 순) — ✅ 2026-09-23 완료

**1순위 — JSON 포맷터 / 뷰어**

이 카테고리에서 체감·검색량 모두 1등이다. 포맷 · 압축(minify) · 유효성 검사에 접기 가능한 트리
뷰, 에러 위치(line/col) 표시까지. 순수 JS로 끝나고 **의존성 0**이다.

**2순위 — JWT 디코더**

header/payload를 파싱하고 `exp`·`iat`를 KST로 환산해 만료 여부를 배지로 보여준다. 이미 만든
타임스탬프 변환기의 포맷 로직을 그대로 재사용할 수 있다. **"서버로 안 보낸다"는 점이 실제 가치가
되는 유일한 도구**라, 브라우저 전용이라는 이 사이트의 특성과 제일 잘 맞는다 — 사내 토큰을 아무
사이트에나 붙여넣는 게 늘 찜찜한 일이기 때문이다.

**3순위 — Base64 / URL 인코더·디코더**

텍스트뿐 아니라 이미지 → data URI까지. URL 쪽은 쿼리스트링 파서를 같이 붙이면 좋고, `qs`가 이미
의존성에 들어 있다.

### 그다음 후보

| 도구 | 쓸모 | 구현 부담 |
| --- | --- | --- |
| Cron 표현식 해석기 | 표현식 → 한국어 설명 + 다음 실행 시각 N개. 타임스탬프 도구와 시너지 | 중 (파서 직접) |
| 해시 생성기 | SHA-1/256/384/512는 Web Crypto로 즉시. MD5만 별도 구현 필요 | 하 |
| 색상 변환기 | HEX/RGB/HSL/OKLCH + WCAG 대비비 체크 | 중 |
| 문자열 케이스 변환 | camel/snake/kebab/pascal + 슬러그 생성 | 하 |
| 정규식 테스터 | 매치 하이라이트 · 그룹 · 치환 미리보기 | 중 (아래 주의) |
| 텍스트 Diff | 두 텍스트 비교. LCS 직접 구현 가능 | 중 |
| 이미지 변환·압축 | Canvas로 WebP 변환/리사이즈. 업로드 없이 되는 게 장점 | 중 |
| 바이트 단위 · chmod 계산기 | 소품이지만 카드 채우기 좋음 | 하 |

**정규식 테스터 주의**: 사용자가 입력한 정규식은 ReDoS로 탭 전체를 얼려버릴 수 있고, JS에는
정규식 타임아웃이 없다. 만든다면 **Web Worker에서 실행하고 일정 시간이 지나면 `terminate()`**
하는 구조로 가야 한다.

### 새 카드 대신 기존 도구에 얹는 게 나은 것

- **UUID 생성기에 탭 추가** — Nano ID, ULID. "짧은 ID"를 찾는 사람이 결국 같은 페이지로 오므로
  카드를 늘리기보다 탭이 낫다.
- **타임스탬프 변환기에 타임존 비교** — 같은 순간을 KST / UTC / PST 나란히. 이미 `Intl` 포맷터가
  다 갖춰져 있다.

### 만들지 않기로 한 것

| 후보 | 탈락 이유 |
| --- | --- |
| SQL 포맷터 | IDE가 이미 한다. 라이브러리 의존성만 커진다 |
| Lorem ipsum 생성기 | IDE 플러그인으로 충분 |
| 마크다운 프리뷰 | 블로그 렌더러(react-notion-x)와 역할이 겹친다 |
| QR 코드 생성기 | 개발 유틸이라기엔 결이 다르고, 라이브러리가 필요하다 |

공통 기준은 **"카드만 늘고 재방문은 안 생기는가"**다. 이미 IDE나 기존 렌더러가 하는 일은 넣지
않는다.

---

## 3. 결정 요약

**JSON 포맷터 → JWT 디코더 → Base64/URL** 세 개를 새 의존성 없이 끝냈다 (2026-09-23).
JWT는 타임스탬프 도구의 KST 포맷을 `shared/lib/date.ts`로 올려 재사용한다.

구현하며 정한 범위:

- JSON: 2칸/4칸/탭/압축, 키 정렬(배열 순서는 유지), 텍스트·트리 뷰(깊이 2까지 기본 펼침), 오류 줄·글자 + 캐럿 표시
- JWT: `Bearer ` 접두어 허용, JWE(5조각)는 안내 에러, 1초마다 만료 배지 갱신. **서명 검증은 하지 않는다**(화면에 명시)
- Base64/URL: URL-safe·패딩 옵션, 파일(5MB 이하) → data URI, 이미지 data URI 디코딩 시 미리보기,
  encodeURI/encodeURIComponent 선택, `+`→공백 옵션, URL 구성·파라미터 표

다음은 2절 "그다음 후보"에서 고른다. 체감상 **해시 생성기(하)**, **Cron 해석기(타임스탬프와 시너지)** 가 유력.
허브 SEO(`PAGE_SEO.tools`)의 title·keywords에는 아직 새 도구 3개가 반영돼 있지 않다.
