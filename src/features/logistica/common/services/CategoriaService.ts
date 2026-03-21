import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";

export const listCategorias = async () => {
    const response = await apiInstancesPanel.get(`/categoria/list`);
    return response.data;
}

export const listCatPadre = async () => {
    const response = await apiInstancesPanel.get(`/categoria/listCatPadre`);
    return response.data;
}

export const addCategoria = async (data: FormData) => {
    const response = await apiInstancesPanel.post(
        '/categoria/create',
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};


export const editCategoria = async (data: { id: number; data: FormData }) => {
    const response = await apiInstancesPanel.post(
        `/categoria/update/${data.id}`,
        data.data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
};



export const desactivarCategoria = async (id: number) => {
    const response = await apiInstancesPanel.put(`/categoria/desactivar/${id}`);
    return response.data;
}

export const activarCategoria = async (id: number) => {
    const response = await apiInstancesPanel.put(`/categoria/reactivar/${id}`);
    return response.data;
}

export const deleteCategoria = async (id: number) => {
    const response = await apiInstancesPanel.delete(`/categoria/destroy/${id}`);
    return response.data;
}