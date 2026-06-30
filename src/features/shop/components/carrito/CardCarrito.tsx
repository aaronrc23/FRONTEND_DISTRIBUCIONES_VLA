import { Texto } from "@/shared/ui";
import { useMonedaStore } from "../../common/store/Monedastore";
import { useCartStore, getPrecioEfectivo as precioEfectivo, esMayoreo } from "../../common/store/cartStore";
import { Icon } from "@iconify-icon/react";

export default function CardCarrito({ items }: any) {
    const moneda = useMonedaStore((state) => state.simbolo);
    const removeItem = useCartStore((state) => state.removeItem);
    const increaseQty = useCartStore((state) => state.increaseQty);
    const decreaseQty = useCartStore((state) => state.decreaseQty);

    return (
        <div className="space-y-4 p-4">
            {items.map((item: any) => {
                const efectivo = precioEfectivo(item);
                const mayorista = esMayoreo(item);
                const ahorro = mayorista
                    ? (Number(item.precio) - Number(item.precio_mayoreo)) * item.cantidad
                    : 0;

                const faltaMayoreo =
                    !mayorista &&
                        item.precio_mayoreo &&
                        item.cantidad_mayoreo
                        ? Math.max(0, Number(item.cantidad_mayoreo) - item.cantidad)
                        : 0;

                return (
                    <div
                        key={`${item.id}-${item.presentacion?.id ?? ""}`}
                        className="group relative flex gap-4 bg-white p-4 rounded-xl transition-all duration-200 hover:shadow-sm"
                    >
                        {/* Botón eliminar - Más minimalista */}
                        <button
                            onClick={() => removeItem(item.id, item.presentacion?.id)}
                            className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                            title="Eliminar del carrito"
                        >
                            <Icon icon="mdi:close" className="text-xs" />
                        </button>

                        {/* Imagen más minimalista */}
                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Contenido minimalista */}
                        <div className="flex flex-1 flex-col min-w-0 gap-2">
                            {/* Header: nombre y presentación en una línea */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <Texto className="text-sm font-medium text-gray-900 truncate">
                                        {item.nombre}
                                    </Texto>
                                    {item.presentacion && (
                                        <span className="text-xs text-gray-400 ml-1.5">
                                            · {item.presentacion.medida}
                                        </span>
                                    )}
                                </div>
                                
                                {/* Precio principal */}
                                <span className={`text-sm font-semibold whitespace-nowrap ${mayorista ? 'text-emerald-600' : 'text-gray-900'}`}>
                                    {moneda}{(efectivo * item.cantidad).toFixed(2)}
                                </span>
                            </div>

                            {/* Detalles de precios y mayoreo - más compacto */}
                            {item.precio_mayoreo && item.cantidad_mayoreo && (
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className={mayorista ? "line-through" : ""}>
                                        {moneda}{Number(item.precio).toFixed(2)}
                                    </span>
                                    {mayorista && (
                                        <span className="text-emerald-600 font-medium">
                                            {moneda}{Number(item.precio_mayoreo).toFixed(2)}
                                        </span>
                                    )}
                                    {!mayorista && (
                                        <span>
                                            {item.cantidad_mayoreo}+: {moneda}{Number(item.precio_mayoreo).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Indicador de mayoreo - más minimalista */}
                            {faltaMayoreo > 0 && (
                                <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                                    <Icon icon="mdi:information-outline" className="text-sm" />
                                    <span>+{faltaMayoreo} para mayoreo</span>
                                </div>
                            )}

                            {/* Controles de cantidad y badges - más limpios */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center border border-gray-200 rounded-md">
                                        <button
                                            onClick={() => decreaseQty(item.id, item.presentacion?.id)}
                                            disabled={item.cantidad <= 1}
                                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                            aria-label="Disminuir cantidad"
                                        >
                                            <Icon icon="mdi:minus" className="text-sm" />
                                        </button>

                                        <span className="w-7 text-center text-sm font-medium text-gray-700">
                                            {item.cantidad}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item.id, item.presentacion?.id)}
                                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                                            aria-label="Aumentar cantidad"
                                        >
                                            <Icon icon="mdi:plus" className="text-sm" />
                                        </button>
                                    </div>

                                    {/* Badge mayorista más discreto */}
                                    {mayorista && (
                                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            Mayorista
                                        </span>
                                    )}
                                </div>

                                {/* Ahorro */}
                                {ahorro > 0 && (
                                    <div className="flex items-center gap-1 text-xs text-emerald-600">
                                        <Icon icon="mdi:tag-arrow-down" className="text-sm" />
                                        <span>Ahorro {moneda}{ahorro.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}