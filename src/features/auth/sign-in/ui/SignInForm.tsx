import Input from "@shared/ui/input";
import { ReactElement } from "react";

export const SignInForm = (): ReactElement => {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex w-full flex-col items-start gap-1 space-y-2">
                <label
                    htmlFor="id"
                    className="font-medium text-lg text-gray-800"
                >
                    아이디
                </label>
                <Input
                    id="id"
                    type="text"
                    placeholder="아이디"
                    name="id"
                    className="text-lg"
                />
            </div>

            <div className="flex w-full flex-col items-start gap-1 space-y-2">
                <label
                    htmlFor="pw"
                    className="font-medium text-lg text-gray-800"
                >
                    비밀번호
                </label>
                <Input
                    id="pw"
                    type="password"
                    placeholder="••••••••"
                    name="pw"
                    autoComplete="off"
                    required
                    className="text-lg"
                />
            </div>

            <button
                type="submit"
                className="bg-[#222] hover:bg-[#333] w-full transform rounded-lg px-4 py-3 font-medium text-lg text-white transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:outline-none active:scale-[0.98]"
            >
                로그인
            </button>
        </form>
    );
};
