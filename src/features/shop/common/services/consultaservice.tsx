import axios from "axios"
export const appiUrl = import.meta.env.VITE_REACT_APP_API_URL

export const listProductosshop = async (page = 1, perPage = 12) => {
    const response = await axios.get(`${appiUrl}/api/list`, {
        params: { page, per_page: perPage }
    })
    return response.data
}

export const showIdprod = async (slug: string) => {
    const response = await axios.get(`${appiUrl}/api/${slug}`)
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
    marcaId?: string,
    page = 1,
    perPage = 12
) => {
    const response = await axios.get(`${appiUrl}/api/producto`, {
        params: {
            categoria_id: categoriaId || undefined,
            marca_id: marcaId || undefined,
            page,
            per_page: perPage,
        },
    });

    return response.data;
};