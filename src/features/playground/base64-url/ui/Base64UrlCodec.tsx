import { useMemo, useRef, useState, type ReactElement } from "react";
import { ArrowDownUp, Check, CircleAlert, Copy, ImageUp } from "lucide-react";
import cn from "@shared/lib/cn";
import { useToast } from "@shared/hooks";
import { decodeBase64, encodeBase64 } from "@shared/lib/base64";
import { fileToDataUri, isImageDataUri } from "../lib/file-to-data-uri";
import { decodeUrl, encodeUrl, parseUrl } from "../lib/url-codec";
import {
    MAX_FILE_BYTES,
    type CodecDirection,
    type CodecTab,
    type UrlEncodeScope,
} from "../model/types";

const TABS: { value: CodecTab; label: string }[] = [
    { value: "base64", label: "Base64" },
    { value: "url", label: "URL" },
];

const chipClass = (active: boolean) =>
    cn(
        "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
        active
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900"
    );

type Output = { ok: true; text: string } | { ok: false; message: string };

export const Base64UrlCodec = (): ReactElement => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [tab, setTab] = useState<CodecTab>("base64");
    const [direction, setDirection] = useState<CodecDirection>("encode");
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);

    // Base64 옵션
    const [urlSafe, setUrlSafe] = useState(false);
    const [padding, setPadding] = useState(true);
    const [fileName, setFileName] = useState<string | null>(null);

    // URL 옵션
    const [scope, setScope] = useState<UrlEncodeScope>("component");
    const [plusAsSpace, setPlusAsSpace] = useState(true);

    /**
     * 이미지 미리보기 대상.
     * - 인코딩: 올린 파일이 이미지면 만들어진 data URI
     * - 디코딩: 입력이 이미지 data URI면 그 자체 (바이너리라 텍스트로는 못 푼다)
     */
    const previewSrc =
        tab === "base64" && isImageDataUri(input) ? input.trim() : null;
    const decodingImage = direction === "decode" && previewSrc !== null;

    const output = useMemo<Output | null>(() => {
        if (!input || decodingImage) return null;
        if (fileName !== null) return { ok: true, text: input };
        try {
            if (tab === "base64") {
                if (direction === "encode") {
                    return {
                        ok: true,
                        text: encodeBase64(input, { urlSafe, padding }),
                    };
                }
                // data URI면 헤더(`data:...;base64,`)를 떼고 디코딩
                const body = input.replace(/^data:[^,]*;base64,/i, "");
                return { ok: true, text: decodeBase64(body) };
            }
            return {
                ok: true,
                text:
                    direction === "encode"
                        ? encodeUrl(input, scope)
                        : decodeUrl(input, plusAsSpace),
            };
        } catch (e) {
            return {
                ok: false,
                message: e instanceof Error ? e.message : "변환에 실패했어요.",
            };
        }
    }, [
        input,
        tab,
        direction,
        urlSafe,
        padding,
        scope,
        plusAsSpace,
        fileName,
        decodingImage,
    ]);

    // URL 탭: 디코딩한 결과(또는 인코딩 전 원문)를 파싱해 파라미터 표로 보여준다
    const parsedUrl = useMemo(() => {
        if (tab !== "url") return null;
        const plain =
            direction === "decode" ? (output?.ok ? output.text : "") : input;
        return parseUrl(plain);
    }, [tab, direction, input, output]);

    const resetInput = () => {
        setInput("");
        setFileName(null);
    };

    const handleTab = (next: CodecTab) => {
        setTab(next);
        resetInput();
    };

    const handleDirection = (next: CodecDirection) => {
        setDirection(next);
        setFileName(null);
    };

    /** 결과를 입력으로 넘기고 방향을 뒤집는다 */
    const handleSwap = () => {
        if (!output?.ok || fileName !== null) return;
        setInput(output.text);
        setDirection((prev) => (prev === "encode" ? "decode" : "encode"));
    };

    const handleFile = async (file: File | undefined) => {
        if (!file) return;
        if (file.size > MAX_FILE_BYTES) {
            toast({
                title: "파일이 너무 커요.",
                description: `${MAX_FILE_BYTES / 1024 / 1024}MB 이하 파일만 변환할 수 있어요.`,
            });
            return;
        }
        const dataUri = await fileToDataUri(file);
        setDirection("encode");
        setFileName(file.name);
        setInput(dataUri);
    };

    const handleCopy = async () => {
        if (!output?.ok) return;
        try {
            await navigator.clipboard.writeText(output.text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
            toast({
                title: "복사되었습니다.",
                description: `${output.text.length.toLocaleString()}자`,
            });
        } catch {
            toast({
                title: "복사하지 못했어요.",
                description: "브라우저 클립보드 권한을 확인해 주세요.",
            });
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {/* 탭 */}
            <div className="flex border-b border-zinc-200">
                {TABS.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() => handleTab(item.value)}
                        className={cn(
                            "-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors",
                            tab === item.value
                                ? "border-zinc-900 text-zinc-900"
                                : "border-transparent text-zinc-400 hover:text-zinc-700"
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* 방향 + 옵션 */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex rounded-lg border border-zinc-200 p-0.5">
                    {(["encode", "decode"] as const).map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => handleDirection(value)}
                            className={cn(
                                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                                direction === value
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-500 hover:text-zinc-900"
                            )}
                        >
                            {value === "encode" ? "인코딩" : "디코딩"}
                        </button>
                    ))}
                </div>

                {tab === "base64" && direction === "encode" && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            aria-pressed={urlSafe}
                            onClick={() => setUrlSafe((prev) => !prev)}
                            className={chipClass(urlSafe)}
                        >
                            URL-safe (- _)
                        </button>
                        <button
                            type="button"
                            aria-pressed={padding}
                            onClick={() => setPadding((prev) => !prev)}
                            className={chipClass(padding)}
                        >
                            패딩 =
                        </button>
                    </div>
                )}

                {tab === "url" && direction === "encode" && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setScope("component")}
                            className={chipClass(scope === "component")}
                        >
                            값 하나 (encodeURIComponent)
                        </button>
                        <button
                            type="button"
                            onClick={() => setScope("uri")}
                            className={chipClass(scope === "uri")}
                        >
                            URL 전체 (encodeURI)
                        </button>
                    </div>
                )}

                {tab === "url" && direction === "decode" && (
                    <button
                        type="button"
                        aria-pressed={plusAsSpace}
                        onClick={() => setPlusAsSpace((prev) => !prev)}
                        className={chipClass(plusAsSpace)}
                    >
                        + 를 공백으로
                    </button>
                )}
            </div>

            {/* 입력 */}
            <section>
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900">
                        입력
                    </h2>
                    {tab === "base64" && (
                        <>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-zinc-900"
                            >
                                <ImageUp size={13} />
                                파일 → data URI
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    void handleFile(e.target.files?.[0]);
                                    e.target.value = "";
                                }}
                            />
                        </>
                    )}
                </div>

                {fileName !== null ? (
                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 py-3 text-sm">
                        <span className="min-w-0 truncate font-medium text-zinc-700">
                            {fileName}
                        </span>
                        <button
                            type="button"
                            onClick={resetInput}
                            className="shrink-0 text-xs font-medium text-zinc-400 hover:text-zinc-900"
                        >
                            지우기
                        </button>
                    </div>
                ) : (
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck={false}
                        placeholder={
                            tab === "base64"
                                ? direction === "encode"
                                    ? "인코딩할 텍스트"
                                    : "Base64 문자열 또는 data URI"
                                : direction === "encode"
                                  ? "https://example.com/search?q=한글 검색"
                                  : "https%3A%2F%2Fexample.com%2F%3Fq%3D..."
                        }
                        className={cn(
                            "h-40 w-full resize-y rounded-xl border bg-white p-3 font-mono text-[13px] leading-6 outline-none transition-colors focus:ring-2",
                            output && !output.ok
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-100"
                        )}
                    />
                )}

                {output && !output.ok && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                        <CircleAlert size={15} className="shrink-0" />
                        {output.message}
                    </p>
                )}
            </section>

            {/* 결과 */}
            <section>
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900">
                        결과
                    </h2>
                    <div className="flex items-center gap-2">
                        {output?.ok && (
                            <span className="text-xs text-zinc-400">
                                {output.text.length.toLocaleString()}자
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={handleSwap}
                            disabled={!output?.ok || fileName !== null}
                            aria-label="결과를 입력으로 옮기고 방향 바꾸기"
                            title="결과를 입력으로 옮기고 방향 바꾸기"
                            className="rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 disabled:opacity-40"
                        >
                            <ArrowDownUp size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={handleCopy}
                            disabled={!output?.ok}
                            aria-label="결과 복사"
                            className="rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 disabled:opacity-40"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>

                {previewSrc && (
                    // eslint-disable-next-line @next/next/no-img-element -- data URI 미리보기라 next/image 최적화 대상이 아니다
                    <img
                        src={previewSrc}
                        alt="미리보기"
                        className="mb-3 max-h-64 rounded-xl border border-zinc-200 bg-[repeating-conic-gradient(#f4f4f5_0_25%,#fff_0_50%)] bg-[length:16px_16px] object-contain"
                    />
                )}

                {output?.ok ? (
                    <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap break-all rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 font-mono text-[13px] leading-6 text-zinc-800">
                        {output.text}
                    </pre>
                ) : (
                    !previewSrc && (
                        <div className="rounded-xl border border-dashed border-zinc-200 px-4 py-10 text-center text-sm text-zinc-400">
                            입력하는 즉시 여기에 변환돼요.
                        </div>
                    )
                )}
            </section>

            {/* URL 파라미터 */}
            {parsedUrl && (
                <section>
                    <h2 className="mb-2 text-sm font-semibold text-zinc-900">
                        URL 구성
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-zinc-200">
                        <table className="w-full text-left text-sm">
                            <tbody className="divide-y divide-zinc-100">
                                {(
                                    [
                                        ["origin", parsedUrl.origin],
                                        ["path", parsedUrl.pathname],
                                        ["hash", parsedUrl.hash],
                                    ] as const
                                )
                                    .filter(([, value]) => value)
                                    .map(([label, value]) => (
                                        <tr
                                            key={label}
                                            className="bg-zinc-50/60"
                                        >
                                            <td className="w-1/3 px-4 py-2 text-xs font-medium text-zinc-400">
                                                {label}
                                            </td>
                                            <td className="break-all px-4 py-2 font-mono text-[13px] text-zinc-700">
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                {parsedUrl.params.map((param, index) => (
                                    <tr key={`${param.key}-${index}`}>
                                        <td className="w-1/3 break-all px-4 py-2 font-mono text-[13px] font-semibold text-zinc-900">
                                            {param.key}
                                        </td>
                                        <td className="break-all px-4 py-2 font-mono text-[13px] text-zinc-700">
                                            {param.value || (
                                                <span className="text-zinc-300">
                                                    (빈 값)
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {parsedUrl.params.length === 0 && (
                        <p className="mt-2 text-xs text-zinc-400">
                            쿼리 파라미터가 없어요.
                        </p>
                    )}
                </section>
            )}
        </div>
    );
};

export default Base64UrlCodec;
