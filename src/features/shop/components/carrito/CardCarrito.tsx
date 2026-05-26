import { Badge, Texto } from "@/shared/ui";
import { useMonedaStore } from "../../common/store/Monedastore";

export default function CardCarrito({ items }: any) {
    const moneda = useMonedaStore((state) => state.simbolo);

    return (
        <div className="space-y-3 p-4">
            {items.map((item: any) => (
                <div
                    key={item.id}
                    className="group flex gap-4 rounded-lg  bg-white p-3  transition-all "
                >
                    <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                        <div>
                            <Texto className="line-clamp-2 font-medium text-sm">
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