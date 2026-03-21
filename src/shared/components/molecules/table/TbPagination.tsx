
interface Props {
    table: any;
}

export default function TbPagination({ table }: Props) {
    return (
        <div className="flex flex-col py-6 sm:py-3 w-full md:flex-row  gap-4 items-center justify-between  " >


            <span className="text-xs font-normal text-foreground-2">
                Mostrando {" "}
                {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}{" "}
                al{" "}
                {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length,
                )}{" "}
                de {table.getFilteredRowModel().rows.length} registros
            </span>
            <div className="flex flex-col space-y-2">
                {/* Navegación simple */}
                <div className="flex gap-1">
                    <button
                        className="py-2 px-3 border border-table-border rounded-xl bg-muted text-table-textcolor text-xs font-medium shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<< "}
                    </button>
                    <button
                        className="py-2 px-3 border-table-border rounded-xl bg-muted text-table-textcolor  text-sm font-semibold shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
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
                        className="outline-none border p-0 rounded w-16 text-center text-xs bg-input border-border"
                    />

                    <button
                        className="py-2 px-3 border-table-border rounded-xl bg-muted text-table-textcolor  text-sm  font-semibold shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="py-2 px-3 border border-table-border rounded-xl bg-muted text-table-textcolor text-sm font-medium shadow-sm hover:bg-table-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {" >>"}
                    </button>
                </div>


            </div>
        </div >
    )
}
