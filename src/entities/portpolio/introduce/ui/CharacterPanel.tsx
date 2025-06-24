import { ReactElement, useMemo, useRef } from "react";
import Image from "next/image";
import styles from "./CharacterPanel.module.scss";

export const CharacterPanel = (): ReactElement => {
    const refCharacter01 = useRef<HTMLImageElement>(null);
    const refCharacter02 = useRef<HTMLImageElement>(null);
    const refCharacter03 = useRef<HTMLImageElement>(null);

    useMemo(
        () => ({
            character: {
                character1: refCharacter01,
                character2: refCharacter02,
                character3: refCharacter03,
            },
        }),
        []
    );

    return (
        <section className={styles.characterPanel}>
            <Image
                src={"/images/character/character_01.svg"}
                alt="character1"
                ref={refCharacter01}
                className={styles.character}
                width={161}
                height={231}
            />
            <Image
                src={"/images/character/character_02.svg"}
                alt="character2"
                ref={refCharacter02}
                className={styles.character}
                width={141}
                height={131}
            />
            <Image
                src={"/images/character/character_03.svg"}
                alt="character3"
                ref={refCharacter03}
                className={styles.character}
                width={169}
                height={160}
            />
        </section>
    );
};
