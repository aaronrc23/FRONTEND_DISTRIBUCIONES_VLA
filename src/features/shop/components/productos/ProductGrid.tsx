import { ShoppingCart } from "lucide-react"
import { useListProdConsult } from "../../common/hooks/useConsultas"
import { useNavigate } from "react-router-dom";

export default function ProductGrid() {
    const { data, isLoading, isError } = useListProdConsult();
    const navigate = useNavigate();
    // 🔄 Loading
    if (isLoading) {
        return (
            <section className="container mx-auto px-4 pt-10">
                <p className="text-sm text-zinc-500">Cargando productos...</p>
            </section>
        )
    }

    // ❌ Error
    if (isError) {
        return (
            <section className="container mx-auto px-4 pt-10">
                <p className="text-sm text-red-500">Error al cargar productos</p>
            </section>
        )
    }

    return (
        <section className="container mx-auto px-4 pt-10">

            {/* Título */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                    Productos
                </h2>
                <p className="text-xs text-zinc-500">
                    Catálogo disponible
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                {data?.map((item: any) => {
                    const product = item.producto;

                    return (
                        <div
                            key={item.id}
                            className="group bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 hover:shadow-md transition"
                        >

                            {/* Imagen real */}
                            <div className="h-50 rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-3 overflow-hidden flex items-center justify-center">
                                {product.imagen ? (
                                    <img
                                        src={product.imagen}
                                        alt={product.name}
                                        className="h-full w-full object-cover group-hover:scale-105 transition"
                                    />
                                ) : (
                                    <span className="text-[10px] text-zinc-400">Sin imagen</span>
                                )}
                            </div>

                            {/* Nombre */}
                            <h3 className="text-sm font-medium text-zinc-800 dark:text-white line-clamp-2">
                                {product.name}
                            </h3>

                            {/* Precio */}
                            <p className="text-base font-semibold text-zinc-900 dark:text-white mt-1">
                                S/ {Number(product.precio).toFixed(2)}
                            </p>

                            {/* Stock pequeño */}
                            <p className="text-xs text-zinc-400">
                                Stock: {item.stock}
                            </p>

                            {/* Acción */}
                            <button
                                onClick={() => navigate(`/producto/${product.id}`)}
                                className="mt-2 w-full  flex items-center justify-center gap-1 text-sm cursor-pointer bg-blue-600 dark:bg-white text-white dark:text-zinc-900 py-2 font-semibold  rounded-xl hover:opacity-90 transition">

                                Ver mas
                            </button>

                        </div>
                    )
                })}

            </div>
        </section>
    )
}