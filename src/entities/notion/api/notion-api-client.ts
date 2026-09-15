import { NotionAPI } from "notion-client";

// Notion(Cloudflare)은 User-Agent가 없는 요청을 봇으로 보고 403(HTML 차단 페이지)을 반환한다.
// notion-client는 기본 UA를 붙이지 않으므로 브라우저 UA를 직접 지정한다.
const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export const createNotionClient = () =>
    new NotionAPI({
        ofetchOptions: {
            headers: {
                "user-agent": USER_AGENT,
            },
        },
    });
