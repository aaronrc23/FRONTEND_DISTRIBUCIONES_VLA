import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "../../lib/utils"

function Tabs({
    className,
    orientation = "horizontal",
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            data-orientation={orientation}
            orientation={orientation}
            className={cn(
                "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
                className
            )}
            {...props}
        />
    )
}

const tabsListVariants = cva(
    "group/tabs-list inline-flex w-fit items-center justify-center rounded-xl p-1 text-muted-foreground group-data-[orientation=horizontal]/tabs:h-10 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
    {
        variants: {
            variant: {
                default: "bg-muted/70",
                line: "gap-1 bg-transparent rounded-none",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function TabsList({
    className,
    variant = "default",
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            data-variant={variant}
            className={cn(tabsListVariants({ variant }), className)}
            {...props}
        />
    )
}

function TabsTrigger({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "relative inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200",
                "text-muted-foreground hover:text-foreground",
                "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                "focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:outline-1",
                "disabled:pointer-events-none disabled:opacity-50",
                "group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",
                "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none group-data-[variant=line]/tabs-list:data-[state=active]:text-primary",
                "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className
            )}
            {...props}
        />
    )
}

function TabsContent({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn("flex-1 outline-none mt-2 animate-in fade-in-50 duration-200", className)}
            {...props}
        />
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
