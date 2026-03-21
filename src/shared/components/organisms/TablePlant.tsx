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
}

const TablePlant = ({ columns, data, filtrosctn = false, placeholder, clscell }: TablePlantProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [filtercol, setFiltercol] = useState(false);

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
            <div
                className={`flex  flex-col xs:flex-row  ${filtrosctn === false ? "xs:flex-col flex-row" : "md:flex-row"
                    }  justify-between items-center  mb-4 gap-2`}>


                <div
                    className={`w-full md:w-full flex flex-col gap-3 sm:flex-row justify-between items-center `}>
                    <div className="flex gap-2 flex-1 max-w-md">

                        <GlobalFilter
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            placeholder={placeholder}
                        />
                        {filtrosctn && (
                            <div className=" items-center gap-1 hidden md:flex">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer font-medium"
                                    onClick={() => setFiltercol(!filtercol)}>
                                    <Icon icon="majesticons:filter-line" className="text-base" />
                                    Filtros
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
                <div className="hidden md:block ">
                    <div className="border-none dark:border-none rounded-md overflow-hidden scrollmainx bg-card dark:bg-transparent">
                        <TableUI variant="default" className="bg-bgth dark:bg-slate-800/30 ">
                            <TableBase>
                                <TbHeaderComp table={table} showFilterIcon={filtercol} />

                                <tbody>
                                    {table.getRowModel().rows.length ? (
                                        table.getRowModel().rows.map((row) => (
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
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <div className="flex justify-center items-center py-6 text-muted-foreground">
                                                    No se encontraron resultados.
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </tbody>
                            </TableBase>
                        </TableUI>
                    </div>
                </div>

                <div className=" md:hidden grid grid-cols-1  gap-2  justify-center items-center space-y-3 w-full ">
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <Card key={row.id} className="p-4  shadow-none dark:shadow-sm border border-border w-full  rounded-md">
                                <div className="grid w-full grid-cols-1 gap-2">
                                    {row.getVisibleCells().map((cell) => (
                                        <div key={cell.id} className="flex flex-wrap  gap-1 justify-between items-center">
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {cell.column.columnDef.header?.toString()}
                                            </span>
                                            <span className="text-sm font-normal">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center w-full  text-muted-foreground">
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