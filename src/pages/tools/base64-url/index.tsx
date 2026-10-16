import type { NextPage } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Base64UrlCodec } from "@features/playground/base64-url";
import { ROUTES } from "@shared/routes";
import {
    PAGE_SEO,
    breadcrumbJsonLd,
    webApplicationJsonLd,
} from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";

const seo = PAGE_SEO.base64Url;

const jsonLd = [
    webApplicationJsonLd(seo, "Base64 · URL 인코더"),
    breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "개발 도구", path: PAGE_SEO.tools.path },
        { name: "Base64 · URL 인코더", path: seo.path },
    ]),
];

const Base64UrlPage: NextPage = () => {
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
                        Base64 · URL Encoder
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        텍스트는 입력하는 즉시, 파일은 올리는 즉시 변환해요.
                        파일도 업로드되지 않고 브라우저 안에서만 읽어요.
                    </p>
                </header>

                <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                    <Base64UrlCodec />
                </section>

            </BaseLayout>
        </>
    );
};

export default Base64UrlPage;
