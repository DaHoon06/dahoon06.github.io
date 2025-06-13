import Image, { ImageLoaderProps } from "next/image";
import { ReactElement } from "react";
import styled from "styled-components";
import { imgLoader } from "@shared/ui/images/loader";

const GitHub = styled.div``;

export const GitHubIcon = (): ReactElement => {
    return (
        <GitHub>
            <Image
                loader={({ src, width, quality }: ImageLoaderProps) =>
                    imgLoader({ src, width, quality })
                }
                src={"/images/icons/github-icon.webp"}
                alt={"github-icon"}
                width={36}
                height={36}
            />
        </GitHub>
    );
};
