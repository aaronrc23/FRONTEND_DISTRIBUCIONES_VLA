
import { useState } from "react";
import { cn } from "../../../../lib/utils";

const variantStyles = {
    default: "text-muted-foreground hover:text-foreground",
    underline: "text-muted-foreground hover:text-foreground",
    pill: "text-muted-foreground hover:text-foreground",
};

const activeVariantStyles = {
    default: "text-foreground font-semibold bg-muted/80",
    underline:
        "text-foreground font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-primary after:rounded-full after:transition-all",
    pill: "bg-card text-foreground shadow-sm rounded-lg",
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
        <div className="w-full flex flex-col items-start">
            {/* Tabs Header */}
            <div className="flex gap-1 bg-muted/60 p-1 rounded-xl mb-3">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-5 py-2 text-sm font-medium transition-all duration-200 relative rounded-lg",
                            variantStyles[variant],
                            activeTab === tab.id && activeVariantStyles[variant]
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="w-full animate-in fade-in-50 duration-200">
                {activeContent?.content}
            </div>
        </div>
    );
}