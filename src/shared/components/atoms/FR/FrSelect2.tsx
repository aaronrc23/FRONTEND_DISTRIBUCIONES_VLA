import { useController, type Control } from "react-hook-form";
import { Icon } from "@iconify-icon/react";
import { cn } from "../../../../lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

interface Option {
    label: string;
    value: string;
}

type SelectSize = "sm" | "md" | "lg";

const selectSizes: Record<SelectSize, string> = {
    sm: "h-9 text-xs px-2",
    md: "h-11  text-sm px-3",
    lg: "h-12 text-base px-4",
};

const iconSizes: Record<SelectSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
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
    disabled?: boolean;
}

export function FrSelect2({
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
    disabled,
}: FrSelectProps) {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control, defaultValue });

    const isDisabled = disabled || isLoading;

    return (
        <div className="w-full flex flex-col gap-1.5">

            {/* ── Label ── */}
            {label && (
                <label
                    htmlFor={name}
                    className={cn(
                        "text-sm font-medium leading-none",
                        error ? "text-destructive" : "text-gray-600 dark:text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="ml-1 text-destructive">*</span>}
                </label>
            )}

            {/* ── Wrapper ── */}
            <div className="relative">

                {/* Icono izquierdo */}
                {leftIcon && (
                    <Icon
                        icon={leftIcon}
                        className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none",
                            "text-muted-foreground",
                            iconSizes[size]
                        )}
                    />
                )}

                <Select
                    value={field.value}
                    onValueChange={(value) => {
                        field.onChange(value);
                    }}
                    disabled={isDisabled}
                >
                    {/* ── Trigger ── */}
                    <SelectTrigger
                        onBlur={field.onBlur}
                        className={cn(
                            "w-full rounded-xl border-2 border-border-input bg-input font-normal",
                            "border-border-input",
                            "text-foreground",
                            "data-[placeholder]:text-muted-foreground",
                            // hover
                            "hover:border-border transition-all duration-150",
                            // focus
                            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                            // disabled
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            // error
                            error && "border-destructive focus:ring-destructive/20 focus:border-destructive",
                            leftIcon && "pl-9",
                            selectSizes[size],
                            className
                        )}
                    >
                        <SelectValue>
                            {options.find((opt) => opt.value === field.value)?.label ??
                                (isLoading ? "Cargando..." : placeholder)}
                        </SelectValue>
                    </SelectTrigger>

                    {/* ── Dropdown ── */}
                    <SelectContent
                        alignItemWithTrigger={false}
                        className={cn(
                            "z-50 overflow-hidden rounded-xl border p-1.5",
                            // tokens del sistema
                            "bg-popover text-popover-foreground",
                            "border-border",
                            // sombra
                            "shadow-lg shadow-black/10",
                            // animación
                            "animate-in fade-in-0 zoom-in-95 duration-150",
                            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                        )}
                    >


                        {/* Items */}
                        {options.length > 0 ? (
                            options.map((opt) => (
                                <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    className={cn(
                                        "relative flex cursor-pointer select-none items-center",
                                        "rounded-lg px-3 font-normal py-2.5 text-sm outline-none",
                                        "text-popover-foreground",
                                        // hover / focus
                                        "transition-colors duration-100",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        "focus:bg-accent focus:text-accent-foreground",
                                        // seleccionado
                                        "data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary",
                                    )}
                                >
                                    {opt.label}
                                </SelectItem>
                            ))
                        ) : (
                            /* Empty state */
                            <div className="flex flex-col items-center gap-1.5 px-4 py-6 text-center">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Sin opciones
                                </p>
                                <p className="text-xs text-muted-foreground/60">
                                    No hay elementos disponibles
                                </p>
                            </div>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* ── Error ── */}
            {error && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive shrink-0" />
                    {error.message}
                </p>
            )}
        </div>
    );
}