import type { NextPage } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JsonFormatter } from "@features/playground/json-formatter";
import { ROUTES } from "@shared/routes";
import {
    PAGE_SEO,
    breadcrumbJsonLd,
    webApplicationJsonLd,
} from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";

const seo = PAGE_SEO.jsonFormatter;

const jsonLd = [
    webApplicationJsonLd(seo, "JSON 포맷터"),
    breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "개발 도구", path: PAGE_SEO.tools.path },
        { name: "JSON 포맷터", path: seo.path },
    ]),
];

const JsonFormatterPage: NextPage = () => {
    return (
        <>
            <SeoHead {...seo} jsonLd={jsonLd} />
            <BaseLayout>
                <header className="mb-6">
                    <Link
                        href={ROUTES.TOOLS}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-900"
                    >
                        <ChevronLeft size={13} />
                        Tools
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                        JSON Formatter
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        붙여 넣는 즉시 정리하고 검사해요. 사내 API 응답을 넣어도
                        괜찮도록, 모든 처리는 브라우저 안에서만 이루어지고
                        서버로 전송되지 않아요.
                    </p>
                </header>

                <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                    <JsonFormatter />
                </section>
            </BaseLayout>
        </>
    );
};

export default JsonFormatterPage;
