import { useParams } from "react-router-dom";
import { useProductoDetalle } from "../../common/hooks/useConsultas";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useProductoDetalle(id!);

    const [activeImg, setActiveImg] = useState<string | null>(null);

    if (isLoading) return <p className="p-6">Cargando...</p>;
    if (isError) return <p className="p-6 text-red-500">Error</p>;

    const product = data.producto;

    const images = product.imagenes?.length
        ? product.imagenes
        : [{ url: product.imagen }];

    const currentImage = activeImg || product.imagen;

    return (
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-7xl">

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

                {/* 🖼️ GALERÍA */}
                <div className="space-y-4">

                    {/* Imagen principal */}
                    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden h-[320px] md:h-[450px] w-auto flex items-center justify-center shadow-sm">
                        <img
                            src={currentImage}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                    </div>

                    {/* Miniaturas */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {images.map((img: any) => (
                            <button
                                key={img.id || img.url}
                                onClick={() => setActiveImg(img.url)}
                                className={`min-w-[8px] h-20 rounded-xl overflow-hidden border transition ${currentImage === img.url
                                    ? "border-blue-600 ring-2 ring-blue-200"
                                    : "border-zinc-200 dark:border-zinc-700"
                                    }`}
                            >
                                <img
                                    src={img.url}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* 📦 INFO + COMPRA */}
                <div className="flex flex-col gap-6">

                    {/* Header info */}
                    <div className="space-y-2">
                        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                            {product.categoria}
                        </span>

                        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
                            {product.name}
                        </h1>
                    </div>

                    {/* Precio */}
                    <div className="border-y border-zinc-200 dark:border-zinc-800 py-4">
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                            S/ {Number(product.precio).toFixed(2)}
                        </p>

                        {product.precio_mayoreo && (
                            <p className="text-sm text-green-600 mt-1">
                                Precio mayorista: S/ {Number(product.precio_mayoreo).toFixed(2)}
                            </p>
                        )}
                    </div>

                    {/* Card de compra */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">

                        {/* Stock */}
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Stock disponible:{" "}
                            <span className="font-semibold text-zinc-900 dark:text-white">
                                {data.stock}
                            </span>
                        </p>

                        {/* Cantidad */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-zinc-500">Cantidad</span>

                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button className="px-3 py-1 text-sm">-</button>
                                <input
                                    type="number"
                                    defaultValue={1}
                                    className="w-12 text-center outline-none"
                                />
                                <button className="px-3 py-1 text-sm">+</button>
                            </div>
                        </div>

                        {/* Botón */}
                        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                            <ShoppingCart size={18} />
                            Agregar al carrito
                        </button>
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-zinc-800 dark:text-white">
                            Descripción
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {product.descripcion}
                        </p>
                    </div>

                    {/* Info extra */}
                    <div className="text-xs text-zinc-400">
                        Unidad: {product.unidad}
                    </div>

                </div>
            </div>
        </div>
    );
}