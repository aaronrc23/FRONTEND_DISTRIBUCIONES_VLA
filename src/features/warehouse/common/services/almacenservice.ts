import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const listAlmacenes = async () => {
    const response = await apiInstancesPanel.get("/almacenes")
    return response.data
}

export const addAlmacenService = async (data: any) => {
    const response = await apiInstancesPanel.post("/almacenes", data)
    return response.data
}
export const updataAlmService = async (data: any) => {
    const response = await apiInstancesPanel.put(`/almacenes/${data?.id}`, data?.data)
    return response.data
}
export const updatePrincipalAlmService = async (id: number) => {
    const response = await apiInstancesPanel.put(`/almacenes/updatePrincipal/${id}`)
    return response.data
}

export const deleteAlmService = async (id: number) => {
    const response = await apiInstancesPanel.delete(`/almacenes/${id}`)
    return response.data
}