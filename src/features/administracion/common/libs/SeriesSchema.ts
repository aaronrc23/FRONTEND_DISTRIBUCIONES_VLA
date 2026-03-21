import * as z from "zod";

export const SeriesSchema = z.object({
    serie: z
        .string()
        .min(1, "La serie es obligatorio"),
    correlativo: z
        .string()
        .min(1, "El correlativo es obligatorio"),
    codigo: z
        .string().optional(),
    tipo_comprobante_id: z
        .string()
        .min(1, "El tipo de comprobante es obligatorio"),
});


export type SerieFormValues = z.infer<typeof SeriesSchema>;



export const SerieEditSchema = z.object({
    id: z
        .number()
        .optional(),
    serie: z
        .string()
        .min(1, "La serie es obligatorio"),
    correlativo: z
        .string()
        .min(1, "El correlativo es obligatorio"),
    codigo: z
        .string()
        .optional(),
    tipo_comprobante_id: z.number({
        error:  "El tipo de comprobante es obligatorio",
    }),
});


export type SerieEditFormValues = z.infer<typeof SerieEditSchema>;


