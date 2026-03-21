import { Info, Loader2, RefreshCw } from "lucide-react";
import { Button } from "../../../ui";
import { FrSelect } from "./FrSelect";



interface FrSelectAsyncProps {
    name: string;
    control: any;
    label: string;
    options?: { label: string; value: string }[];
    placeholder?: string;
    isLoading?: boolean;
    isError?: boolean;
    emptyText?: string;
    loadingText?: string;
    refetch?: () => void;
}

export function FrSelectAsync({
    name,
    control,
    label,
    options = [],
    placeholder = "Seleccione una opción",
    isLoading,
    isError,
    emptyText = "Sin resultados",
    loadingText = "Cargando...",
    refetch
}: FrSelectAsyncProps) {

    if (isLoading) {
        return (
            <div className="text-sm text-muted-foreground flex gap-1 items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingText}
            </div>
        );
    }

    if (isError || options.length === 0) {
        return (
            <div className="px-3 py-2 text-sm text-muted-foreground flex gap-1 items-center">
                <Info className="h-4 w-4" />
                {emptyText}
                {refetch && (
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={refetch}
                        className="ml-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                )}
            </div>
        );
    }

    return (
        <FrSelect
            name={name}
            control={control}
            label={label}
            options={options}
            placeholder={placeholder}
        />
    );
}
