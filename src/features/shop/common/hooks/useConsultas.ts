import { useQuery } from "@tanstack/react-query"
import { listProductosshop, showCategorias, showCategorys, showfilterProduct, showIdprod, showMarcas, getActiveBanners } from "../services/consultaservice"

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

export const uselistCategoria = () => {
    return useQuery({
        queryKey: ["listcategoria"],
        queryFn: async () => showCategorias()
    });
}
export const useViewMarca = () => {
    return useQuery({
        queryKey: ["showMarca"],
        queryFn: async () => showMarcas()
    });
}

export const useCategoryShop = () => {
    return useQuery({
        queryKey: ["categoryShop"],
        queryFn: async () => showCategorys()
    });
}


export const useActiveBanners = () => {
    return useQuery({
        queryKey: ["activeBanners"],
        queryFn: async () => getActiveBanners(),
        refetchOnWindowFocus: false,
    });
}


export const useFilterProduct = (categoriaId?: string, marcaId?: string) => {
    return useQuery({
        queryKey: ["products", categoriaId ?? "all", marcaId ?? "all"],
        queryFn: async () => {
            if (!categoriaId && !marcaId) return listProductosshop();

            return showfilterProduct(categoriaId, marcaId);
        },
    });
};