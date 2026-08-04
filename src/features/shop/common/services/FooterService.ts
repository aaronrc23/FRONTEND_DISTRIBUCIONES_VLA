import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

// Endpoint público para la tienda
const appiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const getFooterPublic = async () => {
    const response = await fetch(`${appiUrl}/api/footer`);
    return response.json();
}

export const getFooter = async () => {
    const response = await apiInstancesPanel.get(`/footer`);
    return response.data;
}

export const updateFooter = async (data: any) => {
    const response = await apiInstancesPanel.put(`/footer/update/${data.id}`, data);
    return response.data;
}

export const updateFooterLinks = async (data: any) => {
    const response = await apiInstancesPanel.put(`/footer/update-links/${data.id}`, data);
    return response.data;
}
