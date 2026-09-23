import { useState, type ReactElement } from "react";
import { ChevronRight } from "lucide-react";
import cn from "@shared/lib/cn";
import type { JsonValue } from "../model/types";

/** 이 깊이까지는 처음부터 펼쳐 둔다 */
const DEFAULT_OPEN_DEPTH = 2;

type JsonTreeNodeProps = {
    name: string | number | null;
    value: JsonValue;
    depth: number;
    isLast: boolean;
};

const PrimitiveValue = ({ value }: { value: JsonValue }): ReactElement => {
    if (value === null) return <span className="text-zinc-400">null</span>;
    if (typeof value === "string") {
        return (
            <span className="break-all text-emerald-700">
                {JSON.stringify(value)}
            </span>
        );
    }
    if (typeof value === "number") {
        return <span className="text-sky-700">{value}</span>;
    }
    return <span className="text-violet-700">{String(value)}</span>;
};

const KeyLabel = ({ name }: { name: JsonTreeNodeProps["name"] }) => {
    if (name === null) return null;
    return (
        <>
            {typeof name === "number" ? (
                <span className="text-zinc-400">{name}</span>
            ) : (
                <span className="text-zinc-800">{JSON.stringify(name)}</span>
            )}
            <span className="text-zinc-400">: </span>
        </>
    );
};

const JsonTreeNode = ({
    name,
    value,
    depth,
    isLast,
}: JsonTreeNodeProps): ReactElement => {
    const [open, setOpen] = useState(depth < DEFAULT_OPEN_DEPTH);
    const comma = isLast ? null : <span className="text-zinc-400">,</span>;

    if (value === null || typeof value !== "object") {
        return (
            <div className="pl-5">
                <KeyLabel name={name} />
                <PrimitiveValue value={value} />
                {comma}
            </div>
        );
    }

    const isArray = Array.isArray(value);
    const entries: [string | number, JsonValue][] = isArray
        ? value.map((item, index) => [index, item])
        : Object.entries(value);
    const [openBracket, closeBracket] = isArray ? ["[", "]"] : ["{", "}"];

    if (entries.length === 0) {
        return (
            <div className="pl-5">
                <KeyLabel name={name} />
                <span className="text-zinc-500">
                    {openBracket}
                    {closeBracket}
                </span>
                {comma}
            </div>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                className="group flex w-full items-start text-left"
            >
                <ChevronRight
                    size={14}
                    className={cn(
                        "mr-1 mt-[3px] shrink-0 text-zinc-400 transition-transform group-hover:text-zinc-900",
                        open && "rotate-90"
                    )}
                />
                <span>
                    <KeyLabel name={name} />
                    <span className="text-zinc-500">{openBracket}</span>
                    {!open && (
                        <>
                            <span className="mx-1 rounded bg-zinc-100 px-1.5 text-[11px] text-zinc-500">
                                {entries.length}
                                {isArray ? " items" : " keys"}
                            </span>
                            <span className="text-zinc-500">
                                {closeBracket}
                            </span>
                            {comma}
                        </>
                    )}
                </span>
            </button>
            {open && (
                <>
                    <div className="ml-[6px] border-l border-zinc-100 pl-2">
                        {entries.map(([key, child], index) => (
                            <JsonTreeNode
                                key={key}
                                name={key}
                                value={child}
                                depth={depth + 1}
                                isLast={index === entries.length - 1}
                            />
                        ))}
                    </div>
                    <div className="pl-5 text-zinc-500">
                        {closeBracket}
                        {comma}
                    </div>
                </>
            )}
        </div>
    );
};

export const JsonTree = ({ value }: { value: JsonValue }): ReactElement => (
    <div className="font-mono text-[13px] leading-6">
        <JsonTreeNode name={null} value={value} depth={0} isLast />
    </div>
);

export default JsonTree;
