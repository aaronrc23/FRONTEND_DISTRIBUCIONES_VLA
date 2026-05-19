import React from "react";
import { useController, type Control } from "react-hook-form";
import { Icon } from "@iconify-icon/react";
import { cn } from "../../../../lib/utils";
import { FloatingInput } from "../../../ui/floatingInput";
import { Input } from "../../../ui/input";

interface FrInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    required?: boolean;
    defaultValue?: string; // <-- opcional
    leftIcon?: string;
    clsLabel?: string;
    clsInput?: string;
    inputSize?: "lg" | "md" | "sm";
    modo?: "default" | "floating"
}

export function FrInput({
    name,
    control,
    label,
    required,
    className,
    leftIcon,
    defaultValue = "", // fallback aquí
    clsLabel,
    clsInput,
    inputSize,
    modo,
    ...props
}: FrInputProps) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue, // importante: evita undefined
    });

    return (
        <div className="w-full">

            {modo === "floating" ? (

                <FloatingInput
                    {...field}
                    {...props}
                    label={label || ""}
                    icon={leftIcon}
                    inputsize={inputSize}
                    clsLabel={clsLabel}
                    clsInput={clsInput}
                    className={className}
                    error={error?.message}
                />

            ) : (

                <Input
                    {...field}
                    {...props}
                    label={label}
                    required={required}
                    leftIcon={leftIcon ? <Icon icon={leftIcon} /> : null}
                    className={cn("w-full", className)}
                    variant="outline"
                    inputSize={inputSize}
                    clsLabel={cn("font-medium text-foreground/80 dark:text-foreground", clsLabel)}
                    clsInput={clsInput}
                    error={error?.message}
                   
                />

            )}

        </div>
    );
}
