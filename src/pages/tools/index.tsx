import type { NextPage } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOL_ITEMS } from "@shared/config/tools";
import { PAGE_SEO, SITE, breadcrumbJsonLd, toAbsoluteUrl } from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";

const toolsJsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: PAGE_SEO.tools.title,
        description: PAGE_SEO.tools.description,
        url: toAbsoluteUrl(PAGE_SEO.tools.path),
        inLanguage: "ko-KR",
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        hasPart: TOOL_ITEMS.map((tool) => ({
            "@type": "WebApplication",
            name: tool.title,
            description: tool.description,
            url: toAbsoluteUrl(tool.href),
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
        })),
    },
    breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "개발 도구", path: PAGE_SEO.tools.path },
    ]),
];

const ToolsPage: NextPage = () => {
    return (
        <>
            <SeoHead {...PAGE_SEO.tools} jsonLd={toolsJsonLd} />
            <BaseLayout>
                <header className="mb-8">
                    <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                        Tools
                    </div>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                        작업하다 자주 찾게 되는 도구들
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        매번 검색해서 쓰던 것들을 직접 만들어 모아 뒀어요.
                        입력한 값은 서버로 보내지 않고 브라우저 안에서만
                        처리돼요.
                    </p>
                </header>

                <section className="grid gap-4 sm:grid-cols-2">
                    {TOOL_ITEMS.map((tool) => {
                        const Icon = tool.icon;

                        return (
                            <Link
                                key={tool.key}
                                href={tool.href}
                                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white">
                                        <Icon size={18} />
                                    </span>
                                    <ArrowRight
                                        size={16}
                                        className="mt-1 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-900"
                                    />
                                </div>

                                <div className="text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                                    {tool.eyebrow}
                                </div>
                                <h2 className="mt-1 text-base font-bold text-zinc-900">
                                    {tool.title}
                                </h2>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                                    {tool.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {tool.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        );
                    })}
                </section>
            </BaseLayout>
        </>
    );
};

export default ToolsPage;
