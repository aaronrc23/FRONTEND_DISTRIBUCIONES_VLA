import { Icon } from '@iconify-icon/react';
import { flexRender, type Table } from '@tanstack/react-table';
import { Popover, PopoverContent, PopoverTrigger, Button, Checkbox } from '../../../ui';


export const ColumnVisibilityToggle = ({ table }: { table: Table<any> }) => (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className="cursor-pointer font-medium">
                <Icon icon="rivet-icons:filter" className="text-md" />
                Columnas</Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-48 bg-card border-border">
            <div className="flex flex-col space-y-2">
                {table.getAllColumns().map((column) => (
                    <div key={column.id} className="flex items-center gap-2">
                        <Checkbox
                            checked={column.getIsVisible()}
                            onChange={(checked) => column.toggleVisibility(checked)}
                            disabled={!column.getCanHide()}
                        />
                        <span className={column.getCanHide() ? "text-sm" : "opacity-50 text-sm"}>
                            {typeof column.columnDef.header === "function"
                                ? flexRender(column.columnDef.header, { column  })
                                : column.columnDef.header}
                        </span>
                    </div>
                ))}
            </div>
        </PopoverContent>
    </Popover>
);

