
import React from "react";
import { cn } from "../../lib/utils";
interface CardProps {
    className?: string;
    variant?: "default" | "elevated" | "glass" | "flat";
    children?: React.ReactNode;
}

interface CardHeaderProps {
    className?: string;
    children?: React.ReactNode;
}

interface CardTitleProps {
    className?: string;
    children?: React.ReactNode;
}

interface CardContentProps {
    className?: string;
    children?: React.ReactNode;
}

interface CardFooterProps {
    className?: string;
    children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", ...props }: CardProps, ref) => {
        const variants = {
            default:
                "rounded-2xl border border-border/20 bg-card/98 shadow-sm transition-shadow  hover:shadow-md backdrop-blur-xl",
            elevated:
                "bg-card border border-border rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300",

            // glass: "rounded-2xl  bg-gradient-to-br from-white/10 to-white/5  border border-cyan-400/20  backdrop-blur-2xl  shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:shadow-[0_0_50px_rgba(56,189,248,0.25)]    transition-all duration-300",
            glass:
                "bg-slate-800/40 border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/60",
            // "rounded-2xl bg-[#0f172a] border border-white/[0.1] backdrop-blur-xl shadow-lg hover:bg-white/[0.06] transition",
            flat:
                "bg-transparent border-none shadow-none hover:bg-muted/40 transition",
        };

        return (
            <div
                ref={ref}
                className={cn(variants[variant], className)}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

// Subcomponentes
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }: CardHeaderProps, ref) => (
    <div ref={ref} className={cn("p-4 border-b border-border/20", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }: CardTitleProps, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }: CardContentProps, ref) => (
    <div ref={ref} className={cn("p-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("p-4 border-t border-border/20", className)}
            {...props}
        />
    )
);
