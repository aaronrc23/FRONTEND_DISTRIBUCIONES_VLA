
import { useState } from "react";
import { cn } from "../../../../lib/utils";

const variantStyles = {
    default: "text-gray-500 hover:text-black",
    underline: "text-gray-500 hover:text-black",
    pill: "rounded-md text-gray-500  ",
};

const activeVariantStyles = {
    default: "text-black font-semibold",
    underline: "text-black border-b-2 border-black",
    pill: "bg-card text-foreground shadow-sm rounded-xl",
};

type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
};

interface TabsProps {
    tabs: Tab[];
    variant?: "default" | "underline" | "pill";
}

export function FrTabs({ tabs, variant = "default" }: TabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const activeContent = tabs.find(tab => tab.id === activeTab);

    return (
        <div className="w-full flex  flex-col items-start ">
            {/* Tabs Header */}
            <div className="flex gap-2 border-b border-border mb-2 bg-accent px-2 py-1 rounded-2xl">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-6 py-2 text-sm font-medium transition-all relative",
                            variantStyles[variant],
                            activeTab === tab.id && activeVariantStyles[variant]
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Animated Content */}
            <div className="relative overflow-hidden w-full">
                <div>
                    <div
                        key={activeTab}
                    >
                        {activeContent?.content}
                    </div>
                </div>
            </div>
        </div>
    );
}