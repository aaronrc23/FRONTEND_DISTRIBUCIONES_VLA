import { z } from "zod";

export const frvalInv = z.preprocess((raw: any) => {
    return {
        producto: raw.producto,
        product_id: Number(raw.producto?.id),
        almacen_id: Number(raw.almacen_id),
        stock: Number(raw.stock),
        min_stock: Number(raw.min_stock),
    };
},
    z.object({
        producto: z
            .object({
                id: z.any(),
                label: z.string()
            })
            .nullable()
            .refine(val => val !== null, {
                message: "Seleccione un producto"
            }),

        product_id: z.number().optional(), // solo interno

        almacen_id: z.number().min(1, "Seleccione un almacén"),
        stock: z.number().min(1, "Ingrese stock válido"),
        min_stock: z.number().min(0, "Ingrese stock mínimo válido"),
    })
        .transform((data) => ({
            product_id: data.product_id,
            almacen_id: data.almacen_id,
            stock: data.stock,
            min_stock: data.min_stock
        })));

export type FrvalInvValue = z.infer<typeof frvalInv>
