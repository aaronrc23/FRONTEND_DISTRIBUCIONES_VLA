import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Loading from "../../../../shared/ui/loading";
import { Button, Texto } from "../../../../shared/ui";

interface Producto {
    id: number;
    name: string;
    precio: number;
    imagen?: string;
}

interface Item {
    id: number;
    producto: Producto;
}

interface Props {
    data?: Item[];
    isLoading: boolean;
    isError: boolean;
    view?: string;
}

export default function ProductGrid({ data = [], isLoading, isError, view }: Props) {
    const navigate = useNavigate();


    if (isLoading) {
        return <Loading mensaje="Cargando productos..." />;
    }

    if (isError) {
        return (
            <p className="text-sm text-shoprimary text-center py-10">
                Error al cargar productos
            </p>
        );
    }

    if (!data.length) {
        return (
            <p className="text-sm text-zinc-500 text-center py-10">
                No hay productos disponibles
            </p>
        );
    }
    const isGrid = view === "grid";

    return (
        <section className="py-8">
            <div
                className={
                    isGrid
                        ? "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                        : "flex flex-col gap-4"
                }
            >
                {data.map((item, index) =>
                    isGrid ? (
                        <ProductCard
                            key={item.id}
                            product={item.producto}
                            priority={index === 0}
                            onClick={() => navigate(`/producto/${item.producto.id}`)}
                        />
                    ) : (
                        <ProductListItem
                            key={item.id}
                            product={item.producto}
                            onClick={() => navigate(`/producto/${item.producto.id}`)}
                        />
                    )
                )}
            </div>
        </section>
    );
}

/* 🔹 Card separada (más reutilizable y limpia) */
function ProductCard({
    product,
    onClick,
    priority = false
}: {
    product: Producto;
    onClick: () => void;
    priority?: boolean;
}) {
    return (
        <div className="group relative bg-card rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg h-80">
            {/* Imagen */}
            <div
                className="h-48 overflow-hidden cursor-pointer w-full"
                onClick={onClick}
            >
                {product.imagen ? (
                    <img
                        src={product.imagen}
                        alt={product.name}
                        width={300}
                        height={300}
                        loading={priority ? "eager" : "lazy"}
                        fetchPriority="high"
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                        <Texto className="text-xs ">
                            Sin imagen
                        </Texto>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4 transition-all duration-300 transform group-hover:-translate-y-8 bg-card">
                <h3 className="text-sm text-center font-medium text-shopforeground  dark:text-white line-clamp-2 mb-1">
                    {product.name}
                </h3>
                <p className="text-xl font-bold text-shopforeground text-center py-2 dark:text-white ">
                    S/ {Number(product.precio).toFixed(2) ?? 0}
                </p>
            </div>

            {/* Botón */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <button className="w-full flex items-center justify-center gap-2 text-sm bg-shoprimary text-white py-2 px-4 rounded-2xl font-medium transition-all duration-300 active:scale-95">
                    <ShoppingCart size={16} />
                    AGREGAR
                </button>
            </div>
        </div>
    );
}


function ProductListItem({
    product,
    onClick,
}: {
    product: Producto;
    onClick: () => void;
}) {
    return (
        <div className="flex gap-4 bg-card rounded-xl shadow-sm p-4 hover:shadow-md transition">

            <div
                className="w-24 h-24 shrink-0 cursor-pointer"
                onClick={onClick}
            >
                {product.imagen ? (
                    <img
                        src={product.imagen}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-xs text-zinc-400">
                            Sin imagen
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col  flex-1 justify-center">
                <Texto
                    onClick={onClick}
                    className="text-sm font-medium w-auto cursor-pointer text-shopforeground"
                >
                    {product.name}
                </Texto>
                <div className="flex justify-between">
                    <p className="text-lg font-bold text-shoprimary mt-2">
                        S/ {Number(product.precio).toFixed(2)}
                    </p>
                    <div className="flex items-center ">
                        <Button variant="shop-primary">
                            Agregar
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    );
}