import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
type CarouselArrowProps = {
    direction: "left" | "right";
    onClick: () => void;
    className?: string;
};

export function CarouselArrow({
    direction,
    onClick,
    className,
}: CarouselArrowProps) {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;

    return (
        <button
            onClick={onClick}
            aria-label={direction === "left" ? "Anterior" : "Siguiente"}
            className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10",
                "flex items-center justify-center",
                "size-10 rounded-full",
                "border border-border backdrop-blur-sm cursor-pointer",
                "text-muted-foreground shadow-lg",
                "transition-all duration-300 ease-out",
                "opacity-0 group-hover:opacity-100",
                "hover:bg-primary hover:text-white hover:border-primary",
                "active:scale-90",
                direction === "left"
                    ? "-left-3 sm:-left-4"
                    : "-right-3 sm:-right-4",
                className
            )}
        >
            <Icon className="size-5" />
        </button>
    );
}