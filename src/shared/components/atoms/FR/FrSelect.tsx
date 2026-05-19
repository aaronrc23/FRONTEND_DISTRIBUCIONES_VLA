import { useController, type Control } from "react-hook-form";
import { Icon } from "@iconify-icon/react";
import { cn } from "../../../../lib/utils";


interface Option {
    label: string;
    value: string;
}

type SelectSize = "sm" | "md" | "lg";

const selectSizes: Record<SelectSize, string> = {
    sm: "py-2 text-sm px-2",
    md: "py-3 text-sm px-3",
    lg: "py-4 text-base px-4",
};

interface FrSelectProps {
    name: string;
    control: Control<any>;
    label?: string;
    required?: boolean;
    options: Option[];
    placeholder?: string;
    defaultValue?: string;
    leftIcon?: string;
    className?: string;
    isLoading?: boolean;
    size?: SelectSize;
}

export function FrSelect({
    name,
    control,
    label,
    required,
    options,
    placeholder = "Seleccionar...",
    defaultValue = "",
    leftIcon,
    className,
    size = "md",
    isLoading,
}: FrSelectProps) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
    });

    return (
        <div className="w-full flex flex-col gap-1.5">
            {label && (
                <label
                    htmlFor={name}
                    className={cn(
                        "text-sm font-medium",
                        error ? "text-red-500" : "text-gray-600 dark:text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <Icon
                        icon={leftIcon}
                        className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2 opacity-70 pointer-events-none",
                            size === "sm" && "text-sm",
                            size === "md" && "text-base",
                            size === "lg" && "text-lg"
                        )}
                    />
                )}

                <select
                    id={name}
                    {...field}
                    disabled={isLoading}
                    className={cn(
                        "w-full appearance-none rounded-xl border border-border-input bg-input text-foreground outline-none transition",
                        "focus:ring-2 focus:ring-primary",
                        error && "border-red-500 focus:ring-red-500",
                        leftIcon && "pl-9",
                        selectSizes[size],
                        className
                    )}
                >
                    <option value="" disabled className="text-muted-foreground">
                        {isLoading ? "Cargando..." : placeholder}
                    </option>

                    {!isLoading &&
                        options.map((opt) => (
                            <option key={opt.value} value={opt.value} className="text-foreground">
                                {opt.label}
                            </option>
                        ))}
                </select>

                {/* Flechita custom */}

            </div>

            {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
    );
}