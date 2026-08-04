import { Texto } from "@/shared/ui";

interface Props {
    table: any;
}

export default function TbPagination({ table }: Props) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between w-full py-4 sm:py-3">
            <Texto className="text-sm font-medium text-foreground/60 order-2 sm:order-1">
                Mostrando{" "}
                {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}{" "}
                al{" "}
                {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length,
                )}{" "}
                de {table.getFilteredRowModel().rows.length} registros
            </Texto>
            <div className="flex gap-1 order-1 sm:order-2">
                <button
                    className="px-2 py-1.5 sm:px-3 sm:py-2 border border-table-border rounded-lg bg-muted text-table-textcolor text-xs font-medium shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    title="Primera página"
                >
                    {"<<"}
                </button>
                <button
                    className="px-2 py-1.5 sm:px-3 sm:py-2 border border-table-border rounded-lg bg-muted text-table-textcolor text-sm font-semibold shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    title="Página anterior"
                >
                    {"<"}
                </button>

                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        table.setPageIndex(page);
                    }}
                    className="outline-none border p-0 rounded w-12 sm:w-16 text-center text-xs bg-input border-border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button
                    className="px-2 py-1.5 sm:px-3 sm:py-2 border border-table-border rounded-lg bg-muted text-table-textcolor text-sm font-semibold shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    title="Página siguiente"
                >
                    {">"}
                </button>
                <button
                    className="px-2 py-1.5 sm:px-3 sm:py-2 border border-table-border rounded-lg bg-muted text-table-textcolor text-xs font-medium shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    title="Última página"
                >
                    {">>"}
                </button>
            </div>
        </div>
    )
}
