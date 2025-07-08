import Image from "next/image";
import styles from "./Author.module.scss";
import { ReactElement } from "react";

interface AuthorProps {
    profileImage?: string;
    name: string;
}

export const Author = ({ profileImage, name }: AuthorProps): ReactElement => {
    return (
        <div className={styles.author}>
            <Image
                src={profileImage || "/images/default.png"}
                alt={name}
                width={24}
                height={24}
                className={styles.author__avatar}
            />
            <div className={styles.author__info}>
                <span className={styles.author__name}>{name}</span>
            </div>
        </div>
    );
};
