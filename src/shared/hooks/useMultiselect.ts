import { useCallback, useState } from "react";

export function useMultiSelect<T = number>(initial: T[] = []) {
    const [values, setValues] = useState<T[]>(initial);

    const toggle = useCallback((value: T) => {
        setValues(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    }, []);

    const setAll = useCallback((vals: T[]) => {
        setValues(vals);
    }, []);

    return {
        values,
        toggle,
        setAll,
    };
}