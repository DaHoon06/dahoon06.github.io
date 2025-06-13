import Image, { ImageLoaderProps } from "next/image";
import { ReactElement } from "react";
import styled from "styled-components";
import { imgLoader } from "@shared/ui/images/loader";

const Blog = styled.div``;

export const BlogIcon = (): ReactElement => {
    return (
        <Blog>
            <Image
                loader={({ src, width, quality }: ImageLoaderProps) =>
                    imgLoader({ src, width, quality })
                }
                src={"/images/icons/blog-icon.webp"}
                alt={"blog-icon"}
                width={36}
                height={36}
            />
        </Blog>
    );
};
