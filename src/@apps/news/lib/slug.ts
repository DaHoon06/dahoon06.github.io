const MAX_LENGTH = 72;

export const generateSlug = (title: string): string => {
    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const trimmed =
        slug.length > MAX_LENGTH
            ? slug.slice(0, MAX_LENGTH).replace(/-[^-]*$/, "")
            : slug;

    return trimmed || "untitled";
};

/** 같은 날짜 안에서 slug 가 겹치지 않도록 번호를 붙인다 */
export const uniqueSlug = (title: string, taken: Set<string>): string => {
    const base = generateSlug(title);
    if (!taken.has(base)) {
        taken.add(base);
        return base;
    }

    let counter = 2;
    while (taken.has(`${base}-${counter}`)) counter++;

    const unique = `${base}-${counter}`;
    taken.add(unique);
    return unique;
};
