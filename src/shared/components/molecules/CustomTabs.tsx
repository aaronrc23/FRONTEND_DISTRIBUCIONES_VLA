import { type ReactNode, useRef, useEffect, useCallback, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { cn } from "../../../lib/utils";

interface TabItem {
    value: string;
    label: string;
    content: ReactNode;
}

interface CustomTabsProps {
    tabs: TabItem[];
    defaultValue?: string;
    className?: string;
    variants?: "default" | "line" | "bordered";
    onValueChange?: (value: string) => void;
}

export default function CustomTabs({
    tabs,
    defaultValue,
    className,
    variants,
    onValueChange
}: CustomTabsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    /* ── Detectar overflow y actualizar indicadores ── */
    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const tolerance = 2;
        setCanScrollLeft(el.scrollLeft > tolerance);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
    }, []);

    /* ── Scroll automático al tab activo ── */
    const scrollToTab = useCallback((value: string) => {
        const trigger = triggerRefs.current.get(value);
        const container = scrollRef.current;
        if (!trigger || !container) return;

        const triggerRect = trigger.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const offset = triggerRect.left - containerRect.left + container.scrollLeft - containerRect.width / 2 + triggerRect.width / 2;
        container.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
    }, []);

    /* ── Efectos de scroll ── */
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateScrollState();
        el.addEventListener("scroll", updateScrollState, { passive: true });
        const observer = new ResizeObserver(updateScrollState);
        observer.observe(el);
        return () => {
            el.removeEventListener("scroll", updateScrollState);
            observer.disconnect();
        };
    }, [updateScrollState]);

    /* ── Auto-scroll al tab por defecto al montar ── */
    useEffect(() => {
        const initial = defaultValue || tabs[0]?.value;
        if (initial) scrollToTab(initial);
    }, [defaultValue, scrollToTab, tabs]);

    const handleValueChange = (value: string) => {
        scrollToTab(value);
        onValueChange?.(value);
    };

    const scrollByAmount = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: direction === "left" ? -el.clientWidth * 0.6 : el.clientWidth * 0.6, behavior: "smooth" });
    };

    return (
        <Tabs defaultValue={defaultValue || tabs[0]?.value} onValueChange={handleValueChange} className={cn("w-auto", className)}>

            {/* HEADER */}
            <div className="relative group/tabs-wrapper">
                {/* Botón izquierda */}
                {canScrollLeft && (
                    <button
                        onClick={() => scrollByAmount("left")}
                        className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-r from-card via-card/90 to-transparent opacity-0 group-hover/tabs-wrapper:opacity-100 transition-opacity duration-200 cursor-pointer"
                        tabIndex={-1}
                        aria-label="Desplazar tabs hacia la izquierda"
                    >
                        <Icon icon="mdi:chevron-left" className="text-lg text-muted-foreground" />
                    </button>
                )}

                {/* Tabs scrollable */}
                <TabsList
                    ref={scrollRef}
                    variant={variants}
                    className="w-full sm:w-fit overflow-x-auto flex-nowrap scrollbar-none scroll-smooth"
                >
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            ref={(el) => {
                                if (el) triggerRefs.current.set(tab.value, el);
                                else triggerRefs.current.delete(tab.value);
                            }}
                            className="px-3.5 py-2 text-sm sm:text-sm sm:px-4 sm:py-2"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Botón derecha */}
                {canScrollRight && (
                    <button
                        onClick={() => scrollByAmount("right")}
                        className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-l from-card via-card/90 to-transparent opacity-0 group-hover/tabs-wrapper:opacity-100 transition-opacity duration-200 cursor-pointer"
                        tabIndex={-1}
                        aria-label="Desplazar tabs hacia la derecha"
                    >
                        <Icon icon="mdi:chevron-right" className="text-lg text-muted-foreground" />
                    </button>
                )}

                {/* Bordes fade indicators */}
                <div
                    className={cn(
                        "absolute left-0 top-0 bottom-0 w-6 pointer-events-none transition-opacity duration-200 sm:hidden",
                        "bg-gradient-to-r from-card to-card/0",
                        canScrollLeft ? "opacity-100" : "opacity-0"
                    )}
                />
                <div
                    className={cn(
                        "absolute right-0 top-0 bottom-0 w-6 pointer-events-none transition-opacity duration-200 sm:hidden",
                        "bg-gradient-to-l from-card to-card/0",
                        canScrollRight ? "opacity-100" : "opacity-0"
                    )}
                />
            </div>

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
