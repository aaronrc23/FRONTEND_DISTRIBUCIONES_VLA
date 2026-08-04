import { useState, useEffect } from "react";
import { Loader2, Search, X } from "lucide-react";
import { useFloating, offset, flip, size, autoUpdate } from "@floating-ui/react-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Input } from "../../ui";
import { cn } from "../../../lib/utils";
import useDebounce from "../../hooks/useDebounce";
import SearchLineIcon from '@iconify-react/majesticons/search-line';
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
    onClear?: () => void;
}

export default function InputSearch({
    label,
    placeholder = "Buscar...",
    onClear,
    fetchOptions,
    onSelect,
    debounceTime = 400,
}: Props) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, debounceTime);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    // floating
    const { refs, floatingStyles } = useFloating({
        open,
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
    const clickRef = useClickOutside(() => {
        setOpen(false);
        setActiveIndex(-1);
    });

    // unir refs
    const setRefs = (node: HTMLDivElement) => {
        (clickRef as any).current = node;
        refs.setReference(node);
    };

    // search debounce
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setOptions([]);
            setOpen(false);
            setActiveIndex(-1);
            return;
        }

        let active = true;
        setLoading(true);
        setActiveIndex(-1);

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

        return () => { active = false; };
    }, [debouncedQuery]);

    const handleSelect = (opt: Option) => {
        setQuery(opt.label);
        setOpen(false);
        setActiveIndex(-1);
        onSelect?.(opt);
    };

    const handleClear = () => {
        setQuery("");
        setOptions([]);
        setOpen(false);
        setActiveIndex(-1);
        onClear?.();
    };

    // Navegación con teclado
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!open || options.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            handleSelect(options[activeIndex]);
        } else if (e.key === "Escape") {
            setOpen(false);
            setActiveIndex(-1);
        }
    };

    const hasValue = query.length > 0;

    return (
        <div className="relative w-full" ref={setRefs}>

            {/* Label */}
            {label && (
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}

            {/* Input wrapper */}
            <div className="relative">
                {/* Icono izquierdo */}
                <span
                    className={cn(
                        " z-40 ointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150",
                        open || hasValue
                            ? "text-primary"
                            : "text-foreground"
                    )}
                >

                    <SearchLineIcon height="1em" />
                </span>

                <Input
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "h-10 w-full rounded-xl border pl-10 pr-10 font-medium text-sm",
                        "bg-white dark:bg-zinc-900",
                        "text-slate-800 dark:text-slate-100",
                        "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                        "border-slate-200 dark:border-zinc-700",
                        "shadow-sm transition-all duration-200",
                        "focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15",
                        open && "border-primary/60 ring-2 ring-primary/15"
                    )}
                />

                {/* Icono derecho: loader o clear */}
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                    {loading ? (
                        <Loader2
                            size={15}
                            strokeWidth={2}
                            className="animate-spin text-primary"
                        />
                    ) : hasValue ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className={cn(
                                "flex h-5 w-5 items-center justify-center rounded-full",
                                "bg-slate-200 text-slate-500 dark:bg-zinc-700 dark:text-slate-400",
                                "transition-all duration-150 hover:bg-slate-300 dark:hover:bg-zinc-600"
                            )}
                        >
                            <X size={11} strokeWidth={2.5} />
                        </button>
                    ) : null}
                </span>
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className={cn(
                        "z-50 overflow-hidden rounded-xl border",
                        "border-border ",
                        "bg-card dark:bg-zinc-900",
                        "shadow-xl shadow-slate-200/60 dark:shadow-black/30",
                        "animate-in fade-in slide-in-from-top-1 duration-150"
                    )}
                >
                    {options.length > 0 ? (
                        <>
                            {/* Header del dropdown */}
                            <div className="border-b border-slate-100 px-3 py-2 dark:border-zinc-800">
                                <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    {options.length} resultado{options.length !== 1 ? "s" : ""}
                                </p>
                            </div>

                            <ul className="max-h-56 overflow-y-auto py-1.5">
                                {options.map((opt, index) => (
                                    <li
                                        key={opt.id}
                                        onClick={() => handleSelect(opt)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        className={cn(
                                            "mx-1.5 flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5",
                                            "text-sm text-slate-700 dark:text-slate-200",
                                            "transition-colors duration-100",
                                            activeIndex === index
                                                ? "bg-secondary/70 text-foreground dark:bg-primary/15"
                                                : "hover:bg-slate-50 dark:hover:bg-zinc-800"
                                        )}
                                    >
                                        {/* Dot indicador */}
                                        <span
                                            className={cn(
                                                "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                                                activeIndex === index ? "bg-foreground" : "bg-slate-300 dark:bg-zinc-600"
                                            )}
                                        />

                                        {/* Label con highlight de la query */}
                                        <HighlightMatch text={opt.label} query={query} />
                                    </li>
                                ))}
                            </ul>

                            {/* Footer hint */}
                            <div className="border-t border-slate-100 px-3 py-2 dark:border-zinc-800">
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                    ↑↓ navegar · Enter seleccionar · Esc cerrar
                                </p>
                            </div>
                        </>
                    ) : (
                        /* Empty state */
                        <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-zinc-800">
                                <Search size={16} />
                            </span>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Sin resultados
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                No se encontró "{query}"
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Highlight de texto coincidente ── */
function HighlightMatch({ text, query }: { text: string; query: string }) {
    if (!query.trim()) return <span>{text}</span>;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return (
        <span className="truncate">
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark
                        key={i}
                        className="bg-secondary text-foreground rounded-sm px-0.5 font-medium not-italic dark:bg-primary/25"
                    >
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
}