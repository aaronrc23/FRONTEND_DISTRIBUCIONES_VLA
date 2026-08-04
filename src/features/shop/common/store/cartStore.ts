import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    precio_mayoreo?: number;
    cantidad_mayoreo?: number;
    imagen?: string;
    cantidad: number;

    presentacion?: {
        id: number;
        medida: string;
    };
}

interface CartStore {
    items: CartItem[];

    addItem: (item: CartItem) => void;

    removeItem: (
        id: number,
        presentacionId?: number
    ) => void;

    increaseQty: (
        id: number,
        presentacionId?: number
    ) => void;

    decreaseQty: (
        id: number,
        presentacionId?: number
    ) => void;

    clearCart: () => void;
}

export function getPrecioEfectivo(item: CartItem): number {
    if (item.cantidad_mayoreo && item.precio_mayoreo && item.cantidad >= item.cantidad_mayoreo) {
        return Number(item.precio_mayoreo);
    }
    return Number(item.precio);
}

export function esMayoreo(item: CartItem): boolean {
    return !!(item.cantidad_mayoreo && item.precio_mayoreo && item.cantidad >= item.cantidad_mayoreo);
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],

            addItem: (item) =>
                set((state) => {

                    const existing = state.items.find(
                        (i) =>
                            i.id === item.id &&
                            i.presentacion?.id === item.presentacion?.id
                    );

                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id &&
                                    i.presentacion?.id === item.presentacion?.id
                                    ? {
                                        ...i,
                                        cantidad: i.cantidad + item.cantidad,
                                    }
                                    : i
                            ),
                        };
                    }

                    return {
                        items: [...state.items, item],
                    };
                }),

            removeItem: (id, presentacionId) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) =>
                            !(
                                i.id === id &&
                                i.presentacion?.id === presentacionId
                            )
                    ),
                })),

            increaseQty: (id, presentacionId) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id &&
                            i.presentacion?.id === presentacionId
                            ? { ...i, cantidad: i.cantidad + 1 }
                            : i
                    ),
                })),

            decreaseQty: (id, presentacionId) =>
                set((state) => ({
                    items: state.items
                        .map((i) =>
                            i.id === id &&
                                i.presentacion?.id === presentacionId
                                ? {
                                    ...i,
                                    cantidad:
                                        i.cantidad > 1
                                            ? i.cantidad - 1
                                            : 1,
                                }
                                : i
                        ),
                })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "shopping-cart",
        }
    )
);