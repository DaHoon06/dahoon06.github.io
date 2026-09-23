import { useMemo, useState, type ReactElement } from "react";
import {
    AlignLeft,
    Check,
    CircleAlert,
    Copy,
    Minimize2,
    Trash2,
} from "lucide-react";
import cn from "@shared/lib/cn";
import { useToast } from "@shared/hooks";
import {
    byteLength,
    formatBytes,
    formatJson,
    minifyJson,
    sortJsonKeys,
} from "../lib/format-json";
import { parseJson } from "../lib/parse-json";
import {
    JSON_INDENT_OPTIONS,
    type JsonIndent,
    type JsonViewMode,
} from "../model/types";
import JsonTree from "./JsonTree";

const SAMPLE_JSON = `{"id":1024,"title":"JSON 포맷터","published":true,"tags":["tools","json"],"author":{"name":"dahoon06","links":{"blog":"https://blog.dahoon06.com"}},"views":null}`;

const chipClass = (active: boolean) =>
    cn(
        "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
        active
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900"
    );

const actionClass =
    "inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-200 px-3.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-40";

export const JsonFormatter = (): ReactElement => {
    const { toast } = useToast();

    const [input, setInput] = useState("");
    const [indent, setIndent] = useState<JsonIndent>(2);
    const [sortKeys, setSortKeys] = useState(false);
    const [view, setView] = useState<JsonViewMode>("text");
    const [minified, setMinified] = useState(false);
    const [copied, setCopied] = useState(false);

    const result = useMemo(
        () => (input.trim() ? parseJson(input) : null),
        [input]
    );

    const output = useMemo(() => {
        if (!result?.ok) return "";
        return minified
            ? minifyJson(result.value, sortKeys)
            : formatJson(result.value, indent, sortKeys);
    }, [result, minified, indent, sortKeys]);

    const treeValue = useMemo(() => {
        if (!result?.ok) return null;
        return sortKeys ? sortJsonKeys(result.value) : result.value;
    }, [result, sortKeys]);

    const errorLine = result && !result.ok ? result.error.line : null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
            toast({
                title: "복사되었습니다.",
                description: formatBytes(byteLength(output)),
            });
        } catch {
            toast({
                title: "복사하지 못했어요.",
                description: "브라우저 클립보드 권한을 확인해 주세요.",
            });
        }
    };

    /** 결과를 입력창에 되돌려 넣는다 — 이어서 편집할 때 */
    const applyToInput = (nextMinified: boolean) => {
        if (!result?.ok) return;
        setMinified(nextMinified);
        setInput(
            nextMinified
                ? minifyJson(result.value, sortKeys)
                : formatJson(result.value, indent, sortKeys)
        );
    };

    return (
        <div className="flex flex-col gap-5">
            {/* 옵션 */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-900">
                        들여쓰기
                    </span>
                    {JSON_INDENT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                setIndent(option.value);
                                setMinified(false);
                            }}
                            className={chipClass(
                                !minified && indent === option.value
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => setMinified(true)}
                        className={chipClass(minified)}
                    >
                        압축
                    </button>
                </div>
                <button
                    type="button"
                    aria-pressed={sortKeys}
                    onClick={() => setSortKeys((prev) => !prev)}
                    className={chipClass(sortKeys)}
                >
                    키 정렬 A→Z
                </button>
            </div>

            {/* 입력 */}
            <section>
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900">
                        입력
                    </h2>
                    <div className="flex items-center gap-3 text-xs">
                        {!input && (
                            <button
                                type="button"
                                onClick={() => setInput(SAMPLE_JSON)}
                                className="font-medium text-zinc-400 hover:text-zinc-900"
                            >
                                예시 넣기
                            </button>
                        )}
                        {input && (
                            <span className="text-zinc-400">
                                {formatBytes(byteLength(input))}
                            </span>
                        )}
                    </div>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    spellCheck={false}
                    placeholder='{"hello": "world"}'
                    className={cn(
                        "h-56 w-full resize-y rounded-xl border bg-white p-3 font-mono text-[13px] leading-6 outline-none transition-colors focus:ring-2",
                        result && !result.ok
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-100"
                    )}
                />

                {result && !result.ok && (
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        <CircleAlert size={15} className="mt-0.5 shrink-0" />
                        <div className="min-w-0">
                            <div className="font-medium">
                                유효하지 않은 JSON
                                {errorLine !== null &&
                                    ` — ${errorLine}번째 줄, ${result.error.column}번째 글자`}
                            </div>
                            <div className="break-all font-mono text-xs text-red-600/80">
                                {result.error.message}
                            </div>
                            {errorLine !== null && (
                                <pre className="mt-1.5 overflow-x-auto rounded bg-white/70 px-2 py-1 font-mono text-xs text-red-800">
                                    {input.split("\n")[errorLine - 1]}
                                    {"\n"}
                                    {" ".repeat(
                                        Math.max(
                                            0,
                                            (result.error.column ?? 1) - 1
                                        )
                                    )}
                                    ^
                                </pre>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => applyToInput(false)}
                        disabled={!result?.ok}
                        className={actionClass}
                    >
                        <AlignLeft size={15} />
                        입력창 정리
                    </button>
                    <button
                        type="button"
                        onClick={() => applyToInput(true)}
                        disabled={!result?.ok}
                        className={actionClass}
                    >
                        <Minimize2 size={15} />
                        입력창 압축
                    </button>
                    <button
                        type="button"
                        onClick={() => setInput("")}
                        disabled={!input}
                        className={actionClass}
                    >
                        <Trash2 size={15} />
                        비우기
                    </button>
                </div>
            </section>

            {/* 결과 */}
            <section>
                <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-semibold text-zinc-900">
                            결과
                        </h2>
                        {result?.ok && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                                <Check size={12} />
                                유효한 JSON
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex rounded-lg border border-zinc-200 p-0.5">
                            {(["text", "tree"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => setView(mode)}
                                    className={cn(
                                        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                                        view === mode
                                            ? "bg-zinc-900 text-white"
                                            : "text-zinc-500 hover:text-zinc-900"
                                    )}
                                >
                                    {mode === "text" ? "텍스트" : "트리"}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            disabled={!output}
                            aria-label="결과 복사"
                            className="rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 disabled:opacity-40"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>

                {!result?.ok ? (
                    <div className="rounded-xl border border-dashed border-zinc-200 px-4 py-10 text-center text-sm text-zinc-400">
                        {result
                            ? "입력을 고치면 여기에 결과가 표시돼요."
                            : "JSON을 붙여 넣으면 바로 정리돼요."}
                    </div>
                ) : view === "text" ? (
                    <pre className="max-h-[520px] overflow-auto rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 font-mono text-[13px] leading-6 text-zinc-800">
                        {output}
                    </pre>
                ) : (
                    <div className="max-h-[520px] overflow-auto rounded-xl border border-zinc-200 bg-white p-3">
                        <JsonTree value={treeValue ?? null} />
                    </div>
                )}
            </section>
        </div>
    );
};

export default JsonFormatter;
