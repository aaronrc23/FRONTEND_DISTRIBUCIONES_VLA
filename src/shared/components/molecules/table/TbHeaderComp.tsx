import { flexRender, type Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react"
import { Icon } from "@iconify-icon/react";
import { cn } from "../../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui";
import DebouncedInput from "./DebouncedInput";

interface TableHeaderComponentProps {
    table: Table<any>
    showFilterIcon?: boolean
}

export const TbHeaderComp = ({
    table,
    showFilterIcon = true
}: TableHeaderComponentProps) => {
    return (
        <thead className="bg-table-bgth dark:bg-slate-700/40">
            {table.getHeaderGroups().map((headerGroup) => (
                <tr
                    key={headerGroup.id}
                    className="border-b border-border/40"
                >
                    {headerGroup.headers.map((header) => {
                        const canSort = header.column.getCanSort()
                        const sort = header.column.getIsSorted()
                        const filterVariant =
                            header.column.columnDef.meta?.filterVariant || "text"

                        return (
                            <th
                                key={header.id}
                                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                                <div className="flex items-center gap-2 group">

                                    {/* SORT */}
                                    <div
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={cn(
                                            "flex items-center gap-1 transition-colors",
                                            canSort && "cursor-pointer hover:text-foreground"
                                        )}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        {sort === "asc" && (
                                            <Icon icon="icon-park-solid:down-two" width="16" height="16" className="opacity-70" />
                                        )}
                                        {sort === "desc" && (
                                            <Icon icon="icon-park-solid:down-two" width="16" height="16" className="rotate-180  opacity-70 " />
                                        )}
                                    </div>

                                    {/* FILTER */}
                                    {showFilterIcon &&
                                        header.column.getCanFilter() && (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted/50"
                                                    >
                                                        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                                                    </button>
                                                </PopoverTrigger>

                                                <PopoverContent
                                                    align="start"
                                                    className="w-56 rounded-xl border border-border/40 bg-background shadow-xl p-3 space-y-3"
                                                >
                                                    {filterVariant === "range" ? (
                                                        <div className="flex gap-2">
                                                            <DebouncedInput
                                                                type="number"
                                                                value={
                                                                    (header.column.getFilterValue() as [
                                                                        number,
                                                                        number
                                                                    ])?.[0] ?? ""
                                                                }
                                                                onChange={(value) =>
                                                                    header.column.setFilterValue(
                                                                        (old: [number, number]) => [
                                                                            value,
                                                                            old?.[1]
                                                                        ]
                                                                    )
                                                                }
                                                                placeholder="Min"
                                                                className="w-full rounded-lg border px-2 py-1 text-sm"
                                                            />
                                                            <DebouncedInput
                                                                type="number"
                                                                value={
                                                                    (header.column.getFilterValue() as [
                                                                        number,
                                                                        number
                                                                    ])?.[1] ?? ""
                                                                }
                                                                onChange={(value) =>
                                                                    header.column.setFilterValue(
                                                                        (old: [number, number]) => [
                                                                            old?.[0],
                                                                            value
                                                                        ]
                                                                    )
                                                                }
                                                                placeholder="Max"
                                                                className="w-full rounded-lg border px-2 py-1 text-sm"
                                                            />
                                                        </div>
                                                    ) : filterVariant === "select" ? (
                                                        <select
                                                            onChange={(e) =>
                                                                header.column.setFilterValue(
                                                                    e.target.value
                                                                )
                                                            }
                                                            value={
                                                                (header.column.getFilterValue() ??
                                                                    "") as string
                                                            }
                                                            className="w-full rounded-lg border px-2 py-1 text-sm bg-background"
                                                        >
                                                            <option value="">Todos</option>
                                                            <option value="activo">Activo</option>
                                                            <option value="inactivo">Inactivo</option>
                                                        </select>
                                                    ) : (
                                                        <DebouncedInput
                                                            value={
                                                                (header.column.getFilterValue() ??
                                                                    "") as string
                                                            }
                                                            onChange={(value) =>
                                                                header.column.setFilterValue(value)
                                                            }
                                                            placeholder={`Buscar...`}
                                                            className="w-full rounded-lg border px-2 py-1 text-sm"
                                                            debounce={400}
                                                        />
                                                    )}
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                </div>
                            </th>
                        )
                    })}
                </tr>
            ))}
        </thead>
    )
}