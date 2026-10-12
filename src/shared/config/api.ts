/**
 * simple-server(NestJS) 주소.
 * 로컬은 `npm run dev`(http://localhost:3030), 배포 빌드는 api.dahoon06.com 을 본다.
 * 다른 서버를 붙여 보고 싶으면 NEXT_PUBLIC_API_URL 로 덮어쓴다.
 */
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.NODE_ENV === "production"
        ? "https://api.dahoon06.com"
        : "http://localhost:3030");
