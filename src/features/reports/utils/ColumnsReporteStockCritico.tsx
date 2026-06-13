import { Badge } from "@/shared/ui";
import type { ExportColumn } from "./exportExcel";

export const ColumnsReporteStockCritico = () => {
  return [
    {
      id: "producto",
      accessorKey: "producto.nombre",
      header: "Producto",
      cell: ({ row }: any) => (
        <span className="font-medium">
          {row.original.producto?.nombre || "—"}
        </span>
      ),
    },
    {
      id: "almacen",
      accessorKey: "almacen.nombre",
      header: "Almacén",
      cell: ({ row }: any) => (
        <span>{row.original.almacen?.nombre || "—"}</span>
      ),
    },
    {
      id: "stock_actual",
      accessorKey: "stock_actual",
      header: "Stock Actual",
      cell: ({ row }: any) => (
        <span className="font-bold text-destructive">
          {row.original.stock_actual}
        </span>
      ),
    },
    {
      id: "estado",
      header: "Estado",
      cell: () => (
        <Badge visual="flat" color="destructive">
          Crítico
        </Badge>
      ),
    },
  ];
};

export const exportStockCriticoColumns: ExportColumn[] = [
  { header: "Producto", accessor: (row) => row.producto?.nombre || "—" },
  { header: "Almacén", accessor: (row) => row.almacen?.nombre || "—" },
  { header: "Stock Actual", accessor: "stock_actual" },
  { header: "Estado", accessor: () => "Crítico" },
];
