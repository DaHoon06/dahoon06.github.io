import TimestampConverter from "@features/playground/timestamp-converter/ui/TimestampConverter";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@shared/routes";
import { toast } from "@shared/hooks/useToast";
import {
    PAGE_SEO,
    breadcrumbJsonLd,
    webApplicationJsonLd,
} from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import { BaseLayout } from "@widgets/layouts";
import { useEffect, useState } from "react";

const seo = PAGE_SEO.timestampConverter;

const jsonLd = [
    webApplicationJsonLd(seo, "유닉스 타임스탬프 변환기"),
    breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "개발 도구", path: PAGE_SEO.tools.path },
        { name: "타임스탬프 변환기", path: seo.path },
    ]),
];

export default function TimestampConverterPage() {

    const [timer, setTimer] = useState<number | null>(null);

    useEffect(() => {
        // 클라이언트에서만 실행되도록 초기값 설정
        setTimer(new Date().getTime());

        const id = setInterval(() => {
            setTimer(new Date().getTime());
        }, 1000);

        return () => clearInterval(id);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(timer?.toString() ?? "");
        toast({
            title: "복사되었습니다.",
            description: "타임스탬프가 복사되었습니다.",
        });
    };

    return (
        <>
            <SeoHead {...seo} jsonLd={jsonLd} />
            <BaseLayout>
                <div className="px-4 sm:px-6 lg:px-8 py-10 w-full">
                    <header className="mb-6">
                        <Link
                            href={ROUTES.TOOLS}
                            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500 transition-colors hover:text-zinc-900"
                        >
                            <ChevronLeft size={13} />
                            Tools
                        </Link>
                        <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
                            Timestamp Converter
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            초/밀리초 타임스탬프 또는 날짜 문자열을 입력하면
                            한국 시간으로 변환해 드려요. 결과는 복사해서 바로
                            사용할 수 있어요.
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            현재시간 :{" "}
                            <span
                                className="font-medium hover:cursor-pointer text-bold"
                                onClick={handleCopy}
                            >
                                {timer}
                            </span>
                        </p>
                    </header>

                    <section>
                        <div className="rounded-xl border bg-white/70 dark:bg-slate-900/40 backdrop-blur p-5 sm:p-6 shadow-sm">
                            <TimestampConverter />
                        </div>
                    </section>
                </div>
            </BaseLayout>
        </>
    );
}
