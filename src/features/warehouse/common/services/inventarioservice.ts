import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel"


export const listInventario = async () => {
    const response = await apiInstancesPanel.get("/inventario/findAll")
    return response.data
}

export const findIdInventario = async (id: number) => {
    const response = await apiInstancesPanel.get(`/inventario/find/${id}`)
    return response.data
}


export const createInventario = async (data: any) => {
    const response = await apiInstancesPanel.post("/inventario/create", data)
    return response.data
}

export const movInventario = async (data: any) => {
    const response = await apiInstancesPanel.post("/inventario/movimiento", data)
    return response.data
}

export const deleteInventario = async (id: number) => {
    const response = await apiInstancesPanel.delete(`/inventario/delete/${id}`)
    return response.data
}