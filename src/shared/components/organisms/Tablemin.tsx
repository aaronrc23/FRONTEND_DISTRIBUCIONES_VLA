import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,

} from "@tanstack/react-table";




import { cn } from "../../../lib/utils";
import { Card } from "../../ui";
import { TbHeaderComp } from "../molecules/table/TbHeaderComp";
import { FuzzyFilter } from "../../hooks/useFuzzyFilter";
import TbPagination from "../molecules/table/TbPagination";
import { TableBase, TableCell, TableRow, TableUI } from "../../ui/table";


interface TableminProps {
    columns: any;
    data: any;
    filtrosctn?: boolean;
    placeholder?: string;
    clscell?: string;
    responsiveMode?: "card" | "scroll";
}

const Tablemin = ({ columns, data, clscell, responsiveMode = "card", }: TableminProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting,
            globalFilter,
            columnVisibility,
        },

        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: FuzzyFilter,
    });

    return (
        <>

            <div >
                {/* Tabla tradicional para pantallas medianas en adelante */}
                {responsiveMode === "scroll" && (
                    <div className="overflow-x-auto">
                        <TableUI variant="default" className="min-w-full overflow-x-auto shadow-none border-none">
                            <TableBase>
                                <TbHeaderComp table={table} showFilterIcon={false} />

                                <tbody>
                                    {table.getRowModel().rows.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={cn(
                                                            "text-sm font-normal whitespace-nowrap",
                                                            clscell
                                                        )}
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <div className="flex items-center justify-center py-6 text-muted-foreground">
                                                    No se encontraron resultados.
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </tbody>
                            </TableBase>
                        </TableUI>
                    </div>
                )}

                {responsiveMode === "card" && (
                    <>
                        {/* desktop */}
                        <div className="hidden md:block">
                            <TableUI variant="default" className="shadow-none border-none">
                                <TableBase>
                                    <TbHeaderComp table={table} showFilterIcon={false} />

                                    <tbody>
                                        {table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={cn("text-sm font-normal", clscell)}
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </TableBase>
                            </TableUI>
                        </div>

                        {/* mobile cards */}
                        <div className="grid grid-cols-1 gap-3 md:hidden">
                            {table.getRowModel().rows.map((row) => (
                                <Card
                                    key={row.id}
                                    className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur-xl"
                                >
                                    <div className="space-y-3">
                                        {row.getVisibleCells().map((cell) => (
                                            <div
                                                key={cell.id}
                                                className="flex items-center justify-between gap-3 border-b border-border/40 pb-2 last:border-none"
                                            >
                                                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                                    {cell.column.columnDef.header?.toString()}
                                                </span>

                                                <div className="text-sm font-medium text-right">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
                <div className="flex justify-between items-center">
                    <TbPagination table={table} />
                </div>
            </div>

        </>
    );
};

export default Tablemin;