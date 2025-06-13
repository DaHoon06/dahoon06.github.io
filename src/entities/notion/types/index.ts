import { ExtendedRecordMap } from "notion-types";

export type PostStatusType = "Private" | "Public" | "PublicOnDetail";
export type PostTypeType = "Post" | "Paper" | "Page";

export type PostType = {
    id: string;
    date: { start_date: string };
    type: PostTypeType[];
    slug: string;
    tags?: string[];
    category?: string[];
    summary?: string;
    author?: {
        id: string;
        name: string;
        profile_photo?: string;
    }[];
    title: string;
    status: PostStatusType[];
    createdTime: string;
    fullWidth: boolean;
    thumbnail?: string;
};

export type PostDetail = PostType & {
    recordMap: ExtendedRecordMap;
};

export type PostsType = PostType[];
