import { useQuery } from "@tanstack/react-query"
import { listProductosshop, showCategorias, showCategorys, showfilterProduct, showIdprod, showMarcas, getActiveBanners } from "../services/consultaservice"

export const useListProdConsult = (page = 1) => {
    return useQuery({
        queryKey: ["listAlmacen", page],
        queryFn: () => listProductosshop(page)
    })
}


export const useProductoDetalle = (slug: string) => {
    return useQuery({
        queryKey: ["producto", slug],
        queryFn: async () => showIdprod(slug),
        enabled: !!slug,
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


export const useFilterProduct = (categoriaId?: string, marcaId?: string, page = 1) => {
    return useQuery({
        queryKey: ["products", categoriaId ?? "all", marcaId ?? "all", page],
        queryFn: async () => {
            // Siempre usar showfilterProduct para el catálogo (con o sin filtros)
            // ya que /api/producto devuelve TODOS los productos, no solo destacados
            return showfilterProduct(categoriaId, marcaId, page);
        },
    });
};