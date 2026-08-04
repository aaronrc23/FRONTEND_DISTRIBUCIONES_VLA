import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilterProduct, uselistCategoria, useViewMarca } from "../common/hooks/useConsultas";
import FilterCategory from "../../../shared/components/shop/productos/FilterCategory";
import ProductGrid from "../components/productos/ProductGrid";
import { useCategoriaStore } from "../common/store/shopstore";
import FilterHeader from "../../../shared/components/shop/productos/FilterHeader";



export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categoriaId, setCategoriaId, sort, setSort, view, setView, marcaId, setMarcaId } = useCategoriaStore();
    const [page, setPage] = useState(1);

    const {
        data: categorias,
        isLoading: loadingCat,
    } = uselistCategoria();

    const {
        data: response,
        isLoading,
        isError,
    } = useFilterProduct(categoriaId, marcaId, page);

    const { data: marcas } = useViewMarca();

    // Extraer data y meta de la respuesta paginada
    const productos = response?.data ?? [];
    const pagination = response?.meta;

    // Leer query param ?categoria= de la URL y resolver slug a ID
    useEffect(() => {
        const catFromUrl = searchParams.get("categoria");
        if (!catFromUrl) return;
        // Si es slug y tenemos categorías cargadas, resolver a ID
        if (isNaN(Number(catFromUrl)) && categorias) {
            const found = categorias.find((c: any) => c.slug === catFromUrl);
            if (found) {
                setCategoriaId(String(found.id));
                return;
            }
        }
        setCategoriaId(catFromUrl);
    }, [searchParams, categorias]);

    // Sincronizar categoriaId del store → URL (para que el enlace refleje siempre la categoría activa)
    useEffect(() => {
        const currentCatFromUrl = searchParams.get("categoria");

        if (!categoriaId) {
            if (currentCatFromUrl) {
                setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    next.delete("categoria");
                    return next;
                }, { replace: true });
            }
            return;
        }

        // Resolver ID a slug para la URL
        const cat = categorias?.find((c: any) => String(c.id) === categoriaId);
        const slug = cat?.slug || categoriaId;

        // Si la URL ya tiene ese slug, no hacemos nada (evita loop)
        if (currentCatFromUrl === slug) return;

        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set("categoria", slug);
            return next;
        }, { replace: true });
    }, [categoriaId, categorias, searchParams]);

    // Resetear página al cambiar filtros
    useEffect(() => {
        setPage(1);
    }, [categoriaId, marcaId]);

    const categoriaActual = useMemo(() => {
        if (!categorias || !categoriaId) return undefined;
        // Buscar por ID o por slug
        return categorias.find(
            (cat: any) => cat.id === Number(categoriaId) || cat.slug === categoriaId
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

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
                        pagination={pagination}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>
        </div>
    );
}