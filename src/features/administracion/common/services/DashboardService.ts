import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";


export const listDashboard = async () => {
    const response = await apiInstancesPanel.get("/dashboard");
    return response.data;
}
