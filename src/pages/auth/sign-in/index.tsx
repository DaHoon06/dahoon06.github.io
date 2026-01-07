import { SigninForm } from "@features/auth/sign-in-form/ui/SigninForm";
import { BaseLayout } from "@widgets/layouts";

export default function SignInPage() {
    return (
        <BaseLayout>
            <div className="relative flex min-h-[100dvh] items-center justify-center bg-gradient-to-br px-4">
                <div className="relative z-10 w-full max-w-md">
                    <div className="border-border bg-background rounded-2xl border p-8 shadow-md">
                        <SigninForm />
                    </div>

                    <footer className="text-body-caption-meta text-grayscale-400 mt-6 text-center">
                        © 2025 Dahoon06. All rights reserved.
                    </footer>
                </div>
            </div>
        </BaseLayout>
    );
}
