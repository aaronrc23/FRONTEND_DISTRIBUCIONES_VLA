import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const listMarcas = async () => {
    const response = await apiInstancesPanel.get(`/marcas/list`);
    return response.data;
}


export const addMarcas = async (data: any) => {
    const response = await apiInstancesPanel.post("/marcas/create", data);
    return response.data;
}

export const editMarcas = async (data: any) => {

    const response = await apiInstancesPanel.put(`/marcas/update/${data.id}`, data);
    return response.data;
}

export const activateMarcas = async (id: number) => {
    const response = await apiInstancesPanel.put(`/marcas/reactivar/${id}`);
    return response.data;
}

export const desactivateMarcas = async (id: number) => {
    const response = await apiInstancesPanel.put(`/marcas/desactivar/${id}`);
    return response.data;
}

export const deleteMarcas = async (id: number) => {
    const response = await apiInstancesPanel.delete(`/marcas/destroy/${id}`);
    return response.data;
}