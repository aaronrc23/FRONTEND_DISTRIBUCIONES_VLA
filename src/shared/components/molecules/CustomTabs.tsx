
import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";


interface TabItem {
    value: string;
    label: string;
    content: ReactNode;
}

interface CustomTabsProps {
    tabs: TabItem[];
    defaultValue?: string;
    className?: string;
    variants?: "default" | "line";
}

export default function CustomTabs({
    tabs,
    defaultValue,
    className,
    variants
}: CustomTabsProps) {
    return (
        <Tabs defaultValue={defaultValue || tabs[0]?.value} className={`w-auto  ${className}`}>

            {/* HEADER */}
            <TabsList variant={variants} className="w-auto p-1 group-data-[orientation=horizontal]/tabs:h-10  bg-secondary/50 backdrop-blur-sm">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:bg-card p-1 font-semibold data-[state=active]:text-foreground px-4 py-2"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {/* CONTENT */}
            {tabs.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="mt-4 animate-in fade-in-50"
                >
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
