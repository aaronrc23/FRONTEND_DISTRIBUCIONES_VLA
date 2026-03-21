import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";


export const listEmpleados = async () => {
    const response = await apiInstancesPanel.get("/empleado/index");
    return response.data;
}

export const addEmp = async (data: any) => {
    const response = await apiInstancesPanel.post("/empleado/register", data);
    return response.data;
}

export const editEmp = async (data: any) => {
    const response = await apiInstancesPanel.put(`/empleado/update/${data.id}`, data);
    return response.data;
}

export const dropEmp = async (data: any) => {
    const response = await apiInstancesPanel.delete(`/empleado/destroy/${data.id}`);
    return response.data;
}