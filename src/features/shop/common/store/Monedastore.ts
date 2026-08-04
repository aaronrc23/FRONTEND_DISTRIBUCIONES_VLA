import { create } from "zustand";

type Moneda = "PEN" | "USD";


interface MonedaStore {
    moneda: Moneda;
    setMoneda: (moneda: Moneda) => void;
    simbolo: string
}

export const useMonedaStore = create<MonedaStore>((set) => ({
    moneda: "PEN",

    setMoneda: (moneda) =>
        set({
            moneda,
        }),

    simbolo: "S/"
}));