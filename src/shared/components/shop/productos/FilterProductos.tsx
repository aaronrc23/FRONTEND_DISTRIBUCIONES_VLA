import { LayoutGrid, List } from "lucide-react";

interface Props {
    sort: string;
    setSort: (value: string) => void;
    view: string;
    setView: (value: string) => void;
}

export default function FilterProductos({
    sort,
    setSort,
    view,
    setView,
}: Props) {
    return (
        <div className="flex items-center gap-3">

            {/* Orden */}
            <select
                aria-label="ordenar"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-md p-2 text-sm bg-input text-shopforeground border-border-input outline-none cursor-pointer"
            >
                <option value="default" style={{ background: 'var(--input, #fff)', color: 'var(--shopforeground, #374151)' }}>Ordenar</option>
                <option value="price-asc" style={{ background: 'var(--input, #fff)', color: 'var(--shopforeground, #374151)' }}>Precio: menor a mayor</option>
                <option value="price-desc" style={{ background: 'var(--input, #fff)', color: 'var(--shopforeground, #374151)' }}>Precio: mayor a menor</option>
            </select>

            {/* Vista */}
            <div className="flex items-center gap-1 border rounded-md p-2 bg-secondary/80 border-none outline-none">
                <button
                    aria-label="Cambiar a vista de grilla"
                    onClick={() => setView("grid")}
                    className={`p-1 rounded ${view === "grid" ? "bg-shoprimary text-white" : ""}`}
                >
                    <LayoutGrid size={16} />
                </button>

                <button
                    aria-label="Cambiar a vista de lista"
                    onClick={() => setView("list")}
                    className={`p-1 rounded ${view === "list" ? "bg-shoprimary text-white" : ""}`}
                >
                    <List size={16} />
                </button>
            </div>

        </div >
    );
}