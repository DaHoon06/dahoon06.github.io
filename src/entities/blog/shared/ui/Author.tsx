import Image from "next/image";
import { ReactElement } from "react";

interface AuthorProps {
    profileImage?: string;
    name: string;
}

export const Author = ({ profileImage, name }: AuthorProps): ReactElement => {
    return (
        <div className="flex items-center gap-2">
            <Image
                src={profileImage || "/images/default.png"}
                alt={name}
                width={24}
                height={24}
                className="rounded-full"
            />
            <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-800">{name}</span>
            </div>
        </div>
    );
};
