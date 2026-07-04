import { Icon } from "@iconify-icon/react";
import { useModal } from "@/shared/hooks/useModal";
import ShopDrawer from "@/shared/ui/shopdrawer";
import { useCartStore, getPrecioEfectivo } from "../store/cartStore";
import CardCarrito from "../../components/carrito/CardCarrito";
import { useWhatsappNumber } from "../hooks/useWhatsappNumber";

export default function MdShop() {
    const modaladd = useModal("md-carrito");
    const items = useCartStore((state) => state.items);
    const whatsappNumber = useWhatsappNumber();

    const total = items.reduce((sum, item) => sum + getPrecioEfectivo(item) * item.cantidad, 0);

    const enviarPedidoWhatsApp = () => {
        let mensaje = "Hola! Vengo de la página y quiero reservar estos productos:\n";

        items.forEach((item) => {
            const presentacion = item.presentacion ? ` (${item.presentacion.medida})` : "";

            mensaje += `• ${item.nombre}${presentacion} - ${item.cantidad} unid.\n`;
        });

        mensaje += `\nEn total serían S/ ${total.toFixed(2)}. ¿Me confirman disponibilidad?`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    };

    return (
        <ShopDrawer
            open={modaladd.isOpen}
            onClose={modaladd.close}
            title="Mi Carrito"
        >
            <div className="min-h-full flex flex-col">
                <div className="flex-1">
                    <CardCarrito items={items} />
                </div>

                <div className="sticky bottom-0 border-t border-white/10 bg-card p-4 space-y-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                    {/* Resumen */}
                    <div className="flex items-center justify-between px-1">
                        <span className="text-sm text-slate-500">Total</span>
                        <span className="text-lg font-bold text-blue-900">
                            S/ {total.toFixed(2)}
                        </span>
                    </div>

                    {/* Botón WhatsApp */}
                    <button
                        onClick={enviarPedidoWhatsApp}
                        disabled={items.length === 0}
                        className="w-full flex items-center justify-center gap-3 h-12 text-base font-semibold rounded-xl transition-all duration-300 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-green-600/20"
                    >
                        <Icon icon="logos:whatsapp-icon" className="text-xl" />
                        Enviar Pedido por WhatsApp
                    </button>
                </div>
            </div>
        </ShopDrawer>
    );
}
