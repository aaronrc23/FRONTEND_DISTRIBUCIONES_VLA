import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"


const typographyVariants = cva(
    "text-foreground",
    {
        variants: {
            variant: {
                title: "font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl",
                subtitle: "font-semibold text-xl sm:text-2xl ",
                message: "text-base sm:text-lg",
                secondary: "text-sm sm:text-base",
                muted: "text-sm text-muted-foreground",
                mutedmin: "text-xs text-muted-foreground",
                small: "text-xs sm:text-sm",
                ninguno: ""
            },
            weight: {
                light: "font-light",
                normal: "font-normal",
                medium: "font-medium",
                bold: "font-bold",
            },
        },
        defaultVariants: {
            variant: "ninguno",
            weight: "normal",
        },
    }
)

export interface TypographyProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
    as?: React.ElementType
}

export const Texto = React.forwardRef<HTMLElement, TypographyProps>(
    ({ className, variant, weight, as: Component = "p", ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={cn(typographyVariants({ variant, weight }), className)}
                {...props}
            />
        )
    }
)

Texto.displayName = "Texto"