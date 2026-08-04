import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel"


export const listmovimientos = async () => {
    const response = await apiInstancesPanel.get("/movimiento")
    return response.data
}