import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const listBanners = async () => {
    const response = await apiInstancesPanel.get(`/banners/list`);
    return response.data;
}

export const addBanner = async (data: any) => {
    const formData = new FormData();
    if (data.titulo) formData.append("titulo", data.titulo);
    if (data.subtitulo) formData.append("subtitulo", data.subtitulo);
    if (data.enlace) formData.append("enlace", data.enlace);
    if (data.orden !== undefined) formData.append("orden", String(data.orden));
    if (data.imagen) formData.append("imagen", data.imagen);

    const response = await apiInstancesPanel.post("/banners/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export const editBanner = async (data: any) => {
    const formData = new FormData();
    if (data.titulo) formData.append("titulo", data.titulo);
    if (data.subtitulo) formData.append("subtitulo", data.subtitulo);
    if (data.enlace) formData.append("enlace", data.enlace);
    if (data.orden !== undefined) formData.append("orden", String(data.orden));
    if (data.imagen) formData.append("imagen", data.imagen);
    formData.append("_method", "PUT"); // ← Laravel method spoofing

    const response = await apiInstancesPanel.post(`/banners/update/${data.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export const activateBanner = async (id: number) => {
    const response = await apiInstancesPanel.put(`/banners/reactivar/${id}`);
    return response.data;
}

export const desactivateBanner = async (id: number) => {
    const response = await apiInstancesPanel.put(`/banners/desactivar/${id}`);
    return response.data;
}

export const deleteBanner = async (id: number) => {
    const response = await apiInstancesPanel.delete(`/banners/destroy/${id}`);
    return response.data;
}

export const restoreBanner = async (id: number) => {
    const response = await apiInstancesPanel.post(`/banners/restore/${id}`);
    return response.data;
}
