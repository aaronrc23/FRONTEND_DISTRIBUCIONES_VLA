
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
        <Tabs defaultValue={defaultValue || tabs[0]?.value} className={`w-auto ${className ?? ""}`}>

            {/* HEADER */}
            <TabsList variant={variants} className="w-auto">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="px-4 py-2"
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
                    className="mt-3"
                >
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
