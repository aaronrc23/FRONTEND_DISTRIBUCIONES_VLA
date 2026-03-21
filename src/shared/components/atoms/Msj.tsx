
import { Icon } from "@iconify-icon/react";

type Props = {
    message?: string;
    message2?: string;
    variant?: "info" | "success" | "warning";
};

export default function Msj({ message, message2, variant = "info" }: Props) {
    const styles = {
        default: {
            container:
                " border-slate-200 text-foreground shadow-sm",
            icon: "flat-color-icons:info",
            iconColor: "text-slate-500",
        },
        info: {
            container:
                " border-info/20 text-info bg-info/10 shadow-sm",
            icon: "flat-color-icons:info",
            iconColor: "text-info",
        },
        success: {
            container:
                "bg-emerald-50 border-emerald-200 text-emerald-700",
            icon: "mdi:check-circle-outline",
            iconColor: "text-emerald-500",
        },
        warning: {
            container:
                "bg-amber-50 border-amber-200 text-amber-700",
            icon: "mdi:alert-circle-outline",
            iconColor: "text-amber-500",
        },
    };

    const s = styles[variant];

    return (
        <div
            className={`
        flex items-start gap-3
        p-3 rounded-xl border
        shadow-xs
        backdrop-blur-[2px]
        transition-all duration-200
        ${s.container}
      `}
        >
            <Icon
                icon={s.icon}
                width="20"
                height="20"
                className={`mt-[2px] ${s.iconColor}`}
            />
            <div>
                <p className="flex-1 text-sm leading-relaxed  whitespace-pre-wrap">
                    {message}
                </p>
                <p className="flex-1 text-sm leading-relaxed  whitespace-pre-wrap">
                    {message2}
                </p>
            </div>
        </div>
    );
}
