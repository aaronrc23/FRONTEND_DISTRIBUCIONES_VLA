import * as XLSX from "xlsx";

interface ExportColumn {
  header: string;
  accessor: string | ((row: any) => any);
}

export function exportToExcel(
  data: any[],
  columns: ExportColumn[],
  filename: string
) {
  if (!data || data.length === 0) return;

  const rows = data.map((row) => {
    const obj: Record<string, any> = {};
    columns.forEach((col) => {
      const value =
        typeof col.accessor === "function"
          ? col.accessor(row)
          : row[col.accessor];
      obj[col.header] = value ?? "";
    });
    return obj;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-fit column widths
  const colWidths = columns.map((col) => {
    const maxLen = Math.max(
      col.header.length,
      ...data.map((row) => {
        const val =
          typeof col.accessor === "function"
            ? String(col.accessor(row) ?? "")
            : String(row[col.accessor] ?? "");
        return val.length;
      })
    );
    return { wch: Math.min(Math.max(maxLen + 2, 12), 40) };
  });
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
