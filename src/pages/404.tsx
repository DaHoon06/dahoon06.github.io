import React from "react";
import { NextPageWithLayout } from "@shared/types";
import { Emoji } from "@shared/ui/icons/Emoji";
import CustomHead from "@shared/ui/heads/CustomHead";
import Link from "next/link";

type Props = {
    tags: any;
    posts: any;
};

type CustomErrorProps = Record<string, never>;

const CustomError: React.FC<CustomErrorProps> = () => {
    return (
        <div className="mx-auto px-6 py-12 rounded-3xl max-w-4xl flex items-center justify-center min-h-[calc(100vh-12rem)] text-center">
            <div className="flex py-10 flex-col gap-8 items-center w-full">
                <div className="flex items-center justify-center gap-3 text-6xl sm:text-[5rem] leading-none font-bold">
                    <div className="inline-flex items-center justify-center">
                        4
                    </div>
                    <span className="inline-flex items-center justify-center">
                        <Emoji>🤔</Emoji>
                    </span>
                    <div className="inline-flex items-center justify-center">
                        4
                    </div>
                </div>
                <div className="text-lg sm:text-xl leading-7 sm:leading-[1.875rem] text-[#ededed]">
                    Post not found
                </div>
                <Link
                    href="/"
                    replace
                    className="text-sm text-gray-400 hover:text-primary-000 transition-colors"
                >
                    <span>🚀 블로그로 돌아가기</span>
                </Link>
            </div>
        </div>
    );
};

const NotFoundPage: NextPageWithLayout<Props> = () => {
    return <CustomError />;
};

NotFoundPage.getLayout = (page) => {
    return (
        <>
            <CustomHead
                {...{
                    title: "404",
                    description: "404",
                    type: "website",
                    url: "",
                }}
            />
            {page}
        </>
    );
};

export default NotFoundPage;
