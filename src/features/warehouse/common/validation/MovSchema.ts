
import z from "zod";
import { TipoEntradaForm } from "../utils/EnumTipoEntrada";

const baseSchema = {
    product_id: z.preprocess(
        (val) => {
            if (val === "" || val === null || val === undefined) {
                return undefined;
            }

            const num = Number(val);

            return isNaN(num) ? undefined : num;
        },

        z.number({
            error: "Seleccione un producto",
        }).min(1, "Seleccione un producto")
    ),

    cantidad: z.coerce
        .number()
        .min(1, "La cantidad debe ser mayor a 0"),

    descripcion: z.string().optional(),
};

export const movFormSchema = z.discriminatedUnion("tipo", [

    // ✅ TRANSFERENCIA
    z.object({
        tipo: z.literal(TipoEntradaForm.TRANSFERENCIA, { error: "Tipo inválido" }),

        almacen_origen_id: z
            .string()
            .min(1, "Seleccione almacén origen"),

        almacen_destino_id: z
            .string()
            .min(1, "Seleccione almacén destino"),

        ...baseSchema,
    }).refine(
        (data) =>
            data.almacen_origen_id !==
            data.almacen_destino_id,

        {
            path: ["almacen_destino_id"],
            message:
                "El almacén destino debe ser diferente",
        }
    ),

    // ✅ MOVIMIENTOS NORMALES
    z.object({
        tipo: z.enum(
            [
                TipoEntradaForm.ENTRADA,
                TipoEntradaForm.SALIDA,
                TipoEntradaForm.VENTA,
                TipoEntradaForm.REPOSICION,
                TipoEntradaForm.AJUSTE,
            ],
            {
                error: "Seleccione un tipo de movimiento",
            }
        ),

        almacen_id: z
            .string()
            .min(1, "Seleccione un almacén"),

        ...baseSchema,
    }),
]);


export type MovFormValues = z.infer<typeof movFormSchema>;

export const movFormSchemaEdit = movFormSchema.and(
    z.object({
        id: z.string().optional(),
        estado: z.number().optional(),
    })
);