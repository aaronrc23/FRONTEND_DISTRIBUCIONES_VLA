import React, { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,

} from "@tanstack/react-table";


import { Icon } from "@iconify-icon/react";


import { cn } from "../../../lib/utils";
import { Card, Button } from "../../ui";
import { ColumnVisibilityToggle } from "../molecules/table/ColumnVisibilityToggle";
import { GlobalFilter } from "../molecules/table/GlobalFilter";
import { TbHeaderComp } from "../molecules/table/TbHeaderComp";
import { FuzzyFilter } from "../../hooks/useFuzzyFilter";
import SelectPages from "../molecules/table/SelectPage";
import TbPagination from "../molecules/table/TbPagination";
import { TableBase, TableCell, TableRow, TableUI } from "../../ui/table";


interface TablePlantProps {
    columns: any;
    data: any;
    filtrosctn?: boolean;
    placeholder?: string;
    clscell?: string;
    mobileVisibleColumns?: string[];
    renderExpandedRow?: (row: any) => React.ReactNode;
}

const TablePlant = ({ columns, data, filtrosctn = false, placeholder, clscell, mobileVisibleColumns, renderExpandedRow }: TablePlantProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [filtercol, setFiltercol] = useState(false);
    const [expanded, setExpanded] = useState({});
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting,
            globalFilter,
            columnVisibility,
            expanded,
        },
        onExpandedChange: setExpanded,
        getExpandedRowModel: getExpandedRowModel(),
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex gap-2 flex-1 max-w-md w-full sm:w-auto">
                        <GlobalFilter
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            placeholder={placeholder}
                        />
                        {filtrosctn && (
                            <div className="flex items-center gap-1">
                                <Button
                                    className="cursor-pointer font-medium"
                                    onClick={() => setFiltercol(!filtercol)}
                                >
                                    <Icon icon="majesticons:filter-line" className="text-base" />
                                    <span className="hidden sm:inline">Filtros</span>
                                </Button>
                                <ColumnVisibilityToggle table={table} />
                            </div>
                        )}
                    </div>
                    <SelectPages table={table} />
                </div>
            </div>
            <div >
                {/* Tabla tradicional para pantallas medianas en adelante */}
                <div className="hidden md:block">
                    <div className="border-none shadow-md dark:border-none rounded-md overflow-x-auto scrollmainx bg-card dark:bg-transparent">
                        <TableUI variant="default" className="  ">
                            <TableBase>
                                <TbHeaderComp table={table} showFilterIcon={filtercol} />

                                <tbody>
                                    {table.getRowModel().rows.map((row) => (
                                        <React.Fragment key={row.id}>
                                            {/* fila principal */}
                                            <TableRow
                                                onClick={() => row.toggleExpanded()}
                                                className="group cursor-pointer transition-colors hover:bg-muted/40"
                                            >
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

                                            {/* expanded row */}
                                            {row.getIsExpanded() && renderExpandedRow && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={row.getVisibleCells().length}
                                                        className="bg-muted/20 p-0"
                                                    >
                                                        <div className="animate-in slide-in-from-top-2 duration-200">
                                                            {renderExpandedRow(row.original)}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </TableBase>
                        </TableUI>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:hidden w-full">
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <Card
                                key={row.id}
                                onClick={() => row.toggleExpanded()}
                                className={cn(
                                    "overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl transition-all duration-300",
                                    "cursor-pointer hover:border-primary/30 hover:shadow-md",
                                    row.getIsExpanded() && "border-primary/40 shadow-md"
                                )}
                            >
                                {/* CONTENT */}
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {row.getVisibleCells()
                                            .filter((cell) =>
                                                !mobileVisibleColumns || mobileVisibleColumns.includes(cell.column.id)
                                            )
                                            .map((cell) => (
                                                <div
                                                    key={cell.id}
                                                    className="flex items-start justify-between gap-3 border-b border-border/40 pb-2 last:border-none"
                                                >
                                                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
                                                        {typeof cell.column.columnDef.header === "string"
                                                            ? cell.column.columnDef.header
                                                            : cell.column.id}
                                                    </span>

                                                    <div className="text-sm text-right font-medium">
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    {/* EXPAND BUTTON */}
                                    {renderExpandedRow && (
                                        <div className="mt-4 flex items-center justify-center">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>
                                                    {row.getIsExpanded()
                                                        ? "Ocultar detalles"
                                                        : "Ver detalles"}
                                                </span>

                                                <Icon
                                                    icon={
                                                        row.getIsExpanded()
                                                            ? "solar:alt-arrow-up-linear"
                                                            : "solar:alt-arrow-down-linear"
                                                    }
                                                    className={cn(
                                                        "text-base transition-transform duration-300",
                                                        row.getIsExpanded() &&
                                                        "rotate-180"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* EXPANDED CONTENT */}
                                {row.getIsExpanded() && renderExpandedRow && (
                                    <div className="border-t border-border/50 bg-muted/20">
                                        <div className="animate-in slide-in-from-top-2 duration-300">
                                            {renderExpandedRow(row.original)}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))
                    ) : (
                        <div className="py-10 text-center text-muted-foreground">
                            No se encontraron resultados.
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <TbPagination table={table} />
                </div>
            </div>

        </>
    );
};

export default TablePlant;