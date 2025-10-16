import TimestampConverter from "@features/playground/timestamp-converter/ui/TimestampConverter";
import CustomHead from "@shared/ui/heads/CustomHead";
import { BaseLayout } from "@widgets/layouts";

export default function TimestampConverterPage() {
    const meta = {
        title: "Timestamp Converter — 유닉스 타임스탬프 변환기",
        description:
            "초 또는 밀리초 단위의 유닉스 타임스탬프를 한국 표준시(KST)로 변환합니다. 날짜 문자열을 타임스탬프로도 변환 가능하며, 복사하여 바로 활용할 수 있습니다.",
        url: "https://dahoon06.github.io/tools/timestamp-converter",
        image: "/images/profile.png",
        type: "website",
        keywords:
            "타임스탬프, timestamp, 유닉스 타임스탬프, 시간 변환, UTC, KST, 밀리초, 초, 시간 계산기, 날짜 변환기, timestamp converter, unix time converter, dahoon06, 훈다, 전다훈, dahoon226, dahoon06@gmail.com",
        author: "Da-hoon Jeon (dahoon06)",
        siteName: "Tools — Timestamp Converter",
    };

    return (
        <>
            <CustomHead {...meta} />
            <BaseLayout>
                <div className="px-4 sm:px-6 lg:px-8 py-10 w-full">
                    <header className="mb-6">
                        <div className="text-xs uppercase tracking-wide text-gray-500">
                            Tools
                        </div>
                        <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
                            Timestamp Converter
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            초/밀리초 타임스탬프 또는 날짜 문자열을 입력하면
                            한국 시간으로 변환해 드려요. 결과는 복사해서 바로
                            사용할 수 있어요.
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
