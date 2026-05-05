import { PostType } from "@entities/notion/@x/blog";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { Author } from "./Author";
import { postDateFormatter } from "../lib/format-date";
interface BannerCardProps {
    post: PostType;
}

export const BannerCard = ({ post }: BannerCardProps) => {
    return (
        <article
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md md:grid-cols-2 will-change-transform"
            style={{ animation: "fadeIn 200ms ease-out both" }}
        >
            <div className="relative h-[220px] w-full md:h-auto">
                <Image
                    src={post.thumbnail || "/images/default.png"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>

            <div className="flex flex-col justify-between gap-4 p-5 md:p-8">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {post.category?.map((category) => (
                            <span
                                key={category}
                                className="rounded-md bg-[#030213] px-2 py-1 text-xs text-white md:text-sm"
                            >
                                {category}
                            </span>
                        ))}
                    </div>

                    <h2 className="line-clamp-2 text-xl font-extrabold leading-snug text-gray-900 md:text-2xl">
                        {post.title}
                    </h2>

                    {post.summary && (
                        <p className="line-clamp-3 text-base leading-relaxed text-gray-600 md:line-clamp-2">
                            {post.summary}
                        </p>
                    )}
                </div>

                <footer className="flex md:items-center justify-between md:flex-row flex-col md:gap-4 gap-2">
                    <button
                        type="button"
                        className="border border-gray-400 inline-flex items-center gap-2 rounded-md  px-4 py-2 text-sm  text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50"
                    >
                        읽어보기
                        <FaArrowRight className="w-4 h-4 " />
                    </button>
                </footer>
            </div>
        </article>
    );
};
