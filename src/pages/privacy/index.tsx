import { NextPage } from "next";
import Link from "next/link";
import { CONFIG } from "@root/site.config";
import { PAGE_SEO, SITE, breadcrumbJsonLd } from "@shared/config/seo";
import { ROUTES } from "@shared/routes";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";

/** 방침 내용을 바꾸면 이 날짜도 갱신한다 */
const EFFECTIVE_DATE = "2026년 10월 16일";

const seo = PAGE_SEO.privacy;

const jsonLd = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: seo.title, path: seo.path },
]);

const ExternalLink = ({ href, children }: { href: string; children: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-900 underline underline-offset-2"
    >
        {children}
    </a>
);

const PrivacyPage: NextPage = () => {
    return (
        <>
            <SeoHead {...seo} jsonLd={jsonLd} />
            <BaseLayout>
                <article className="mx-auto max-w-[720px] text-[15px] leading-relaxed text-zinc-700 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-zinc-900 [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                            개인정보처리방침
                        </h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            시행일: {EFFECTIVE_DATE}
                        </p>
                    </header>

                    <p>
                        {SITE.name}({CONFIG.domain}, 이하 &ldquo;블로그&rdquo;)는
                        방문자의 개인정보를 소중히 여기며, 어떤 정보가 어떻게
                        수집·이용되는지 아래와 같이 안내합니다. 블로그는 회원가입
                        기능이 없으며, 방문자가 이름·연락처 같은 개인정보를 직접
                        입력하는 양식을 운영하지 않습니다.
                    </p>

                    <h2>1. 자동으로 수집되는 정보</h2>
                    <p>
                        블로그를 이용하는 과정에서 아래 정보가 브라우저를 통해
                        자동으로 생성·수집될 수 있습니다.
                    </p>
                    <ul>
                        <li>접속 IP 주소, 브라우저·기기 종류, 운영체제</li>
                        <li>방문 일시, 조회한 페이지, 유입 경로(referrer)</li>
                        <li>쿠키 및 유사 기술(로컬 스토리지)로 저장되는 식별자</li>
                    </ul>

                    <h2>2. 쿠키와 제3자 서비스</h2>
                    <p>블로그는 다음 제3자 서비스를 사용합니다.</p>
                    <ul>
                        <li>
                            <strong>Google AdSense</strong> — 광고를 게재합니다.
                            Google을 포함한 제3자 광고 공급업체는 쿠키를 사용해
                            방문자가 이 블로그나 다른 웹사이트를 이전에 방문한
                            기록을 바탕으로 광고를 게재합니다. Google은 광고
                            쿠키를 사용해 방문자의 이 사이트 및 인터넷의 다른
                            사이트 방문 기록에 기반한 광고를 제공할 수 있습니다.
                        </li>
                        <li>
                            <strong>Google Analytics</strong> — 방문 통계(페이지
                            조회 수, 체류 시간 등)를 익명으로 집계해 콘텐츠 개선에
                            활용합니다.
                        </li>
                        <li>
                            <strong>utterances (GitHub)</strong> — 댓글 기능을
                            제공합니다. 댓글을 작성하려면 GitHub 계정으로
                            로그인해야 하며, 작성된 댓글은 GitHub 저장소의
                            이슈로 공개 저장됩니다.
                        </li>
                    </ul>
                    <p>
                        각 서비스가 정보를 처리하는 방식은{" "}
                        <ExternalLink href="https://policies.google.com/technologies/partner-sites">
                            Google 파트너 사이트 데이터 사용 정책
                        </ExternalLink>
                        ,{" "}
                        <ExternalLink href="https://policies.google.com/privacy">
                            Google 개인정보처리방침
                        </ExternalLink>
                        ,{" "}
                        <ExternalLink href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
                            GitHub 개인정보처리방침
                        </ExternalLink>
                        에서 확인할 수 있습니다.
                    </p>

                    <h2>3. 맞춤 광고 거부 방법</h2>
                    <ul>
                        <li>
                            <ExternalLink href="https://adssettings.google.com">
                                Google 광고 설정
                            </ExternalLink>
                            에서 맞춤 광고를 사용 중지할 수 있습니다.
                        </li>
                        <li>
                            <ExternalLink href="https://www.aboutads.info/choices">
                                www.aboutads.info
                            </ExternalLink>
                            에서 제3자 광고 공급업체의 맞춤 광고 쿠키를 거부할 수
                            있습니다.
                        </li>
                        <li>
                            브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수
                            있습니다. 이 경우 일부 기능(테마 설정 유지 등)이
                            동작하지 않을 수 있습니다.
                        </li>
                    </ul>

                    <h2>4. 이용 목적과 보관 기간</h2>
                    <p>
                        자동 수집 정보는 방문 통계 분석, 콘텐츠 개선, 광고 게재
                        목적으로만 쓰이며, 블로그 운영자가 이를 이용해 개인을
                        식별하지 않습니다. 보관 기간은 각 제3자 서비스의 정책을
                        따릅니다.
                    </p>

                    <h2>5. 문의</h2>
                    <p>
                        개인정보 관련 문의는{" "}
                        <a
                            href={`mailto:${CONFIG.profile.email}`}
                            className="text-primary-900 underline underline-offset-2"
                        >
                            {CONFIG.profile.email}
                        </a>
                        로 보내 주세요. 다른 문의 방법은{" "}
                        <Link
                            href={ROUTES.CONTACT}
                            className="text-primary-900 underline underline-offset-2"
                        >
                            연락처 페이지
                        </Link>
                        에서 확인할 수 있습니다.
                    </p>

                    <h2>6. 방침의 변경</h2>
                    <p>
                        이 방침은 법령이나 서비스 변경에 따라 수정될 수 있으며,
                        변경 시 이 페이지의 시행일을 갱신해 알립니다.
                    </p>
                </article>
            </BaseLayout>
        </>
    );
};

export default PrivacyPage;
