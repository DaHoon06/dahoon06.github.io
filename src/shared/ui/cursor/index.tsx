import { ReactElement, useEffect, useRef } from "react";
import elasticMouse from "./elasticMouse";
import classNames from "classnames";
import styles from "./Cursor.module.scss";

const Cursor = (): ReactElement => {
    const cursorMain = useRef<HTMLDivElement>(null);
    const cursorSub = useRef<HTMLDivElement>(null);

    const defaultCursorNone = () => {
        const prevCursor = document.body.style.cursor;
        document.body.style.cursor = "none";
        return () => {
            document.body.style.cursor = prevCursor;
        };
    };

    useEffect(() => {
        if (cursorMain.current !== null) {
            elasticMouse(cursorMain.current, true);
            elasticMouse(cursorSub.current, false);
        }
        defaultCursorNone();
    }, []);

    return (
        <div>
            <div
                className={classNames(styles.cursor, styles.main)}
                ref={cursorMain}
            />
            <div
                className={classNames(styles.cursor, styles.sub)}
                ref={cursorSub}
            />
        </div>
    );
};

export default Cursor;
