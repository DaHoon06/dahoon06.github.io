import { ReactElement, SVGProps } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { CONFIG } from "@root/site.config";

/** lucide 1.x에서 브랜드 아이콘이 빠져서 필요한 마크만 직접 둔다. */
const GithubMark = (props: SVGProps<SVGSVGElement>): ReactElement => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
);

const LinkedinMark = (props: SVGProps<SVGSVGElement>): ReactElement => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
);

const { profile } = CONFIG;

const socials = [
    profile.github && {
        label: "GitHub",
        href: `https://github.com/${profile.github}`,
        Icon: GithubMark,
    },
    profile.linkedin && {
        label: "LinkedIn",
        href: `https://www.linkedin.com/in/${encodeURIComponent(
            profile.linkedin
        )}`,
        Icon: LinkedinMark,
    },
].filter(Boolean) as { label: string; href: string; Icon: typeof GithubMark }[];

/** 사이드 네비게이션 최상단 · 모바일 목록 상단에 노출되는 프로필 카드 */
export const ProfileCard = (): ReactElement => {
    return (
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {/* 배너 — 아바타가 걸치면서 카드 상단 섹션을 구분한다 */}
            <div className="h-14 bg-gradient-to-br from-[#ff7337]/20 via-[#ff7337]/5 to-zinc-50" />

            <div className="-mt-9 flex flex-col items-center px-5 pb-5">
                <Image
                    src={profile.image}
                    alt={profile.name}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full object-cover ring-4 ring-white"
                />
                <h2 className="mt-3 text-[15px] font-bold tracking-tight text-zinc-900">
                    {profile.name}
                </h2>
                {profile.role && (
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                        {profile.role}
                    </p>
                )}
                {profile.bio && (
                    <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
                        {profile.bio}
                    </p>
                )}
            </div>

            {/* 이메일 */}
            {profile.email && (
                <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-2 border-t border-zinc-100 px-5 py-3 transition-colors hover:bg-zinc-50"
                >
                    <Mail
                        size={13}
                        className="shrink-0 text-zinc-400 transition-colors group-hover:text-[#ff7337]"
                    />
                    <span className="truncate text-xs text-zinc-500 transition-colors group-hover:text-zinc-900">
                        {profile.email}
                    </span>
                </a>
            )}

            {/* 소셜 */}
            {socials.length > 0 && (
                <div className="flex divide-x divide-zinc-100 border-t border-zinc-100">
                    {socials.map(({ label, href, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-1 items-center justify-center gap-1.5 py-3 transition-colors hover:bg-zinc-50"
                        >
                            <Icon className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-[#ff7337]" />
                            <span className="text-[11px] font-medium text-zinc-500 transition-colors group-hover:text-zinc-900">
                                {label}
                            </span>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};
