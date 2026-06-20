import { Badge, Texto } from "@/shared/ui";
import { useMonedaStore } from "../../common/store/Monedastore";
import { useCartStore } from "../../common/store/cartStore";
import { Icon } from "@iconify-icon/react";

export default function CardCarrito({ items }: any) {
    const moneda = useMonedaStore((state) => state.simbolo);
    const removeItem = useCartStore((state) => state.removeItem);

    return (
        <div className="space-y-3 p-4">
            {items.map((item: any) => (
                <div
                    key={`${item.id}-${item.presentacion?.id ?? ""}`}
                    className="group flex gap-4 rounded-lg bg-white p-3 transition-all relative"
                >
                    {/* Botón eliminar */}
                    <button
                        onClick={() => removeItem(item.id, item.presentacion?.id)}
                        className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 z-10 cursor-pointer"
                        title="Eliminar del carrito"
                    >
                        <Icon icon="mdi:close" className="text-sm" />
                    </button>

                    <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                        <div>
                            <Texto className="line-clamp-2 font-medium text-sm pr-4">
                                {item.nombre}
                            </Texto>

                            {item.presentacion && (
                                <Texto className="text-xs text-slate-500 mt-1">
                                    {item.presentacion.medida}
                                </Texto>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                            <Badge
                                visual="flat"
                                className="rounded-full bg-slate-100 px-3 py-1"
                            >
                                x {item.cantidad}
                            </Badge>

                            <Texto className="font-semibold text-base text-primary">
                                {moneda}
                                {(item.precio * item.cantidad).toFixed(2)}
                            </Texto>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}