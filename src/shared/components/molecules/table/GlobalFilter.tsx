


import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Input } from "../../../ui";

interface GlobalFilterProps {
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    placeholder?: string;
}

export const GlobalFilter = ({ globalFilter, setGlobalFilter, placeholder }: GlobalFilterProps) => (
    <>

        <Input
            type="text"
            leftIcon={<Icon icon="tabler:search" className="text-lg" />}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="bg-input rounded-xl dark:border-none w-auto "
            clsInput="dark:placeholder:text-white/60"
            placeholder={placeholder ?? "Buscar..."}
        />
    </>
);
