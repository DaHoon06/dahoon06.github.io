"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BsListNested } from "react-icons/bs";
import { FaAngleUp } from "react-icons/fa6";

type TocItem = {
    id: string;
    text: string;
    level: number;
    node: HTMLElement;
};

export const TableOfContents = () => {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const mutationObserverRef = useRef<MutationObserver | null>(null);

    const containerSelectors = [".notion", "main"];

    const findContainer = () => {
        for (const s of containerSelectors) {
            const el = document.querySelector(s);
            if (el) return el;
        }
        // fallback: body
        return document.body;
    };

    const buildToc = useCallback(() => {
        const container = findContainer();
        if (!container) return [];

        // h2, h3, h4만 수집
        const headingNodes = Array.from(
            container.querySelectorAll("h2, h3, h4")
        ) as HTMLElement[];

        const items: TocItem[] = headingNodes.map((heading) => {
            if (!heading.id) {
                const base =
                    heading.textContent
                        ?.trim()
                        .slice(0, 80)
                        .replace(/\s+/g, "-")
                        .toLowerCase() || "heading";

                heading.id = `${base}-${Math.random().toString(36).slice(2, 7)}`;
            }
            return {
                id: heading.id,
                text: heading.textContent?.trim() || "",
                level: Number(heading.tagName.replace("H", "")),
                node: heading,
            };
        });

        setToc(items);
        return items;
    }, []);

    const observeHeadings = useCallback(
        (items: TocItem[]) => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }

            const io = new IntersectionObserver(
                (entries) => {
                    const visible = entries
                        .filter((e) => e.isIntersecting)
                        .sort(
                            (a, b) =>
                                a.boundingClientRect.top -
                                b.boundingClientRect.top
                        );

                    if (visible.length > 0) {
                        if (visible[0]?.target.id) {
                            setActiveId(visible[0].target.id);
                        }
                    }
                },
                {
                    root: null,
                    rootMargin: "0px 0px -70% 0px",
                    threshold: [0, 0.1, 0.5, 1],
                }
            );

            items.forEach((it) => io.observe(it.node));
            observerRef.current = io;
        },
        [setActiveId]
    );

    const observeMutations = useCallback(() => {
        if (mutationObserverRef.current) return;

        const container = findContainer();
        if (!container) return;

        const mo = new MutationObserver((mutations) => {
            clearTimeout((observeMutations as any)._timer);
            (observeMutations as any)._timer = setTimeout(() => {
                const items = buildToc();
                if (items.length > 0) observeHeadings(items);
            }, 120);
        });

        mo.observe(container, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        mutationObserverRef.current = mo;
    }, [buildToc, observeHeadings]);

    useEffect(() => {
        const items = buildToc();
        if (items.length > 0) {
            observeHeadings(items);
        } else {
            observeMutations();
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            if (mutationObserverRef.current) {
                mutationObserverRef.current.disconnect();
                mutationObserverRef.current = null;
            }
        };
    }, [buildToc, observeHeadings, observeMutations]);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const headerOffset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elemRect = el.getBoundingClientRect().top;
        const offset = elemRect - bodyRect - headerOffset;

        window.scrollTo({
            top: offset,
            behavior: "smooth",
        });

        // 포커스(접근성)
        el.focus?.();
    };

    return (
        <nav
            className={`hidden md:block fixed top-20 right-4 max-h-[80vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ${
                isCollapsed ? "w-14" : "w-64"
            }`}
        >
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                {!isCollapsed && (
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        목차
                    </h3>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isCollapsed ? "mx-auto" : ""
                    }`}
                    aria-label={isCollapsed ? "목차 펼치기" : "목차 접기"}
                >
                    {isCollapsed ? (
                        <BsListNested
                            className="text-gray-500 transition-transform"
                            size={24}
                        />
                    ) : (
                        <FaAngleUp
                            className="text-gray-500 transition-transform"
                            size={18}
                        />
                    )}
                </button>
            </div>
            {!isCollapsed && (
                <div className="p-4">
                    {toc.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            헤딩이 없습니다.
                        </p>
                    ) : (
                        <ul className="space-y-1 text-sm">
                            {toc.map((t) => (
                                <li
                                    key={t.id}
                                    style={{
                                        marginLeft: `${(t.level - 2) * 12}px`,
                                    }}
                                    className={`cursor-pointer truncate rounded px-1 py-0.5 transition-colors ${
                                        activeId === t.id
                                            ? "text-primary-000 font-medium"
                                            : "text-gray-700 hover:text-primary-000"
                                    }`}
                                    onClick={() => handleClick(t.id)}
                                >
                                    {t.text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </nav>
    );
};
