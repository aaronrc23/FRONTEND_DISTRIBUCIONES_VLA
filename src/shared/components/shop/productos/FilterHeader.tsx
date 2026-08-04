import { Card, Texto } from "../../../ui";
import FilterProductos from "./FilterProductos";

interface Props {
    title: string;
    sort: string;
    setSort: (value: string) => void;
    view: string;
    setView: (value: string) => void;
}
export default function FilterHeader({ title, sort, setSort, view, setView }: Props) {
    return (
        <Card className="flex  flex-col w-full justify-center items-center sm:flex-row gap-4 sm:justify-between p-4 shadow-xs hover:shadow-none">
            <Texto variant="subtitle" className="font-bold text-shop-secondary-foreground">{title}</Texto>
            <FilterProductos
                sort={sort}
                setSort={setSort}
                view={view}
                setView={setView}
            />
        </Card>
    )
}
