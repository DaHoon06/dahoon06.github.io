import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageLoaderProps extends ImageProps {
    src: string;
    alt: string;
}

export const ImageLoader = ({ src, alt, ...props }: ImageLoaderProps) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative h-[180px] w-auto">
            {loading && (
                <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-200" />
            )}
            <Image
                src={src}
                alt={alt}
                className={`rounded-lg object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                {...props}
            />
        </div>
    );
};
