import { apiInstancesPanel } from "../../../../core/services/ApiInstancePanel";



export const listProductos = async () => {
    const response = await apiInstancesPanel.get(`/producto/list`);
    return response.data;
}

export const desactivarProducto = async (id: string) => {
    const response = await apiInstancesPanel.put(`/producto/desactivar/${id}`);
    return response.data;
}

export const activarProducto = async (id: string) => {
    const response = await apiInstancesPanel.put(`/producto/reactivar/${id}`);
    return response.data;
}


export const addProducto = async (data: any) => {
    const response = await apiInstancesPanel.post(`/producto/create`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export const editProducto = async ({ datos, id }: { datos: any, id: string }) => {

    const response = await apiInstancesPanel.put(`/producto/update/${id}`, datos);
    return response.data;
}


export const addImagenProducto = async (data: any) => {
    const response = await apiInstancesPanel.post(`/producto/add-imagen`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export const updateImagenProducto = async ({ formData, id }: { formData: any, id: string }) => {
    const response = await apiInstancesPanel.post(
        `/producto/update-image/${id}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

export const deleteImagenProducto = async (id: number) => {
    const response = await apiInstancesPanel.delete(`/producto/delete-image/${id}`);
    return response.data;
}

export const setPrincipalImagenProducto = async (id: number) => {
    const response = await apiInstancesPanel.put(`/producto/update-is-principal/${id}`);
    return response.data;
}