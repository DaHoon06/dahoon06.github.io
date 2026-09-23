import type { NextPage } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JwtDecoder } from "@features/playground/jwt-decoder";
import { ROUTES } from "@shared/routes";
import {
    PAGE_SEO,
    breadcrumbJsonLd,
    webApplicationJsonLd,
} from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";

const seo = PAGE_SEO.jwtDecoder;

const jsonLd = [
    webApplicationJsonLd(seo, "JWT 디코더"),
    breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "개발 도구", path: PAGE_SEO.tools.path },
        { name: "JWT 디코더", path: seo.path },
    ]),
];

const JwtDecoderPage: NextPage = () => {
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
                        JWT Decoder
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        토큰을 붙여 넣으면 헤더·페이로드를 풀고 만료까지 남은
                        시간을 한국 시간으로 보여 드려요. 토큰은 어디로도
                        전송되지 않고 브라우저 안에서만 디코딩돼요.
                    </p>
                </header>

                <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                    <JwtDecoder />
                </section>
            </BaseLayout>
        </>
    );
};

export default JwtDecoderPage;
