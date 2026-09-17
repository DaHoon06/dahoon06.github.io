import { CodeBlock } from "notion-types";
import { getBlockTitle } from "notion-utils";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Text, useNotionContext } from "react-notion-x";
import { Code as NotionXCode } from "react-notion-x/build/third-party/code";

type Props = {
    block: CodeBlock;
    defaultLanguage?: string;
    className?: string;
};

/**
 * 코드 블록 — macOS 창 느낌의 헤더(신호등 + Copy)와 왼쪽 줄 번호를 붙인다.
 *
 * 하이라이팅 자체는 react-notion-x의 Code(prism)에 그대로 맡기고,
 * 그 <pre>를 우리 래퍼 안에 넣어 크롬만 덧입힌다. 언어 문법을 직접
 * 들고 오지 않아도 되고, 토큰 span이 줄 단위로 쪼개지지도 않는다.
 *
 * 줄 번호는 <pre> 바깥(가로 스크롤 영역 밖)에 두어 코드가 가로로
 * 밀려도 번호는 제자리에 남는다. 세로 스크롤은 .notion-code-window__body가
 * 담당하고 <pre>는 가로만 스크롤한다 (아래 _notion.scss 참고).
 */
const NotionCodeBlock: FC<Props> = ({ block, defaultLanguage, className }) => {
    const { recordMap } = useNotionContext();
    const content = getBlockTitle(block, recordMap) || "";

    const language = (
        block.properties?.language?.[0]?.[0] ||
        defaultLanguage ||
        ""
    ).toLowerCase();

    const [isCopied, setIsCopied] = useState(false);
    const copyTimeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            if (copyTimeout.current) clearTimeout(copyTimeout.current);
        };
    }, []);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(content);
        } catch {
            // 클립보드 API를 못 쓰는 환경(비 HTTPS 등) 폴백
            const textarea = document.createElement("textarea");
            textarea.value = content;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }

        setIsCopied(true);
        if (copyTimeout.current) clearTimeout(copyTimeout.current);
        copyTimeout.current = setTimeout(() => setIsCopied(false), 1200);
    }, [content]);

    /**
     * mermaid는 use-mermaid-effect가 .language-mermaid 엘리먼트의 innerHTML을
     * 다이어그램 SVG로 갈아끼운다. 다이어그램에 신호등·줄 번호를 붙이면
     * 어색하므로 크롬 없이 원본 그대로 렌더한다.
     */
    if (language === "mermaid") {
        return (
            <NotionXCode
                block={block}
                defaultLanguage={defaultLanguage}
                className={className}
            />
        );
    }

    const lineCount = Math.max(
        content.replace(/\n+$/, "").split("\n").length,
        1
    );

    const caption = block.properties?.caption;

    return (
        <>
            <div className="notion-code-window">
                <div className="notion-code-window__header">
                    <span
                        className="notion-code-window__dots"
                        aria-hidden="true"
                    >
                        <i />
                        <i />
                        <i />
                    </span>
                    <button
                        type="button"
                        className="notion-code-window__copy"
                        onClick={handleCopy}
                        aria-label="코드 복사"
                    >
                        {isCopied ? "Copied" : "Copy"}
                    </button>
                </div>

                <div className="notion-code-window__body">
                    <span
                        className="notion-code-window__gutter"
                        aria-hidden="true"
                    >
                        {Array.from({ length: lineCount }, (_, index) => (
                            <span key={index}>{index + 1}</span>
                        ))}
                    </span>
                    <NotionXCode
                        block={block}
                        defaultLanguage={defaultLanguage}
                        className={className}
                    />
                </div>
            </div>

            {caption && (
                /**
                 * NotionXCode도 캡션을 <figcaption>으로 같이 뱉지만, 그건
                 * 코드와 같은 flex row 안에 들어가 버려서 CSS로 숨기고
                 * 창 바깥인 여기서 다시 그린다.
                 */
                <figcaption className="notion-asset-caption notion-code-window__caption">
                    <Text value={caption} block={block} />
                </figcaption>
            )}
        </>
    );
};

export default NotionCodeBlock;
