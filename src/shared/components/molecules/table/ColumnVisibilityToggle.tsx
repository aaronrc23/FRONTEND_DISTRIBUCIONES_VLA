import { Icon } from '@iconify-icon/react';
import { type Table } from '@tanstack/react-table';
import { Popover, PopoverContent, PopoverTrigger, Button, Checkbox } from '../../../ui';


export const ColumnVisibilityToggle = ({ table }: { table: Table<any> }) => (
    <Popover>
        <PopoverTrigger asChild>
            <Button className="cursor-pointer font-medium">
                <Icon icon="rivet-icons:filter" className="text-md" />
                Columnas</Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-48 bg-card border-border">
            <div className="flex flex-col space-y-2 py-3 px-1">
                {table.getAllColumns().map((column) => (
                    <div key={column.id} className="flex items-center gap-2 font-medium">
                        <Checkbox
                            checked={column.getIsVisible()}
                            onChange={(checked) => column.toggleVisibility(checked)}
                            disabled={!column.getCanHide()}
                        />
                        <span className={column.getCanHide() ? "text-sm" : "opacity-50 text-sm"}>
                            {typeof column.columnDef.header === "string"
                                ? column.columnDef.header
                                : column.id}
                        </span>
                    </div>
                ))}
            </div>
        </PopoverContent>
    </Popover>
);

