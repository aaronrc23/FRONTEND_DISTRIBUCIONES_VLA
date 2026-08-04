import { Badge } from "@/shared/ui";
import type { ExportColumn } from "./exportExcel";

export const ColumnsReporteProductos = () => {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: "Producto",
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">
            SKU: {row.original.codigo_interno || "—"}
          </span>
        </div>
      ),
    },
    {
      id: "codigo_interno",
      accessorKey: "codigo_interno",
      header: "SKU",
      cell: ({ row }: any) => (
        <span className="text-sm">{row.original.codigo_interno || "—"}</span>
      ),
    },
    {
      id: "categoria",
      accessorKey: "categoria.name",
      header: "Categoría",
      cell: ({ row }: any) => (
        <span>{row.original.categoria?.name || "—"}</span>
      ),
    },
    {
      id: "marca",
      accessorKey: "marca.name",
      header: "Marca",
      cell: ({ row }: any) => (
        <span>{row.original.marca?.name || "—"}</span>
      ),
    },
    {
      id: "precio_compra",
      accessorKey: "precio_compra",
      header: "P. Compra",
      cell: ({ row }: any) => (
        <span className="font-medium text-warning">
          S/ {Number(row.original.precio_compra).toFixed(2)}
        </span>
      ),
    },
    {
      id: "precio_venta",
      accessorKey: "precio_venta",
      header: "P. Venta",
      cell: ({ row }: any) => (
        <span className="font-medium text-success">
          S/ {Number(row.original.precio_venta).toFixed(2)}
        </span>
      ),
    },
    {
      id: "activo",
      accessorKey: "activo",
      header: "Estado",
      cell: ({ row }: any) => {
        const isActive = row.original.activo;
        return (
          <Badge visual="flat" color={isActive ? "success" : "destructive"}>
            {isActive ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
  ];
};

export const exportProductosColumns: ExportColumn[] = [
  { header: "Producto", accessor: "name" },
  { header: "SKU", accessor: "codigo_interno" },
  { header: "Código Barras", accessor: "codigo_barras" },
  { header: "Categoría", accessor: (row) => row.categoria?.name || "—" },
  { header: "Marca", accessor: (row) => row.marca?.name || "—" },
  { header: "Precio Compra", accessor: (row) => Number(row.precio_compra).toFixed(2) },
  { header: "Precio Venta", accessor: (row) => Number(row.precio_venta).toFixed(2) },
  { header: "Precio Mayoreo", accessor: (row) => Number(row.precio_mayoreo).toFixed(2) },
  { header: "Estado", accessor: (row) => (row.activo ? "Activo" : "Inactivo") },
];
