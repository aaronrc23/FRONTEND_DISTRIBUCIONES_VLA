import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const SearchProductos = async (query: string) => {
    try {
        const res = await apiInstancesPanel.get(`/producto/search/${encodeURIComponent(query)}`);

        return res.data.map((item: any) => ({
            ...item,
            id: item.id,
            label: item.name
        }));
    } catch (error) {
        return [];
    }
}