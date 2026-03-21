import React, { useId } from "react";
import { useController, type Control } from "react-hook-form";

interface CheckboxProps {
    name: string;
    control: Control<any>;
    className?: string;
    label?: string;
    variant?: "primary" | "success" | "danger" | "warning" | "slate" | "purple" | "primaryVariant";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}

export const FrCheckbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            name,
            control,
            className = "",
            label,
            variant = "primary",
            size = "md",
            disabled,
        },
        ref
    ) => {
        const id = useId();

        const {
            field: { value, onChange },
        } = useController({
            name,
            control,
            defaultValue: false,
        });

        const isChecked = !!value;

        /* ================= VARIANTS ================= */
        const variants = {
            primary: {
                bg: "bg-[#506eec]",
                border: "border-[#506eec]",
                hover: "hover:border-[#506eec]",
            },
            primaryVariant: {
                bg: "bg-primary-variant",
                border: "border-primary-variant",
                hover: "hover:border-primary-variant",
            },
            slate: {
                bg: "bg-slate-500 ",
                border: "border-slate-500",
                hover: "hover:border-slate-500",
            },
            purple: {
                bg: "bg-purple-500",
                border: "border-purple-500",
                hover: "hover:border-purple-500",
            },
            warning: {
                bg: "bg-yellow-500",
                border: "border-yellow-500",
                hover: "hover:border-yellow-500",
            },
            success: {
                bg: "bg-emerald-500",
                border: "border-emerald-500",
                hover: "hover:border-emerald-500",
            },
            danger: {
                bg: "bg-rose-500",
                border: "border-rose-500",
                hover: "hover:border-rose-500",
            },
        };

        /* ================= SIZES ================= */
        const sizes = {
            sm: { box: "h-4 w-4", svg: "h-2.5 w-2.5", text: "text-sm" },
            md: { box: "h-[18px] w-[18px]", svg: "h-[10px] w-[12px]", text: "text-base" },
            lg: { box: "h-6 w-6", svg: "h-4 w-4", text: "text-lg" },
        };

        const currentVariant = variants[variant];
        const currentSize = sizes[size];

        return (
            <div
                className={`inline-flex items-center ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    } ${className}`}
            >
                {/* animation */}
                <style>
                    {`
            @keyframes checkbox-wave {
              50% { transform: scale(0.9); }
            }
            .animate-checkbox-wave {
              animation: checkbox-wave 0.35s ease;
            }
          `}
                </style>

                <input
                    ref={ref}
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    className="sr-only"
                />

                <label
                    htmlFor={id}
                    className="flex items-center cursor-pointer select-none"
                >
                    {/* Checkbox box */}
                    <span
                        className={`
              relative flex items-center justify-center rounded-[3px] border
              transition-all duration-200
              ${currentSize.box}
              ${isChecked
                                ? `${currentVariant.bg} ${currentVariant.border} animate-checkbox-wave`
                                : `border-input-border border-2 bg-input ${currentVariant.hover}`
                            }
            `}
                    >
                        {/* splash */}
                        <span
                            className={`
                absolute inset-0 rounded-full pointer-events-none
                transition-all duration-700
                ${currentVariant.bg}
                ${isChecked ? "scale-[3.5] opacity-0" : "scale-0 opacity-100"}
              `}
                        />

                        {/* check */}
                        <svg
                            viewBox="0 0 12 10"
                            className={`relative z-10 fill-none stroke-white stroke-[2] ${currentSize.svg}`}
                            style={{
                                strokeDasharray: "16px",
                                strokeDashoffset: isChecked ? "0px" : "16px",
                                transition: "stroke-dashoffset 0.2s ease",
                            }}
                        >
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>

                    {label && (
                        <span className={`ml-2 font-normal ${currentSize.text}`}>
                            {label}
                        </span>
                    )}
                </label>
            </div>
        );
    }
);

FrCheckbox.displayName = "FrCheckbox";
