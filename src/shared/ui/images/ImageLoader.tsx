import cn from "@shared/libs/cn";
import Image, { ImageProps } from "next/image";

interface ImageLoaderProps extends ImageProps {
    src: string;
    alt: string;
    fallbackImage?: string;
}

export const ImageLoader = ({
    src,
    width,
    height,
    alt,
    fallbackImage,
    style,
    ...props
}: ImageLoaderProps) => {
    const resolvedSrc = src || fallbackImage || "/images/default.png";
    const isFill = props.fill === true;

    return (
        <div
            className={cn(
                "relative flex-shrink-0 overflow-hidden rounded-lg",
                isFill ? "h-full w-full" : "h-auto w-auto"
            )}
        >
            <div className="bg-grayscale-200 absolute inset-0 animate-pulse" />

            <Image
                {...props}
                src={resolvedSrc}
                alt={alt}
                width={width}
                height={height}
                className={cn("relative z-10 object-cover", props.className)}
                style={isFill ? style : { height, width, ...style }}
            />
        </div>
    );
};
