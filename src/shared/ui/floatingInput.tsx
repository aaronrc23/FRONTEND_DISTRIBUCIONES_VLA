import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { Icon } from "@iconify-icon/react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";


type InputSize = "sm" | "md" | "lg";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: string;
    inputsize?: InputSize;
    error?: string;
    clsContainer?: string;
    clsInput?: string;
    clsLabel?: string;
    clsIcon?: string;

    showPasswordToggle?: boolean;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
    (
        {
            label,
            icon,
            type = "text",
            inputsize = "md",
            clsContainer,
            clsInput,
            clsLabel,
            clsIcon,
            showPasswordToggle = true,
            className,
            value,
            error,
            onChange,
            ...props
        },
        ref
    ) => {

        const [isFocused, setIsFocused] = useState(false);
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === "password";
        const isFloating = isFocused || !!value;

        const sizeStyles: Record<InputSize, string> = {
            sm: "py-2 text-sm",
            md: "py-3 text-sm",
            lg: "py-4 text-base"
        };

        return (
            <div className={cn("relative w-full", className)}>
                <div
                    className={cn(
                        "relative flex items-center rounded-xl border transition-all duration-200",
                        "bg-input",
                        "shadow-sm hover:shadow-md",
                        sizeStyles[inputsize],

                        error
                            ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                            : "border-gray-300 dark:border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",

                        clsContainer
                    )}
                >

                    <div
                        className={cn(
                            "pl-3 flex items-center transition-colors",
                            error ? "text-red-500" : "text-foreground/40",
                            clsIcon
                        )}
                    >
                        {icon && <Icon icon={icon} className="w-5 h-5 tex-xl" />}
                    </div>

                    <label
                        className={cn(
                            "absolute left-10 transition-all duration-200 pointer-events-none",
                            "bg-input px-1",
                            isFloating
                                ? cn(
                                    "-top-2 text-xs font-medium ",
                                    error ? "text-red-500" : "text-foreground"
                                )
                                : `top-1/2 -translate-y-1/2 text-sm  ${error ? "text-red-500" : "text-foreground/70"}`,
                            clsLabel
                        )}
                    >
                        {label}
                    </label>

                    <input
                        {...props}
                        ref={ref}
                        type={isPassword ? (showPassword ? "text" : "password") : type}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={cn(
                            "w-full bg-transparent outline-none px-3 text-gray-800 dark:text-gray-100 placeholder-transparent",
                            clsInput
                        )}
                    />

                    <div className="flex items-center gap-2">
                        {isPassword && showPasswordToggle && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        )}
                        {error && <AlertCircle size={18} className="text-red-500 mr-5" />}
                    </div>
                </div>
                <div className="w-full text-start pt-1">
                    {error && (
                        <span className="text-xs text-red-500 ml-1 font-normal animate-in fade-in slide-in-from-top-1">
                            {error}
                        </span>
                    )}
                </div>

            </div>

        );
    }
);

FloatingInput.displayName = "FloatingInput";