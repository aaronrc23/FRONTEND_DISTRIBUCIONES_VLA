import { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;

    // versiones responsive
    srcSet?: string;
    sizes?: string;

    // performance
    priority?: boolean; // para LCP (hero)
    blurDataURL?: string;
    fallback?: string;

    // layout
    width?: number;
    height?: number;

    className?: string;
    containerClassName?: string;
}

export default function Image({
    src,
    alt,
    srcSet,
    sizes = "100vw",
    priority = false,
    blurDataURL,
    fallback = "/fallback.png",
    width,
    height,
    className = "",
    containerClassName = "",
    ...props
}: ImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <div
            className={`relative overflow-hidden ${containerClassName}`}
            style={{
                aspectRatio: width && height ? `${width}/${height}` : undefined,
            }}
        >
            {/* Blur placeholder */}
            {isLoading && blurDataURL && (
                <img
                    src={blurDataURL}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl"
                />
            )}

            {/* Imagen real */}
            <img
                src={imgSrc}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                // 🔥 clave LCP
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                width={width}
                height={height}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setImgSrc(fallback);
                    setIsLoading(false);
                }}
                className={`
                w-full h-full object-cover
                ${className}
                `}
                {...props}
            />
        </div>
    );
}