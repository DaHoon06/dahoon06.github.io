import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { FC } from "react";
import { NotionRenderer as _NotionRenderer } from "react-notion-x";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import Code from "./NotionCodeBlock";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

// 본문은 반드시 SSR 한다 — 정적 HTML 에 글 내용이 있어야 검색 로봇·AdSense 심사 크롤러가
// 본문을 수집한다. 예전엔 next/dynamic 으로 감쌌는데, CI 정적 빌드에서 일부 페이지가
// 로더 미해결 상태(null)로 렌더돼 본문 없이 배포됐다. 그래서 본문 경로는 정적 import 한다.
// (Pdf·Modal 은 브라우저 전용이라 ssr: false dynamic 유지)
const Pdf = dynamic(
    () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
    {
        ssr: false,
    }
);
const Modal = dynamic(
    () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
    {
        ssr: false,
    }
);

const mapPageUrl = (id: string) => {
    return "https://www.notion.so/" + id.replace(/-/g, "");
};

type Props = {
    recordMap: ExtendedRecordMap;
};

const NotionRenderer: FC<Props> = ({ recordMap }) => {
    return (
        <_NotionRenderer
            recordMap={recordMap}
            components={{
                Code,
                Collection,
                Equation,
                Modal,
                Pdf,
                nextImage: Image,
                nextLink: Link,
            }}
            className="text-[#333]"
            mapPageUrl={mapPageUrl}
        />
    );
};

export default NotionRenderer;
