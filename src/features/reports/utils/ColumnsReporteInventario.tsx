import { Badge } from "@/shared/ui";
import type { ExportColumn } from "./exportExcel";

export const ColumnsReporteInventario = () => {
  return [
    {
      id: "producto",
      accessorKey: "producto",
      header: "Producto",
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.producto}</span>
          <span className="text-xs text-muted-foreground">
            SKU: {row.original.codigo || "—"}
          </span>
        </div>
      ),
    },
    {
      id: "stock_total",
      accessorKey: "stock_total",
      header: "Stock Total",
      cell: ({ row }: any) => (
        <span className="font-bold text-lg">{row.original.stock_total}</span>
      ),
    },
    {
      id: "min_stock",
      accessorKey: "min_stock",
      header: "Stock Mín.",
      cell: ({ row }: any) => (
        <span className="text-sm text-muted-foreground">
          {row.original.min_stock}
        </span>
      ),
    },
    {
      id: "max_stock",
      accessorKey: "max_stock",
      header: "Stock Máx.",
      cell: ({ row }: any) => (
        <span className="text-sm text-muted-foreground">
          {row.original.max_stock}
        </span>
      ),
    },
    {
      id: "estado",
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }: any) => {
        const stock = row.original.stock_total;
        const min = row.original.min_stock;
        const isLowStock = stock <= min;
        return (
          <Badge visual="flat" color={isLowStock ? "destructive" : "success"}>
            {isLowStock ? "Stock Crítico" : "En Stock"}
          </Badge>
        );
      },
    },
    {
      id: "almacenes",
      accessorKey: "almacenes_count",
      header: "Almacenes",
      cell: ({ row }: any) => (
        <span className="text-sm">{row.original.almacenes_count} almacén(es)</span>
      ),
    },
  ];
};

export const exportInventarioColumns: ExportColumn[] = [
  { header: "Producto", accessor: "producto" },
  { header: "SKU", accessor: "codigo" },
  { header: "Stock Total", accessor: "stock_total" },
  { header: "Stock Mínimo", accessor: "min_stock" },
  { header: "Stock Máximo", accessor: "max_stock" },
  { header: "Estado", accessor: (row) => (row.stock_total <= row.min_stock ? "Stock Crítico" : "En Stock") },
  { header: "Almacenes", accessor: "almacenes_count" },
];
