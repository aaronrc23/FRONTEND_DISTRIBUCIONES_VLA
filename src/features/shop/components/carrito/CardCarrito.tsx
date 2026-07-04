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
        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">
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
                        className="group relative flex gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl transition-all duration-200 hover:shadow-sm"
                    >
                        {/* Botón eliminar */}
                        <button
                            onClick={() => removeItem(item.id, item.presentacion?.id)}
                            className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer z-10"
                            title="Eliminar del carrito"
                        >
                            <Icon icon="mdi:close" className="text-xs" />
                        </button>

                        {/* Imagen */}
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Contenido */}
                        <div className="flex flex-1 flex-col min-w-0 gap-1.5 sm:gap-2">
                            {/* Header: nombre + precio */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <Texto className="text-sm font-medium text-gray-900 truncate">
                                        {item.nombre}
                                    </Texto>
                                    {item.presentacion && (
                                        <span className="text-xs text-gray-400">
                                            {item.presentacion.medida}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-sm font-semibold whitespace-nowrap shrink-0 ${mayorista ? 'text-emerald-600' : 'text-gray-900'}`}>
                                    {moneda}{(efectivo * item.cantidad).toFixed(2)}
                                </span>
                            </div>

                            {/* Detalles de precios y mayoreo */}
                            {item.precio_mayoreo && item.cantidad_mayoreo && (
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-400">
                                    <span className={mayorista ? "line-through" : ""}>
                                        {moneda}{Number(item.precio).toFixed(2)} c/u
                                    </span>
                                    {mayorista && (
                                        <span className="text-emerald-600 font-medium">
                                            {moneda}{Number(item.precio_mayoreo).toFixed(2)} c/u
                                        </span>
                                    )}
                                    {!mayorista && (
                                        <span>
                                            {item.cantidad_mayoreo}+: {moneda}{Number(item.precio_mayoreo).toFixed(2)} c/u
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Indicador de mayoreo */}
                            {faltaMayoreo > 0 && (
                                <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                                    <Icon icon="mdi:information-outline" className="text-sm shrink-0" />
                                    <span>+{faltaMayoreo} para mayoreo</span>
                                </div>
                            )}

                            {/* Controles de cantidad + badge + ahorro */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1.5 sm:pt-2">
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

                                    {mayorista && (
                                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            Mayorista
                                        </span>
                                    )}

                                    {ahorro > 0 && (
                                        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-600">
                                            <Icon icon="mdi:tag-arrow-down" className="text-sm" />
                                            Ahorro {moneda}{ahorro.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {ahorro > 0 && (
                                    <span className="sm:hidden text-xs text-emerald-600 font-medium">
                                        Ahorro {moneda}{ahorro.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}