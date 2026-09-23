import type { NextPage } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { UuidGenerator } from "@features/playground/uuid-generator";
import { ROUTES } from "@shared/routes";
import {
    PAGE_SEO,
    breadcrumbJsonLd,
    webApplicationJsonLd,
} from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";

const seo = PAGE_SEO.uuidGenerator;

const jsonLd = [
    webApplicationJsonLd(seo, "UUID 생성기"),
    breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "개발 도구", path: PAGE_SEO.tools.path },
        { name: "UUID 생성기", path: seo.path },
    ]),
];

const UuidGeneratorPage: NextPage = () => {
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
                        UUID Generator
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        버전과 개수, 표기 형식을 고르면 바로 복사할 수 있는
                        UUID를 만들어 드려요. 생성은 전부 브라우저 안에서만
                        이루어지고, 어떤 값도 서버로 전송되지 않아요.
                    </p>
                </header>

                <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                    <UuidGenerator />
                </section>
            </BaseLayout>
        </>
    );
};

export default UuidGeneratorPage;
