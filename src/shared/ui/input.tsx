import React, { useState, forwardRef, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
/**
 * Tipos para las variantes y tamaños del componente
 */
type InputVariant = 'outline' | 'filled' | 'underline' | 'secondary';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: InputVariant;
    inputSize?: InputSize;
    leftIcon?: React.ReactNode;
    required?: boolean;
    fullWidth?: boolean;
    clsInput?: string;
    clsLabel?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            variant = 'outline',
            inputSize = 'md',
            leftIcon,
            fullWidth = true,
            type,
            required,
            clsInput,
            clsLabel,
            className = '',
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';

        // Lógica de estilos base
        const baseStyles =
            "relative flex items-center placeholder:text-slate-500 dark:placeholder:text-secondary/50  transition-all duration-200 rounded-lg ring-3  border-2 focus-within:ring-2 focus-within:ring-primary shadow-none 600 placeholder:text-gray-500";


        // Variantes de Tailwind
        const variantStyles: Record<InputVariant, string> = {
            outline: "border-none ring-border-input dark:border-border bg-input focus-within:ring-primary dark:focus-within:ring-blue-500",
            filled: " bg-gray-100 dark:bg-gray-800 focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:ring-primary ",
            underline: "border-b-2 border-t-0 border-x-0 rounded-none px-0 bg-transparent focus-within:border-blue-500",
            secondary: "bg-secondary/70 border-transparent border-0 font-medium focus-within:border-none focus-within:ring-0"
        };

        // Tamaños de Tailwind
        const sizeStyles: Record<InputSize, string> = {
            sm: "py-2 px-3 text-sm",
            md: "py-3 px-4 text-sm",
            lg: "py-2.5 px-4 text-base"
        };

        const errorStyles = error
            ? "ring-2 ring-destructive/55 focus-within:ring-destructive focus-within:ring-destructive/55"
            : "ring-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary";


        const togglePasswordVisibility = () => setShowPassword(!showPassword);

        return (
            <div className={`${fullWidth ? 'w-full' : 'w-auto'} flex flex-col gap-1.5 `}>
                {label && (
                    <label className={cn("text-sm  ml-1 text-start ", clsLabel, error ? "text-destructive font-normal" : "  tracking-tight ")} >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}

                <div
                    className={cn(
                        baseStyles,
                        variantStyles[variant],
                        sizeStyles[inputSize],
                        errorStyles,
                        className // <- aquí ya puede sobrescribir
                    )}
                >

                    {/* Icono Izquierdo */}
                    {leftIcon && (
                        <div className="mr-2 text-gray-400 dark:text-gray-500 flex items-center">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        {...props}
                        ref={ref}
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        className={cn(
                            "w-full bg-transparent outline-none border-none p-0 placeholder-gray-500 dark:placeholder-gray-400 text-foreground/90",
                            clsInput
                        )}
                        
                    />

                    {/* Icono de Password / Error */}
                    <div className="flex items-center gap-2 ml-2">
                        {isPassword && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                aria-label="ver contraseña"
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                        {error && <AlertCircle size={18} className="text-red-500" />}
                    </div>
                </div>

                {error && (
                    <span className="text-xs text-start text-red-500 ml-1 font-normal animate-in fade-in slide-in-from-top-1">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
