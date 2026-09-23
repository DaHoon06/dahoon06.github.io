import Link from "next/link";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";
import { profileData } from "../model";

const ITEM_CLASS =
    "flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/60 hover:text-white";

/** GitHub · 메일 · 블로그 아이콘 버튼 묶음 (헤더·히어로 공용) */
export const SocialLinks = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={ITEM_CLASS}
        >
            <FaGithub size={15} />
        </a>
        <a
            href={`mailto:${profileData.email}`}
            aria-label="Email"
            className={ITEM_CLASS}
        >
            <FaEnvelope size={13} />
        </a>
        <Link href={ROUTES.HOME} aria-label="Blog" className={ITEM_CLASS}>
            <span className="text-[13px] font-black">B</span>
        </Link>
    </div>
);
