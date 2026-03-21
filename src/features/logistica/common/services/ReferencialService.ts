import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const listRefProduct = async () => {
    const response = await apiInstancesPanel.get(`/consultas/refprod`);
    return response.data;
}