import { useQuery } from "@tanstack/react-query"
import { listProductosshop, showIdprod } from "../services/consultaservice"

export const useListProdConsult = () => {
    return useQuery({
        queryKey: ["listAlmacen"],
        queryFn: listProductosshop
    })
}


export const useProductoDetalle = (id: string) => {
    return useQuery({
        queryKey: ["producto", id],
        queryFn: async () => showIdprod(Number(id)),
        enabled: !!id,
    });
};