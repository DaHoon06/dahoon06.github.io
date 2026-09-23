import { bytesToBase64 } from "@shared/lib/base64";

export async function fileToDataUri(file: File): Promise<string> {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const mime = file.type || "application/octet-stream";
    return `data:${mime};base64,${bytesToBase64(bytes)}`;
}

/** `data:image/png;base64,...` 형태인지 */
export function isImageDataUri(text: string): boolean {
    return /^data:image\/[\w.+-]+;base64,/i.test(text.trim());
}
