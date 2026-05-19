
import { Icon } from "@iconify-icon/react";
import { Card, Texto } from "../../../../../shared/ui";
import type React from "react";

interface Props {
    title?: React.ReactNode;
    icon?: string;
    iconClass?: string;
    children: React.ReactNode;
}

export default function FormSection({
    title,
    icon,
    iconClass,
    children,
}: Props) {
    return (
        <Card className="p-7 flex flex-col gap-6 w-full  ">
            <div className="flex gap-2 items-center w-full">

                {icon && <div className="flex items-center p-2 rounded-xl bg-accent text-foreground/80"><Icon icon={icon} className={`text-xl ${iconClass}`} /></div>}
                <Texto className="font-semibold text-base">{title}</Texto>
            </div>

            {children}
        </Card>
    );
}