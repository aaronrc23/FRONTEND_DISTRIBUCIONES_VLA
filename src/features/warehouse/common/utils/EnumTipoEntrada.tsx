export const TipoEntradaEnum = {
    ENTRADA: "ENTRADA",
    SALIDA: "SALIDA",
    VENTA: "VENTA",
    REPOSICION: "REPOSICION",
    AJUSTE: "AJUSTE",
    TRANSFERENCIA: "TRANSFERENCIA",
    TRANSFERENCIA_ENTRADA: "TRANSFERENCIA_ENTRADA",
    TRANSFERENCIA_SALIDA: "TRANSFERENCIA_SALIDA",
}



export const TipoEntradaForm = {
    ENTRADA: "ENTRADA",
    SALIDA: "SALIDA",
    VENTA: "VENTA",
    REPOSICION: "REPOSICION",
    AJUSTE: "AJUSTE",
    TRANSFERENCIA: "TRANSFERENCIA",

} as const;

export type TipoEntrada =
    (typeof TipoEntradaForm)[keyof typeof TipoEntradaForm];

export const TipoEntradaLabels: Record<TipoEntrada, string> = {
    ENTRADA: "📥 Entrada",
    SALIDA: "📤 Salida",
    REPOSICION: "🔄 Reposición",
    TRANSFERENCIA: "🚚 Transferencia",
    VENTA: "💰 Venta",
    AJUSTE: "⚖️ Ajuste",

};


export const TipoEntradaValues = [
    "ENTRADA",
    "SALIDA",
    "VENTA",
    "REPOSICION",
    "AJUSTE",
    "TRANSFERENCIA",
    "TRANSFERENCIA_ENTRADA",
    "TRANSFERENCIA_SALIDA",
] as const;