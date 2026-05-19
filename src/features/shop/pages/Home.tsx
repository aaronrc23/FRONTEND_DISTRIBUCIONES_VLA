import { useMemo } from "react";
import { useFilterProduct, uselistCategoria, useViewMarca } from "../common/hooks/useConsultas";
import FilterCategory from "../../../shared/components/shop/productos/FilterCategory";
import ProductGrid from "../components/productos/ProductGrid";
import { useCategoriaStore } from "../common/store/shopstore";
import FilterHeader from "../../../shared/components/shop/productos/FilterHeader";



export default function Home() {
    const { categoriaId, setCategoriaId, sort, setSort, view, setView, marcaId, setMarcaId } = useCategoriaStore();
    const {
        data: categorias,
        isLoading: loadingCat,
    } = uselistCategoria();

    const {
        data: productos,
        isLoading,
        isError,
    } = useFilterProduct(categoriaId, marcaId);

    const { data: marcas, isLoading: loadingMarcas } = useViewMarca();

    const categoriaActual = useMemo(() => {
        return categorias?.find(
            (cat: any) => cat.id === Number(categoriaId)
        );
    }, [categorias, categoriaId]);

    const productosOrdenados = useMemo(() => {
        if (!productos) return [];

        let items = [...productos];

        if (sort === "price-asc") {
            items.sort((a, b) => a.producto.precio - b.producto.precio);
        }

        if (sort === "price-desc") {
            items.sort((a, b) => b.producto.precio - a.producto.precio);
        }

        return items;
    }, [productos, sort]);


    return (
        <div className="w-full h-full lg:container  px-5 py-2 sm:py-8 mx-auto">
            <div className="flex flex-col  lg:flex-row gap-6">

                <FilterCategory
                    categorias={categorias}
                    categoriaId={categoriaId}
                    setCategoriaId={setCategoriaId}
                    loading={loadingCat}
                    marcas={marcas ?? []}
                    marcaId={marcaId}
                    setMarcaId={setMarcaId}
                />

                <div className="flex-1 gap-1">
                    <FilterHeader
                        title={categoriaActual ? categoriaActual.nombre : "Todos los productos"}
                        sort={sort}
                        setSort={setSort}
                        view={view}
                        setView={setView}
                    />
                    <ProductGrid
                        data={productosOrdenados}
                        isLoading={isLoading}
                        isError={isError}
                        view={view}
                    />
                </div>

            </div>
        </div>
    );
}