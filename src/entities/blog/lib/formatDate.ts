function formatDate(date: any, local: any) {
    const d = new Date(date);
    const options: any = { year: "numeric", month: "short", day: "numeric" };
    const res = d.toLocaleDateString(local, options);
    return res;
}

const postDateFormatter = (date: string) => {
    return date.replace(/-/g, ". ");
};

export { formatDate, postDateFormatter };
