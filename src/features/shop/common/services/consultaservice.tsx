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