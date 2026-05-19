import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Icon } from "@iconify-icon/react";

/**
 * Badge component
 *
 * - visual: "fill" | "flat" | "outline" | "ghost" ! "purple"
 * - color: primary, success, info, warning, destructive, secondary, default
 * - leftIcon / rightIcon: string (iconify name) or ReactNode
 * - as: tag to render (div, span, button, etc.)
 * - clickable: agrega role="button" y cursor
 */


const base = cva(
    // base layout (gap helps when icons present)
    "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors gap-2 select-none",
    {
        variants: {
            size: {
                sm: "text-[10px] px-2 py-0.5 gap-1",
                md: "text-xs px-2.5 py-0.5 gap-2",
                lg: "text-sm px-3 py-1 gap-2",
                xl: "text-base px-4 py-2 gap-3",
            },
            visual: {
                fill: "", // color handled separately
                flat: "",
                outline: "border",
                ghost: "",
            },
        },
        defaultVariants: {
            size: "md",
            visual: "flat",
        },
    }
);

/** color tokens by visual style */
const colorTokens = {
    fill: {
        primary: "bg-blue-600 text-white",
        success: "bg-emerald-600 text-white",
        info: "bg-sky-600 text-white",
        warning: "bg-amber-500 text-black",
        destructive: "bg-red-600 text-white",
        secondary: "bg-slate-600 text-white",
        default: "bg-gray-200/80 text-gray-800",
        purple: "bg-purple-600 text-white",
    },
    flat: {
        primary: "bg-info-20 text-textinfo-20 border border-info-20",
        success: "bg-success-20 text-textsuccess-20 border border-success-20",
        info: "bg-info-20 text-textinfo-20 border border-info-20",
        warning: "bg-warning-20 text-textwarning-20 border border-warning-20",
        destructive: "bg-error-20 text-texterror-20 ",
        secondary: "bg-neutral-20 text-textneutral-20 border border-neutral-20",
        default: "bg-gray-100 text-gray-800 border border-gray-200",
        purple: "bg-purple-20 text-textpurple-20 ",
    },
    outline: {
        primary: "bg-transparent border-info-20 text-textinfo-20",
        success: "bg-transparent border-success-20 text-textsuccess-20",
        info: "bg-transparent border-info-20 text-textinfo-20",
        warning: "bg-transparent border-warning-20 text-textwarning-20",
        destructive: "bg-transparent border-error-20 text-texterror-20",
        secondary: "bg-transparent border-neutral-20 text-textneutral-20",
        default: "bg-transparent border-border text-foreground",
        purple: "bg-transparent border-purple-20 text-textpurple-20",
    },
    ghost: {
        primary: "bg-transparent text-blue-600",
        success: "bg-transparent text-emerald-600",
        info: "bg-transparent text-sky-600",
        warning: "bg-transparent text-amber-600",
        destructive: "bg-transparent text-red-600",
        secondary: "bg-transparent text-slate-700",
        default: "bg-transparent text-gray-800",
        purple: "bg-transparent text-purple-600",
    },
} as const;
type Visual = keyof typeof colorTokens;


type Color = keyof typeof colorTokens["fill"];

export interface BadgeProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof base> {
    color?: Color;
    leftIcon?: React.ReactNode | string;
    rightIcon?: React.ReactNode | string;
    as?: React.ElementType;
    clickable?: boolean;
    iconClassName?: string;
    unstyled?: boolean;
}

export function Badge({
    as: Component = "div",
    className,
    color = "default",
    visual = "flat",
    size,
    leftIcon,
    rightIcon,
    clickable = false,
    iconClassName,
    children,
    unstyled = false,
    ...props
}: BadgeProps) {
    // elije las clases de color según visual + color
    const visualKey: Visual = visual ?? "flat";
    const colorClass =
        colorTokens[visualKey][color ?? "default"];
    const classes = twMerge(
        clsx(
            base({ size, visual }),
            !unstyled && colorClass,
            clickable ? "cursor-pointer" : undefined,
            className
        )
    );



    const renderIcon = (icon?: React.ReactNode | string) => {
        if (!icon) return null;
        if (typeof icon === "string") {
            // si pasan "mdi:check" por ejemplo
            return <Icon icon={icon} className={twMerge("w-3 h-3", iconClassName)} aria-hidden="true" />;
        }
        return <span className={twMerge("w-3 h-3", iconClassName)}>{icon}</span>;
    };

    // accesibilidad: si es clickable y no es un elemento nativo button, agregar role y tabIndex
    const a11yProps: Record<string, unknown> = {};
    if (clickable && Component !== "button") {
        a11yProps["role"] = "button";
        a11yProps["tabIndex"] = (props as any).tabIndex ?? 0;
    }

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - allow dynamic element via as
        <Component className={classes} {...(props as any)} {...a11yProps}>
            {leftIcon ? renderIcon(leftIcon) : null}
            <span className="truncate">{children}</span>
            {rightIcon ? renderIcon(rightIcon) : null}
        </Component>
    );
}