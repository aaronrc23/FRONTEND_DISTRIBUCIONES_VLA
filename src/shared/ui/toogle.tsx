import React from "react";
import clsx from "clsx";

type ToggleSize = "sm" | "md" | "lg";

interface ToggleProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: ToggleSize;
    label?: string;
    className?: string;
}

const sizes = {
    sm: {
        track: "w-9 h-5",
        thumb: "w-4 h-4",
        on: "translate-x-4",
        off: "translate-x-1",
    },
    md: {
        track: "w-11 h-6",
        thumb: "w-5 h-5",
        on: "translate-x-5",
        off: "translate-x-1",
    },
    lg: {
        track: "w-14 h-7",
        thumb: "w-6 h-6",
        on: "translate-x-7",
        off: "translate-x-1",
    },
};


export const Toggle: React.FC<ToggleProps> = ({
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    size = "md",
    label,
    className,
}) => {
    const [internalChecked, setInternalChecked] =
        React.useState(defaultChecked);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleToggle = () => {
        if (disabled) return;
        if (!isControlled) setInternalChecked(!isChecked);
        onChange?.(!isChecked);
    };

    return (
        <label
            className={clsx(
                "inline-flex items-center gap-2 cursor-pointer select-none",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                onClick={handleToggle}
                className={clsx(
                    "relative inline-flex items-center rounded-full transition-colors",
                    sizes[size].track,
                    isChecked ? "bg-green-600" : "bg-slate-400/90 dark:bg-slate-600/90",
                    disabled && "pointer-events-none"
                )}
            >
                <span
                    className={clsx(
                        "absolute rounded-full bg-white shadow",
                        "transition-transform duration-200 ease-in-out",
                        sizes[size].thumb,
                        isChecked ? sizes[size].on : sizes[size].off
                    )}
                />

            </button>

            {label && (
                <span className="text-sm text-foreground">{label}</span>
            )}
        </label>
    );
};
