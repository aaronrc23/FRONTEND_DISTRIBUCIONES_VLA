import { apiInstancesPanel } from "@/core/services/ApiInstancePanel";

export const getPerfil = async () => {
    const response = await apiInstancesPanel.get("/perfil");
    return response.data;
};

export const updatePerfil = async (data: any) => {
    const response = await apiInstancesPanel.put("/perfil", data);
    return response.data;
};

export const updateAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await apiInstancesPanel.post("/perfil/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const cambiarPassword = async (data: {
    currentPassword: string;
    newPassword: string;
}) => {
    const response = await apiInstancesPanel.put("/perfil/password", data);
    return response.data;
};
