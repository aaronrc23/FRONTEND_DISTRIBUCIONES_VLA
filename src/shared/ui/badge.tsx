import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Icon } from "@iconify-icon/react";

/**
 * Badge component
 *
 * - visual: "fill" | "flat" | "outline" | "ghost"
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
const colorTokens: Record<string, Record<string, string>> = {
    fill: {
        primary: "bg-blue-600 text-white",
        success: "bg-emerald-600 text-white",
        info: "bg-sky-600 text-white",
        warning: "bg-amber-500 text-black",
        destructive: "bg-red-600 text-white",
        secondary: "bg-slate-600 text-white",
        default: "bg-gray-200 text-gray-800",
    },
    flat: {
        primary: `bg-blue-100 text-blue-700 border border-blue-200
                  dark:bg-blue-600/30 dark:text-blue-400 dark:border-blue-700/30`,
        success: `bg-emerald-100 text-emerald-700 border border-emerald-200
                  dark:bg-emerald-600/30 dark:text-emerald-400 dark:border-emerald-700/30`,
        info: `bg-sky-100 text-sky-700 border border-sky-200
                 dark:bg-sky-600/30 dark:text-sky-400 dark:border-sky-700/30`,
        warning: `bg-amber-100 text-amber-700 border border-amber-200
                   dark:bg-amber-600/30 dark:text-amber-400 dark:border-amber-700/30`,
        destructive: `bg-red-100 text-red-700 border border-red-200
                    dark:bg-red-600/30 dark:text-red-400 dark:border-red-700/30`,
        secondary: `bg-slate-100 text-slate-700 border border-slate-200
                    dark:bg-slate-500/30 dark:text-slate-400 dark:border-slate-700/30`,
        default: `bg-gray-100 text-gray-800 border border-gray-200
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700`,
    },
    outline: {
        primary: "bg-transparent border-blue-600 text-blue-600",
        success: "bg-transparent border-emerald-600 text-emerald-600",
        info: "bg-transparent border-sky-600 text-sky-600",
        warning: "bg-transparent border-amber-500 text-amber-500",
        destructive: "bg-transparent border-red-600 text-red-600",
        secondary: "bg-transparent border-slate-400 text-slate-700",
        default: "bg-transparent border-border text-foreground",
    },
    ghost: {
        primary: "bg-transparent text-blue-600",
        success: "bg-transparent text-emerald-600",
        info: "bg-transparent text-sky-600",
        warning: "bg-transparent text-amber-600",
        destructive: "bg-transparent text-red-600",
        secondary: "bg-transparent text-slate-700",
        default: "bg-transparent text-gray-800",
    },
};

export interface BadgeProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof base> {
    color?: keyof (typeof colorTokens)["fill"];
    visual?: "fill" | "flat" | "outline" | "ghost";
    leftIcon?: React.ReactNode | string;
    rightIcon?: React.ReactNode | string;
    as?: React.ElementType;
    clickable?: boolean;
    iconClassName?: string; // para pasar clases a los iconos
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
    ...props
}: BadgeProps) {
    // elije las clases de color según visual + color
    const visualKey = visual in colorTokens ? visual : "flat";
    const colorClass = (colorTokens as any)[visualKey][color] ?? (colorTokens as any)[visualKey].default;

    const classes = twMerge(
        clsx(
            base({ size, visual }),
            colorClass,
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