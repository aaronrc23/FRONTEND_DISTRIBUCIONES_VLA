
export default function SelectPages({ table }: any) {
    return (
        <div className="flex items-center ">
            <span className="text-sm mr-2 font-medium text-foreground-2">Mostrar</span>
            <select
                className="bg-input text-sm p-2 rounded-md border-border"
                value={table.getState().pagination.pageSize.toString()}
                onChange={(e) => table.setPageSize(Number(e.target.value))}>
                <option value="10">10 registros </option>
                <option value="25">25 registros </option>
                <option value="50">50 registros </option>
                <option value="100">100 registros </option>
            </select>

        </div>
    )
}
