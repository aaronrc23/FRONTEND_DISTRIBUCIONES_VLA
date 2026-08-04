import * as React from "react"
import { cn } from "../../lib/utils"


type TableVariant = "default" | "glass" | "soft" | "minimal"

interface TableUIProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: TableVariant
}

export function TableUI({
    className,
    variant = "glass",
    ...props
}: TableUIProps) {
    const variants: Record<TableVariant, string> = {
        default:
            "rounded-xl  bg-table-bg ",
        glass:
            "rounded-xl border border-border/90 bg-table-bg/5 backdrop-blur-xl shadow-lg",
        soft:
            "rounded-xl bg-muted/40 border border-border/30 shadow-inner",
        minimal:
            "rounded-xl"
    }

    return (
        <div
            className={cn(
                "w-full overflow-hidden transition-all duration-300",
                variants[variant],
                className
            )}
            {...props}
        />
    )
}

export function TableBase({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
    return (
        <table
            className={cn(
                "w-full caption-bottom text-sm",
                className
            )}
            {...props}
        />
    )
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr
            className={cn(
                "border-b border-border/40 transition-colors duration-200 hover:bg-muted/50",
                className
            )}
            {...props}
        />
    )
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td
            className={cn(
                "px-4 py-3 align-middle text-foreground/90",
                className
            )}
            {...props}
        />
    )
}