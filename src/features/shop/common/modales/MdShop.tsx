import { useModal } from "@/shared/hooks/useModal";
import ShopDrawer from "@/shared/ui/shopdrawer";
import { useCartStore } from "../store/cartStore";
import CardCarrito from "../../components/carrito/CardCarrito";
import { Button } from "@/shared/ui";



export default function MdShop() {
    const modaladd = useModal("md-carrito");
    const items = useCartStore((state) => state.items);
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

                <div className="border-t border-white/10 bg-card p-4">
                    <Button
                        variant="brand"
                        className="w-full h-12 text-base font-semibold"
                    >
                        Confirmar Pedido
                    </Button>
                </div>
            </div>
        </ShopDrawer>

    )
}
