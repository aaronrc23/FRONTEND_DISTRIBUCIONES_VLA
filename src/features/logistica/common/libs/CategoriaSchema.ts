import * as z from "zod";
import { CATEGORY_LEVEL } from "../constants/CategoryLevel";



export const categoriaSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    level: z.enum([
        CATEGORY_LEVEL.CATEGORIA,
        CATEGORY_LEVEL.SUBCATEGORIA,
        CATEGORY_LEVEL.ITEM,
    ]),
    parent_id: z.string().optional(),
    imagen: z
        .instanceof(File)
        .optional()
        .nullable(),
});

export type CategoriaSchema = z.infer<typeof categoriaSchema>;


export const editCategoriaSchema = z
    .object({
        id: z.number(),
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
        level: z.enum([
            CATEGORY_LEVEL.CATEGORIA,
            CATEGORY_LEVEL.SUBCATEGORIA,
            CATEGORY_LEVEL.ITEM,
        ]),
        parent_id: z.string().optional(),
        imagen: z
            .union([
                z.instanceof(File),
                z.string().url().or(z.string().min(1)),
                z.null(),
            ])
            .optional(),

    })


export type EditCategoriaSchema = z.infer<typeof editCategoriaSchema>;