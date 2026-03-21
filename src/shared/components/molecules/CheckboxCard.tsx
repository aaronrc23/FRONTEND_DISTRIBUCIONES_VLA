type CheckboxCardVariant = "primary" | "success" | "danger" | "warning" | "slate" | "purple" | "primaryVariant";

interface CheckboxCardProps {
    checked: boolean;
    variant?: CheckboxCardVariant;
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

const cardVariants: Record<CheckboxCardVariant, {
    active: string;
    inactive: string;
}> = {
    primary: {
        active: "border-blue-500 dark:border-blue-600 ",
        inactive: "border-border hover:border-blue-300 dark:hover:border-blue-600",
    },
    primaryVariant: {
        active: "border-primary-variant ",
        inactive: "border-border ",
    },
    purple: {
        active: "border-purple-500 dark:border-purple-600 ",
        inactive: "border-border hover:border-purple-300 dark:hover:border-purple-600",
    },
    success: {
        active: "border-emerald-500 dark:border-emerald-600 ",
        inactive: "border-border hover:border-emerald-300 dark:hover:border-emerald-600",
    },
    danger: {
        active: "border-rose-500 dark:border-rose-600 ",
        inactive: "border-border hover:border-rose-300 dark:hover:border-rose-600",
    },
    warning: {
        active: "border-amber-500 dark:border-amber-600 ",
        inactive: "border-border hover:border-amber-300 dark:hover:border-amber-600",
    },
    slate: {
        active: "border-slate-500 dark:border-slate-600 dark:border-slate-600",
        inactive: "border-border hover:border-slate-300 dark:hover:border-slate-600",
    },
};


export function CheckboxCard({
    checked,
    variant = "primary",
    title,
    description,
    children,
    className = "",
}: CheckboxCardProps) {
    const currentVariant = cardVariants[variant];

    return (
        <div
            className={`
        flex items-center gap-3 p-4 rounded-xl bg-input border border-2 cursor-pointer
        transition-all
        ${checked ? currentVariant.active : currentVariant.inactive}
        ${className}
      `}
        >
            {children}

            <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                {description && (
                    <p className="text-xs text-foreground-2">{description}</p>
                )}
            </div>
        </div>
    );
}
