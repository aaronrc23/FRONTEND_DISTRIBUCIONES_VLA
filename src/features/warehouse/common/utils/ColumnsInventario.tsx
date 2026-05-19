import { Badge, Texto } from "@/shared/ui";
import { ChevronDown, ChevronRight } from "lucide-react";

type TipoAlmacen = "FISICO" | "VIRTUAL";

type AlmacenItem = {
    inventario_id: number;
    almacen_id: number;
    almacen: string;
    tipo: TipoAlmacen;
    stock: number;
    min_stock: number;
    max_stock: number;
};

type RowType = {
    product_id: number;
    producto: string;
    codigo: string;
    stock_total: number;
    min_stock: number;
    max_stock: number;
    almacenes_count: number;
    almacenes: AlmacenItem[];
};

export const ColumnsVisible = [
    "producto",
    "stock_total",
    "estado",
];

export const ColumnsInventario = () => {
    return [
        {
            id: "producto",
            accessorKey: "producto",
            header: "Producto",

            cell: ({
                row,
            }: {
                row: {
                    original: RowType;
                    toggleExpanded: () => void;
                    getIsExpanded: () => boolean;
                };
            }) => {
                return (
                    <div className="flex items-start gap-3">
                        {/* Botón expandir */}
                        <button
                            onClick={() => row.toggleExpanded()}
                            className="mt-1 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        >
                            {row.getIsExpanded() ? (
                                <ChevronDown size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>

                        {/* Información producto */}
                        <div className="flex flex-col gap-2">
                            <Texto className="font-medium">
                                {row.original.producto}
                            </Texto>

                            <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                    visual="flat"
                                    size="md"
                                    color="secondary"
                                >
                                    SKU: {row.original.codigo}
                                </Badge>

                                <Badge
                                    visual="flat"
                                    size="md"
                                    color="purple"
                                >
                                    {row.original.almacenes_count} almacenes
                                </Badge>
                            </div>
                        </div>
                    </div>
                );
            },
        },

        {
            id: "stock_total",
            accessorKey: "stock_total",
            header: "Stock Total",

            cell: ({ row }: { row: { original: RowType } }) => {
                return (
                    <Texto className="font-bold text-lg">
                        {row.original.stock_total}
                    </Texto>
                );
            },
        },

        {
            id: "estado",
            accessorKey: "estado",

            header: "Estado",

            cell: ({ row }: { row: { original: RowType } }) => {
                const stock = row.original.stock_total;
                const min = row.original.min_stock;

                const isLowStock = stock <= min;

                return (
                    <Badge
                        visual="flat"
                        size="md"
                        color={
                            isLowStock
                                ? "destructive"
                                : "success"
                        }
                    >
                        {isLowStock
                            ? "Stock Crítico"
                            : "En Stock"}
                    </Badge>
                );
            },
        },


    ];
};