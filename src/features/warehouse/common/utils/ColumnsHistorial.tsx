import { TipoEntradaEnum } from '@/features/warehouse/common/utils/EnumTipoEntrada';
import { Badge } from '../../../../shared/ui/badge';


export default function ColumnsHistorial() {
    return (
        [
            {
                accessorKey: "inventario.producto.nombre",
                header: "Producto",

            },

            {
                accessorKey: "tipo",
                header: "Tipo",
                cell: ({ row }: any) => {
                    const tipo = row.original.tipo;
                    const color = tipo === "ENTRADA" ? "success" : tipo === "SALIDA" ? "destructive" : "warning";
                    return <Badge visual="flat" color={color}>{tipo}</Badge>;
                }
            },
            {
                accessorKey: "cantidad",
                header: "Cantidad",
                cell: ({ row }: any) => {
                    const cantidad = row.original.cantidad || 0;
                    const tipo = row.original.tipo;

                    const tiposEntrada = [
                        TipoEntradaEnum.ENTRADA,
                        TipoEntradaEnum.REPOSICION,
                        TipoEntradaEnum.TRANSFERENCIA_ENTRADA,
                    ];

                    const isEntrada = tiposEntrada.includes(tipo);

                    return (
                        <span
                            className={`font-semibold ${isEntrada
                                ? "text-foreground"
                                : "text-red-500"
                                }`}
                        >
                            {isEntrada ? "+" : "-"}{cantidad}
                        </span>
                    );
                }
            },
            {
                accessorKey: "inventario.almacen.nombre",
                header: "Almacen",
            }




        ]
    )
}



