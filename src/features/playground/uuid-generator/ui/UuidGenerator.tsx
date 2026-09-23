import { useMemo, useState, type ReactElement } from "react";
import { Check, Copy, Download, RefreshCw } from "lucide-react";
import cn from "@shared/lib/cn";
import { useToast } from "@shared/hooks";
import { formatUuid, FORMAT_SAMPLE_UUID } from "../lib/format-uuid";
import {
    generateUuids,
    isNameBasedVersion,
    isValidUuid,
} from "../lib/generate-uuid";
import {
    MAX_UUID_COUNT,
    NAMESPACE_PRESETS,
    UUID_VERSIONS,
    type NamespacePreset,
    type UuidFormatOptions,
    type UuidVersion,
} from "../model/types";

const COUNT_PRESETS = [1, 5, 10, 50, 100];

const FORMAT_TOGGLES: { key: keyof UuidFormatOptions; label: string }[] = [
    { key: "uppercase", label: "대문자" },
    { key: "hyphens", label: "하이픈" },
    { key: "braces", label: "중괄호 { }" },
];

export const UuidGenerator = (): ReactElement => {
    const { toast } = useToast();

    const [version, setVersion] = useState<UuidVersion>("v4");
    const [count, setCount] = useState(5);
    const [format, setFormat] = useState<UuidFormatOptions>({
        uppercase: false,
        hyphens: true,
        braces: false,
    });

    const [namespacePreset, setNamespacePreset] =
        useState<NamespacePreset>("DNS");
    const [customNamespace, setCustomNamespace] = useState("");
    const [name, setName] = useState("");

    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const nameBased = isNameBasedVersion(version);
    const versionMeta = UUID_VERSIONS.find((item) => item.value === version);

    const namespaceValue =
        namespacePreset === "CUSTOM"
            ? customNamespace
            : (NAMESPACE_PRESETS.find((n) => n.value === namespacePreset)
                  ?.uuid ?? "");

    const formatted = useMemo(
        () => results.map((uuid) => formatUuid(uuid, format)),
        [results, format]
    );

    const sample = formatUuid(FORMAT_SAMPLE_UUID, format);

    const handleGenerate = () => {
        try {
            setError(null);
            setResults(
                generateUuids({
                    version,
                    count,
                    namespace: namespaceValue,
                    name,
                })
            );
        } catch (e) {
            setResults([]);
            setError(e instanceof Error ? e.message : "생성에 실패했어요.");
        }
    };

    const copy = async (text: string, index: number | null) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            window.setTimeout(() => setCopiedIndex(null), 1200);
            toast({
                title: "복사되었습니다.",
                description:
                    index === null
                        ? `${formatted.length}개의 UUID를 복사했어요.`
                        : text,
            });
        } catch {
            toast({
                title: "복사하지 못했어요.",
                description: "브라우저 클립보드 권한을 확인해 주세요.",
            });
        }
    };

    const handleDownload = () => {
        const blob = new Blob([formatted.join("\n")], {
            type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `uuid-${version}-${formatted.length}.txt`;
        anchor.click();
        URL.revokeObjectURL(url);
    };

    const handleCountChange = (value: number) => {
        if (Number.isNaN(value)) return setCount(1);
        setCount(Math.min(Math.max(value, 1), MAX_UUID_COUNT));
    };

    const namespaceInvalid =
        nameBased &&
        namespacePreset === "CUSTOM" &&
        customNamespace.trim().length > 0 &&
        !isValidUuid(customNamespace);

    return (
        <div className="flex flex-col gap-6">
            {/* 버전 선택 */}
            <section>
                <h2 className="mb-2 text-sm font-semibold text-zinc-900">
                    버전
                </h2>
                <div className="flex flex-wrap gap-2">
                    {UUID_VERSIONS.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => setVersion(item.value)}
                            className={cn(
                                "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                                version === item.value
                                    ? "border-zinc-900 bg-zinc-900 text-white"
                                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                {versionMeta && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                        {versionMeta.summary}
                    </p>
                )}
            </section>

            {/* 이름 기반(v3·v5) 입력 */}
            {nameBased && (
                <section className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                    <h2 className="mb-3 text-sm font-semibold text-zinc-900">
                        네임스페이스 · 이름
                    </h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                            {NAMESPACE_PRESETS.map((preset) => (
                                <button
                                    key={preset.value}
                                    type="button"
                                    onClick={() =>
                                        setNamespacePreset(preset.value)
                                    }
                                    className={cn(
                                        "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                                        namespacePreset === preset.value
                                            ? "border-zinc-900 bg-white text-zinc-900"
                                            : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900"
                                    )}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>

                        {namespacePreset === "CUSTOM" ? (
                            <input
                                value={customNamespace}
                                onChange={(e) =>
                                    setCustomNamespace(e.target.value)
                                }
                                placeholder="네임스페이스로 쓸 UUID를 입력"
                                className={cn(
                                    "h-11 w-full rounded-md border bg-white px-3 font-mono text-sm outline-none transition-colors focus:ring-2",
                                    namespaceInvalid
                                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                        : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-100"
                                )}
                            />
                        ) : (
                            <p className="font-mono text-xs text-zinc-500">
                                {namespaceValue}
                            </p>
                        )}

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름 (예: blog.dahoon06.com)"
                            className="h-11 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                        />
                        <p className="text-xs text-zinc-500">
                            같은 네임스페이스·이름이면 언제 생성하든 결과가 같기
                            때문에 개수 옵션은 쓰지 않아요.
                        </p>
                    </div>
                </section>
            )}

            {/* 개수 */}
            {!nameBased && (
                <section>
                    <h2 className="mb-2 text-sm font-semibold text-zinc-900">
                        개수
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                        {COUNT_PRESETS.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => setCount(preset)}
                                className={cn(
                                    "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                                    count === preset
                                        ? "border-zinc-900 bg-zinc-900 text-white"
                                        : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900"
                                )}
                            >
                                {preset}
                            </button>
                        ))}
                        <input
                            type="number"
                            min={1}
                            max={MAX_UUID_COUNT}
                            value={count}
                            onChange={(e) =>
                                handleCountChange(Number(e.target.value))
                            }
                            className="h-9 w-24 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                        />
                        <span className="text-xs text-zinc-400">
                            최대 {MAX_UUID_COUNT}개
                        </span>
                    </div>
                </section>
            )}

            {/* 표기 옵션 */}
            <section>
                <h2 className="mb-2 text-sm font-semibold text-zinc-900">
                    표기 형식
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                    {FORMAT_TOGGLES.map((toggle) => (
                        <button
                            key={toggle.key}
                            type="button"
                            aria-pressed={format[toggle.key]}
                            onClick={() =>
                                setFormat((prev) => ({
                                    ...prev,
                                    [toggle.key]: !prev[toggle.key],
                                }))
                            }
                            className={cn(
                                "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                                format[toggle.key]
                                    ? "border-zinc-900 bg-zinc-900 text-white"
                                    : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900"
                            )}
                        >
                            {toggle.label}
                        </button>
                    ))}
                </div>
                <p className="mt-2 font-mono text-xs text-zinc-500">{sample}</p>
            </section>

            {/* 실행 */}
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={handleGenerate}
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                >
                    <RefreshCw size={15} />
                    생성하기
                </button>
                {formatted.length > 0 && (
                    <>
                        <button
                            type="button"
                            onClick={() => copy(formatted.join("\n"), null)}
                            className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                        >
                            <Copy size={15} />
                            전체 복사
                        </button>
                        <button
                            type="button"
                            onClick={handleDownload}
                            className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                        >
                            <Download size={15} />
                            .txt 저장
                        </button>
                    </>
                )}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* 결과 */}
            <section>
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900">
                        결과
                    </h2>
                    {formatted.length > 0 && (
                        <span className="text-xs text-zinc-400">
                            {formatted.length}개
                        </span>
                    )}
                </div>

                {formatted.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-200 px-4 py-10 text-center text-sm text-zinc-400">
                        생성하기를 누르면 여기에 UUID가 표시돼요.
                    </div>
                ) : (
                    <ul className="max-h-[420px] divide-y divide-zinc-100 overflow-y-auto rounded-xl border border-zinc-200">
                        {formatted.map((uuid, index) => (
                            <li
                                key={`${uuid}-${index}`}
                                className="flex items-center justify-between gap-3 bg-white px-4 py-2.5"
                            >
                                <code className="min-w-0 break-all font-mono text-sm text-zinc-800">
                                    {uuid}
                                </code>
                                <button
                                    type="button"
                                    onClick={() => copy(uuid, index)}
                                    aria-label="복사"
                                    className="shrink-0 rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                                >
                                    {copiedIndex === index ? (
                                        <Check size={14} />
                                    ) : (
                                        <Copy size={14} />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default UuidGenerator;
