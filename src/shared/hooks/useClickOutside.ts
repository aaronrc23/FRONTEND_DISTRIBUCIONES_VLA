import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
    handler: () => void
) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [handler]);

    return ref;
}
