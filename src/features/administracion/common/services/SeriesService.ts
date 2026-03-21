import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";


export const listSeries = async () => {
    const response = await apiInstancesPanel.get("/series/list");
    return response.data;
};

export const addSeries = async (data: any) => {
    const response = await apiInstancesPanel.post("/series/create", data);
    return response.data;
};

export const editSeries = async (data: any) => {
    const response = await apiInstancesPanel.put(
        `/series/update/${data.id}`,
        data,
    );
    return response.data;
};

export const desactivarSeries = async (data: any) => {
    const response = await apiInstancesPanel.put(
        `/series/desactivar/${data}`,
        data,
    );
    return response.data;
};

export const activarSeries = async (data: any) => {
    const response = await apiInstancesPanel.put(
        `/series/activar/${data}`,
        data,
    );
    return response.data;
};

export const dropSeries = async (data: any) => {
    const response = await apiInstancesPanel.delete(
        `/series/destroy/${data.id}`,
        data,
    );
    return response.data;
};

export const restaureSeries = async (data: any) => {
    const response = await apiInstancesPanel.put(
        `/series/restore/${data.id}`,
        data,
    );
    return response.data;
};

export const listTipocomp = async () => {
    const response = await apiInstancesPanel.get("/consultas/listTipComprobante");
    return response.data;
};