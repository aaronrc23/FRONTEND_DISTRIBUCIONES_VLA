import { Badge } from "@/shared/ui";
import type { ExportColumn } from "./exportExcel";
import { TipoEntradaEnum } from "@/features/warehouse/common/utils/EnumTipoEntrada";

const tipoColors: Record<string, string> = {
  [TipoEntradaEnum.ENTRADA]: "success",
  [TipoEntradaEnum.SALIDA]: "destructive",
  [TipoEntradaEnum.VENTA]: "warning",
  [TipoEntradaEnum.REPOSICION]: "info",
  [TipoEntradaEnum.AJUSTE]: "warning",
  [TipoEntradaEnum.TRANSFERENCIA]: "info",
  [TipoEntradaEnum.TRANSFERENCIA_ENTRADA]: "success",
  [TipoEntradaEnum.TRANSFERENCIA_SALIDA]: "destructive",
};

export const ColumnsReporteMovimientos = () => {
  return [
    {
      id: "fecha",
      accessorKey: "created_at",
      header: "Fecha",
      cell: ({ row }: any) => {
        const date = row.original.created_at;
        if (!date) return <span className="text-muted-foreground">—</span>;
        return (
          <span className="text-sm">
            {new Date(date).toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      id: "producto",
      accessorKey: "inventario.producto.nombre",
      header: "Producto",
      cell: ({ row }: any) => {
        const nombre = row.original.inventario?.producto?.nombre || row.original.producto_nombre || "—";
        return <span className="font-medium">{nombre}</span>;
      },
    },
    {
      id: "tipo",
      accessorKey: "tipo",
      header: "Tipo",
      cell: ({ row }: any) => {
        const tipo = row.original.tipo;
        const color = (tipoColors[tipo] || "default") as
          | "default"
          | "success"
          | "destructive"
          | "warning"
          | "info"
          | "primary"
          | "secondary"
          | "purple"
          | undefined;
        return <Badge visual="flat" color={color}>{tipo}</Badge>;
      },
    },
    {
      id: "cantidad",
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
          <span className={`font-semibold ${isEntrada ? "text-emerald-600" : "text-red-500"}`}>
            {isEntrada ? "+" : "-"}{cantidad}
          </span>
        );
      },
    },
    {
      id: "almacen",
      accessorKey: "inventario.almacen.nombre",
      header: "Almacén",
      cell: ({ row }: any) => {
        const almacen = row.original.inventario?.almacen?.nombre || row.original.almacen_nombre || "—";
        return <span>{almacen}</span>;
      },
    },
    {
      id: "descripcion",
      accessorKey: "descripcion",
      header: "Descripción",
      cell: ({ row }: any) => (
        <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
          {row.original.descripcion || "—"}
        </span>
      ),
    },
  ];
};

export const exportMovimientosColumns: ExportColumn[] = [
  { header: "Fecha", accessor: (row: any) => {
    if (!row.created_at) return "—";
    return new Date(row.created_at).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }},
  { header: "Producto", accessor: (row: any) => row.inventario?.producto?.nombre || row.producto_nombre || "—" },
  { header: "Tipo", accessor: "tipo" },
  { header: "Cantidad", accessor: (row: any) => {
    const tiposEntrada = [
      TipoEntradaEnum.ENTRADA,
      TipoEntradaEnum.REPOSICION,
      TipoEntradaEnum.TRANSFERENCIA_ENTRADA,
    ];
    const isEntrada = tiposEntrada.includes(row.tipo);
    return `${isEntrada ? "+" : "-"}${row.cantidad || 0}`;
  }},
  { header: "Almacén", accessor: (row: any) => row.inventario?.almacen?.nombre || row.almacen_nombre || "—" },
  { header: "Descripción", accessor: "descripcion" },
];
