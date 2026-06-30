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
        let mensaje = "🛒 *Nuevo Pedido - Distribuciones VLA*\n\n";
        mensaje += "*DETALLE DEL PEDIDO:*\n";
        mensaje += "─────────────────────\n\n";

        items.forEach((item, index) => {
            const efectivo = getPrecioEfectivo(item);
            const subtotal = efectivo * item.cantidad;
            mensaje += `${index + 1}. *${item.nombre}*\n`;
            const precioLabel = efectivo !== Number(item.precio)
                ? `S/ ${efectivo.toFixed(2)} (mayoreo)`
                : `S/ ${item.precio.toFixed(2)}`;
            mensaje += `   Cantidad: ${item.cantidad} | Precio: ${precioLabel}\n`;
            if (item.presentacion) {
                mensaje += `   Presentación: ${item.presentacion.medida}\n`;
            }
            mensaje += `   Subtotal: S/ ${subtotal.toFixed(2)}\n\n`;
        });

        mensaje += "─────────────────────\n";
        mensaje += `*TOTAL: S/ ${total.toFixed(2)}*\n\n`;
        mensaje += "¡Gracias por tu pedido! 🙌";

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    };

    return (
        <ShopDrawer
            open={modaladd.isOpen}
            onClose={modaladd.close}
            title="Mi Carrito"
        >
            <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto">
                    <CardCarrito items={items} />
                </div>

                <div className="border-t border-white/10 bg-card p-4 space-y-3">
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
