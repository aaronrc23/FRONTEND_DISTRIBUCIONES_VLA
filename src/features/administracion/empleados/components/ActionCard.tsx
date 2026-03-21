

import { Icon } from "@iconify-icon/react";
import { cn } from "../../../../lib/utils";

interface ActionCardProps {
    label: string;
    icon: string;
    checked?: boolean;
    variant?: "default" | "destructive";
    onToggle?: () => void;
}

export function ActionCard({
    label,
    icon,
    checked = false,
    variant = "default",
    onToggle,
}: ActionCardProps) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={onToggle}
            className={cn(
                "flex flex-col items-center justify-center cursor-pointer gap-1",
                "h-16 w-16 rounded-lg border text-xs font-medium",
                "transition-all focus:outline-none",
                "",

                checked
                    ? "border-primary bg-primary/10 text-primary "
                    : "border-border text-muted-foreground hover:border-primary hover:bg-primary/5",

                variant === "destructive" &&
                checked &&
                "border-destructive bg-destructive/10 text-destructive ring-destructive"
            )}
        >
            <Icon icon={icon} className="text-xl" />
            <span>{label}</span>
        </button>
    );
}
