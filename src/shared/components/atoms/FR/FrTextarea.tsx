
import React from "react";
import { useController, type Control } from "react-hook-form";
import { cn } from "../../../../lib/utils";


interface FrTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    control: Control<any>;
    label?: string;
    required?: boolean;
    defaultValue?: string;
    clsLabel?: string;
    clsTextarea?: string;
    textareaSize?: "lg" | "md" | "sm";
}

const sizeStyles = {
    sm: "min-h-[80px] text-sm placeholder:text-sm",
    md: "min-h-[90px] text-sm placeholder:text-sm",
    lg: "min-h-[100px] text-sm placeholder:text-sm",
};

export function FrTextarea({
    name,
    control,
    label,
    required,
    className,
    defaultValue = "",
    clsLabel,
    clsTextarea,
    textareaSize = "md",
    ...props
}: FrTextareaProps) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
    });

    return (
        <div className="space-y-1">
            {label && (
                <label
                    className={cn(
                        `block text-sm font-medium ${error ? "text-red-500" : "text-foreground"}`,
                        clsLabel
                    )}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <textarea
                {...field}
                {...props}
                className={cn(
                    "w-full rounded-md border-2 border-border-input  bg-input px-3 py-2",
                    "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
                    sizeStyles[textareaSize],
                    className,
                    clsTextarea
                )}
            />

            {error?.message && (
                <p className="text-xs text-red-500">{error.message}</p>
            )}
        </div>
    );
}
