import { Icon } from "@iconify-icon/react";

type Props = {
    message?: string;
    message2?: string;
    variant?: "info" | "success" | "warning";
};

export default function Msj({ message, message2, variant = "info" }: Props) {
    const styles = {
        info: {
            container:
                "border-blue-200/60 bg-blue-50/80 text-blue-800 " +
                "dark:border-blue-500/25 dark:bg-blue-500/10 dark:text-blue-300",
            bar: "bg-blue-400 dark:bg-blue-500",
            icon: "flat-color-icons:info",
            iconColor: "text-blue-500 dark:text-blue-400",
            label: "Info",
        },
        success: {
            container:
                "border-emerald-200/60 bg-emerald-50/80 text-emerald-800 " +
                "dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300",
            bar: "bg-emerald-400 dark:bg-emerald-500",
            icon: "mdi:check-circle-outline",
            iconColor: "text-emerald-500 dark:text-emerald-400",
            label: "Success",
        },
        warning: {
            container:
                "border-amber-200/60 bg-amber-50/80 text-amber-800 " +
                "dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300",
            bar: "bg-amber-400 dark:bg-amber-500",
            icon: "mdi:alert-circle-outline",
            iconColor: "text-amber-500 dark:text-amber-400",
            label: "Warning",
        },
    };

    const s = styles[variant];

    return (
        <div
            className={`
                relative flex items-start gap-3
                pl-4 pr-4 py-3 rounded-xl border
                shadow-xs overflow-hidden
                backdrop-blur-sm
                transition-all duration-200
                ${s.container}
            `}
        >
            {/* Accent bar izquierda */}
            <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${s.bar}`}
            />

            <Icon
                icon={s.icon}
                width="18"
                height="18"
                className={`mt-[2px] shrink-0 ${s.iconColor}`}
            />

            <div className="flex flex-col gap-0.5 min-w-0">
                {message && (
                    <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                        {message}
                    </p>
                )}
                {message2 && (
                    <p className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap">
                        {message2}
                    </p>
                )}
            </div>
        </div>
    );
}