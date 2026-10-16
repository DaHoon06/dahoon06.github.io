import { NextPage } from "next";
import Link from "next/link";
import { CONFIG } from "@root/site.config";
import { PAGE_SEO, SITE, breadcrumbJsonLd } from "@shared/config/seo";
import { ROUTES } from "@shared/routes";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";

const seo = PAGE_SEO.contact;

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: seo.title,
        description: seo.description,
        url: `${SITE.url}${seo.path}`,
        inLanguage: "ko-KR",
    },
    breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "연락처", path: seo.path },
    ]),
];

const CHANNELS = [
    {
        label: "이메일",
        value: CONFIG.profile.email,
        href: `mailto:${CONFIG.profile.email}`,
    },
    {
        label: "GitHub",
        value: `github.com/${CONFIG.profile.github}`,
        href: `https://github.com/${CONFIG.profile.github}`,
    },
    {
        label: "LinkedIn",
        value: "LinkedIn 프로필",
        href: SITE.sameAs[1],
    },
];

const ContactPage: NextPage = () => {
    return (
        <>
            <SeoHead {...seo} jsonLd={jsonLd} />
            <BaseLayout>
                <article className="mx-auto max-w-[720px] text-[15px] leading-relaxed text-zinc-700">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                            연락처
                        </h1>
                        <p className="mt-3">
                            {SITE.name}는 프론트엔드 개발자 전다훈이 직접
                            운영하는 개인 기술 블로그입니다. 글 내용의 오류 제보,
                            협업·채용 제안, 광고·저작권 관련 문의는 아래
                            채널로 연락해 주세요. 보통 2~3일 안에 답장드립니다.
                        </p>
                    </header>

                    <ul className="divide-y divide-zinc-100 rounded-2xl border border-zinc-200">
                        {CHANNELS.map((channel) => (
                            <li
                                key={channel.label}
                                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <span className="text-sm font-medium text-zinc-500">
                                    {channel.label}
                                </span>
                                <a
                                    href={channel.href}
                                    target={
                                        channel.href.startsWith("mailto:")
                                            ? undefined
                                            : "_blank"
                                    }
                                    rel="noopener noreferrer"
                                    className="break-all font-medium text-zinc-900 hover:text-primary-900"
                                >
                                    {channel.value}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8 text-sm text-zinc-500">
                        글에 대한 의견은 각 글 하단의 댓글(GitHub 계정 필요)로도
                        남길 수 있습니다. 운영자 소개는{" "}
                        <Link
                            href={ROUTES.ABOUT}
                            className="text-primary-900 underline underline-offset-2"
                        >
                            About
                        </Link>
                        , 개인정보 처리 방식은{" "}
                        <Link
                            href={ROUTES.PRIVACY}
                            className="text-primary-900 underline underline-offset-2"
                        >
                            개인정보처리방침
                        </Link>
                        에서 확인할 수 있습니다.
                    </p>
                </article>
            </BaseLayout>
        </>
    );
};

export default ContactPage;
