
import { useState } from "react"
import { Icon } from "@iconify-icon/react"
import type { VariantProps } from "class-variance-authority"
import {
    Button, Popover,
    PopoverContent,
    PopoverTrigger,
    buttonVariants
} from "../../../ui"
import { cn } from "../../../../lib/utils"

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]


interface OptionAction {
    label: string
    icon?: string
    onClick: () => void
    disabled?: boolean
    variant?: "default" | "destructive"
}

interface OptionButtonProps {
    actions: OptionAction[]
    align?: "start" | "center" | "end"
    icon?: string
    clsicon?: string
    variant?: ButtonVariant
}

export const BtnOpcion = ({
    actions,
    align = "end",
    icon,
    clsicon,
    variant
}: OptionButtonProps) => {
    const [open, setOpen] = useState(false)

    const handleClick = (action: OptionAction) => {
        action.onClick()
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={variant || "ghost"}
                    size="icon"
                    className={cn("h-8 w-8 rounded-md cursor-pointer", variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80")}
                >
                    <Icon icon={icon || "lucide:more-vertical"} width="16" className={clsicon} />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align={align}
                className="w-auto p-1 rounded-xl border-2  border-border/50 shadow-lg"
            >
                <div className="flex flex-col gap-1">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            disabled={action.disabled}
                            onClick={() => handleClick(action)}
                            className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                                "hover:bg-muted",
                                action.disabled && "opacity-50 cursor-not-allowed",
                                action.variant === "destructive" &&
                                "text-red-500 hover:bg-red-50 dark:hover:bg-red-700/60 dark:hover:text-red-50"
                            )}
                        >
                            {action.icon && (
                                <Icon icon={action.icon} width="14" />
                            )}
                            {action.label}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}