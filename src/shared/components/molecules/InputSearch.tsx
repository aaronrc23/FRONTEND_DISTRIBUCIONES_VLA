import React, { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import { useFloating, offset, flip, size, autoUpdate } from "@floating-ui/react-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Input } from "../../ui";
import { cn } from "../../../lib/utils";
import useDebounce from "../../hooks/useDebounce";



interface Option {
    id: string | number;
    label: string;
    [key: string]: any;
}

interface Props {
    label?: string;
    placeholder?: string;
    fetchOptions: (query: string) => Promise<Option[]>;
    onSelect?: (option: Option) => void;
    debounceTime?: number;
}

export default function InputSearch({
    label,
    placeholder = "Buscar...",
    fetchOptions,
    onSelect,
    debounceTime = 400
}: Props) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, debounceTime);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [open, setOpen] = useState(false);

    // floating
    const { refs, floatingStyles } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "bottom-start",
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(6),
            flip(),
            size({
                apply({ rects, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                    });
                },
            }),
        ],
    });

    // click outside
    const clickRef = useClickOutside(() => setOpen(false));

    // unir refs
    const setRefs = (node: HTMLDivElement) => {
        (clickRef as any).current = node;
        refs.setReference(node);
    };

    // search debounce
    useEffect(() => {
        if (!debouncedQuery) {
            setOptions([]);
            setOpen(false);
            return;
        }

        let active = true;
        setLoading(true);

        fetchOptions(debouncedQuery)
            .then((data) => {
                if (active) {
                    setOptions(data);
                    setOpen(true);
                }
            })
            .catch(console.error)
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [debouncedQuery]);

    const handleSelect = (opt: Option) => {
        setQuery(opt.label);
        setOpen(false);
        onSelect?.(opt);
    };

    return (
        <div className="relative w-full" ref={setRefs}>
            <Input
                label={label}
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                leftIcon={<Search size={18} />}
                className="pr-10"
            />

            {/* loader */}
            <div className="absolute right-3 top-[38px]">
                {loading && (
                    <Loader2 className="animate-spin text-primary" size={18} />
                )}
            </div>

            {/* dropdown sin portal */}
            {open && options.length > 0 && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className={cn(
                        "z-50 rounded-xl border bg-white dark:bg-zinc-900",
                        "shadow-lg overflow-hidden",
                        "animate-in fade-in slide-in-from-top-2 duration-200"
                    )}
                >
                    <ul className="max-h-60 overflow-y-auto">
                        {options.map((opt) => (
                            <li
                                key={opt.id}
                                onClick={() => handleSelect(opt)}
                                className="px-4 py-2 cursor-pointer text-sm hover:bg-primary/10 transition-all duration-150"
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
