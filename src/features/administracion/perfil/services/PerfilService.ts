import { apiInstancesPanel } from "@/core/services/ApiInstancePanel";
import type { CambiarPasswordFormValues } from "../libs/PerfilSchema";
export const getPerfil = async () => {
    const response = await apiInstancesPanel.get("/empleado/perfil");
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




export const cambiarPassword = async (data: CambiarPasswordFormValues) => {
    const response = await apiInstancesPanel.put("/empleado/update-password", data);
    return response.data;
};

export const cerrarSessionGlobal = async () => {
    const response = await apiInstancesPanel.post("/empleado/logoutGlobal");
    return response.data;
};
