import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
};

const fallbackSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
    xl: "text-2xl",
};

export function Avatar({
    size = "md",
    className,
    children,
    ...props
}: AvatarProps) {
    return (
        <AvatarPrimitive.Root
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </AvatarPrimitive.Root>
    );
}

interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
    className?: string;
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
    return (
        <AvatarPrimitive.Image
            className={cn("aspect-square h-full w-full object-cover", className)}
            {...props}
        />
    );
}

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

export function AvatarFallback({
    size = "md",
    className,
    children,
    ...props
}: AvatarFallbackProps) {
    return (
        <AvatarPrimitive.Fallback
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium",
                fallbackSizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </AvatarPrimitive.Fallback>
    );
}
