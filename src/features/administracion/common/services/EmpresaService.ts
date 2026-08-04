import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const getEmpresa = async () => {
    const response = await apiInstancesPanel.get(`/empresa/show`);
    return response.data;
};

export const updateEmpresa = async (data: any) => {
    const response = await apiInstancesPanel.put(`/empresa/update/${data.id}`, data);
    return response.data;
};
