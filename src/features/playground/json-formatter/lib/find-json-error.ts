/**
 * JSON 문법 오류가 처음 나타나는 offset(0-based)을 찾는다. 오류가 없으면 null.
 *
 * 최신 V8(Chrome 117+, Node 20+)은 `JSON.parse` 에러 메시지에서 위치 정보를 뺐다
 * (`Unexpected token '}', "..." is not valid JSON`). 메시지 파싱만으로는 크롬에서
 * 줄·글자를 못 보여줘서, 값을 만들지 않고 문법만 따라가는 스캐너를 따로 둔다.
 */
export function findJsonErrorOffset(source: string): number | null {
    let i = 0;

    class ScanError extends Error {
        constructor(public offset: number) {
            super();
        }
    }
    const fail = (offset = i): never => {
        throw new ScanError(offset);
    };

    const skipWhitespace = () => {
        while (i < source.length && " \t\n\r".includes(source[i] ?? "")) i++;
    };

    const expectLiteral = (literal: string) => {
        for (const char of literal) {
            if (source[i] !== char) fail();
            i++;
        }
    };

    const scanString = () => {
        i++; // 여는 따옴표
        while (i < source.length) {
            const char = source[i] ?? "";
            if (char === '"') {
                i++;
                return;
            }
            if (char === "\\") {
                const next = source[i + 1];
                if (next === "u") {
                    if (!/^[0-9a-fA-F]{4}$/.test(source.slice(i + 2, i + 6))) {
                        fail(i + 1);
                    }
                    i += 6;
                } else if (next !== undefined && '"\\/bfnrt'.includes(next)) {
                    i += 2;
                } else {
                    fail(i + 1);
                }
                continue;
            }
            // 제어 문자(줄바꿈 포함)는 이스케이프 없이 문자열에 올 수 없다
            if (char < " ") fail();
            i++;
        }
        fail();
    };

    const scanNumber = () => {
        const match = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(
            source.slice(i)
        );
        if (!match || match[0] === "-") fail();
        i += match?.[0].length ?? 0;
    };

    const scanValue = (): void => {
        skipWhitespace();
        const char = source[i];

        if (char === "{") {
            i++;
            skipWhitespace();
            if (source[i] === "}") {
                i++;
                return;
            }
            while (true) {
                skipWhitespace();
                if (source[i] !== '"') fail();
                scanString();
                skipWhitespace();
                if (source[i] !== ":") fail();
                i++;
                scanValue();
                skipWhitespace();
                if (source[i] === ",") {
                    i++;
                    continue;
                }
                if (source[i] === "}") {
                    i++;
                    return;
                }
                fail();
            }
        }

        if (char === "[") {
            i++;
            skipWhitespace();
            if (source[i] === "]") {
                i++;
                return;
            }
            while (true) {
                scanValue();
                skipWhitespace();
                if (source[i] === ",") {
                    i++;
                    continue;
                }
                if (source[i] === "]") {
                    i++;
                    return;
                }
                fail();
            }
        }

        if (char === '"') return scanString();
        if (char === "t") return expectLiteral("true");
        if (char === "f") return expectLiteral("false");
        if (char === "n") return expectLiteral("null");
        if (
            char === "-" ||
            (char !== undefined && char >= "0" && char <= "9")
        ) {
            return scanNumber();
        }
        fail();
    };

    try {
        scanValue();
        skipWhitespace();
        if (i < source.length) fail();
        return null;
    } catch (e) {
        if (e instanceof ScanError) return Math.min(e.offset, source.length);
        throw e;
    }
}
