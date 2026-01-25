import { ReactElement } from "react";
import { SignInForm } from "./SignInForm";

export interface SignInModalProps {}

const SignInModal = ({}: SignInModalProps): ReactElement => {
    return (
        <div
            className={
                "bg-white border-gray-200 flex w-[280px] flex-col gap-4 rounded-[16px] border p-10 shadow-[0_0_32px_0_rgba(137,136,136,0.15)]"
            }
        >
            <SignInForm />
        </div>
    );
};

export default SignInModal;
