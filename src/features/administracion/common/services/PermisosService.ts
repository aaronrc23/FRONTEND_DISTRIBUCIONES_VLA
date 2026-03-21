import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const listPerm = async () => {
    const response = await apiInstancesPanel.get(`/asignacion/list-roles`);
    return response.data;
}

export const listPermByUser = async (id: number) => {
    const response = await apiInstancesPanel.get(`/asignacion/listPuser/${id}`);
    return response.data;
}

export const sincronizarPermisos = async (id: number, data: any) => {
    const payload = {
        user_id: id,
        permissions: data
    }
    const response = await apiInstancesPanel.post(`/asignacion/syncPermissionsToUser`, payload);
    return response.data;
}