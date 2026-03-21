

import z from "zod";
import { required } from "../../../../shared/helpers/validataionzod";

export const productSchema = z.object({
    name: required.stringNormalized("El nombre es requerido").pipe(z.string().min(3, "Debe tener al menos 3 caracteres")),

    unidad_id: required.selectString("Debe seleccionar una unidad"),

    tipo_afectacion_id: required.selectString("Debe seleccionar una afectación"),

    categoria_id: required.select("Debe seleccionar una categoría").optional(),

    cantidad_mayoreo: z.preprocess(
        (v) => (v === "" || v === undefined ? undefined : Number(v)),
        z.number().optional().nullable()
    ),

    afecto_icbper: z.boolean().optional(),

    factor_icbper: z
        .preprocess(
            (v) => (v === "" || v === undefined ? undefined : Number(v)),
            z.number().min(0.01, "Debe ser mayor a 0").optional()
        ),

    precio_compra: required.number("El precio de compra es requerido").pipe(z.number().min(0.01, "Debe ser mayor a 0")),

    precio_venta: required.number("El precio de venta es requerido").pipe(z.number().min(0.01, "Debe ser mayor a 0")),

    precio_mayoreo: required.number("El precio de mayoreo es requerido").pipe(z.number().min(0.01, "Debe ser mayor a 0")),

    description: z
        .string()
        .optional()
        .transform((v) =>
            v?.replace(/\s+/g, " ").trim()
        )
        .refine(
            (v) => !v || v.length <= 2000,
            "Máximo 2000 caracteres"
        ),


    destacar: z.boolean().optional(),

    imagenes: z
        .array(
            z.object({
                file: z.instanceof(File).optional(),
                orden: z.number(),
                isPrincipal: z.boolean(),
            })
        )
        .max(4)
        .optional()

}).superRefine((data, ctx) => {
    if (data.afecto_icbper && !data.factor_icbper) {
        ctx.addIssue({
            path: ["factor_icbper"],
            message: "El factor ICBPER es requerido",
            code: z.ZodIssueCode.custom,
        });
    }
});


export type ProductSchema = z.infer<typeof productSchema>;

// const ImageItemSchema = z.object({
//     id: z.number().optional(),
//     file: z.instanceof(File).optional(),
//     url: z.string().optional(),
//     orden: z.number(),
//     isPrincipal: z.boolean(),
// });


export const EditProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    unidad_id: z.string().optional(),
    tipo_afectacion_id: z.string().optional(),
    categoria_id: z.string().optional(),
    cantidad_mayoreo: z.number().optional(),
    afecto_icbper: z.coerce.boolean().optional(),
    factor_icbper: z.number().optional(),
    precio_compra: z.coerce.number().optional(),
    precio_venta: z.coerce.number().optional(),
    precio_mayoreo: z.coerce.number().optional().nullable(),
    description: z.string().optional(),
    destacado: z.coerce.boolean().optional(),
    imagenes: z
        .array(
            z.object({
                file: z.instanceof(File).optional(),
                orden: z.number(),
                isPrincipal: z.boolean(),
            })
        )
        .max(4)
        .optional()

});

export type EditProdForm = z.infer<typeof EditProductSchema>;