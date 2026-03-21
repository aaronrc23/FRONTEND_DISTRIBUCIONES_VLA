import type { Row } from "@tanstack/react-table";

export const ColumnsInventario = () => {
    return [
        {
            accessorKey: "producto.nombre",
            header: "Nombre",
        },
        {
            accessorKey: "almacen.nombre",
            header: "Almacen",
        },

        {
            accessorKey: "almacen.tipo",
            header: "Tipo",
            cell: ({ row }: { row: any }) => {
                const tipo = row.original.almacen.tipo;

                const styles = {
                    FISICO: "bg-info/10 text-info border-info/40",
                    VIRTUAL: "bg-purple/10 text-purple border-purple/40"
                };

                return (
                    <div className="flex  w-full">
                        <span className={`
                            px-2 py-[4px]
                            rounded-lg
                            text-[11px] font-semibold
                            border
                            ${styles[tipo] || "bg-slate-50 text-slate-600 border-slate-200"}
                        `}>
                            {tipo}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: "stock",
            header: "Stock",
        },
        {
            accessorKey: "actions",
            header: "Acciones",
        },
    ]
}