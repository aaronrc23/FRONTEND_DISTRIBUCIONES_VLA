import axios from "axios"
export const appiUrl = import.meta.env.VITE_REACT_APP_API_URL

export const listProductosshop = async () => {
    const response = await axios.get(`${appiUrl}/api/list`)
    return response.data
}

export const showIdprod = async (id: number) => {
    const response = await axios.get(`${appiUrl}/api/${id}`)
    return response.data
}
export const showCategorias = async () => {
    const response = await axios.get(`${appiUrl}/api/categorias`)
    return response.data
}

export const showMarcas = async () => {
    const response = await axios.get(`${appiUrl}/api/marcas`)
    return response.data
}

export const showCategorys = async () => {
    const response = await axios.get(`${appiUrl}/api/categoryshop`)
    return response.data
}


export const getActiveBanners = async () => {
    const response = await axios.get(`${appiUrl}/api/banners/active`)
    return response.data
}


export const showfilterProduct = async (
    categoriaId?: string,
    marcaId?: string
) => {
    const response = await axios.get(`${appiUrl}/api/producto`, {
        params: {
            categoria_id: categoriaId || undefined,
            marca_id: marcaId || undefined,
        },
    });

    return response.data;
};