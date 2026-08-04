import z from "zod";

export const marcasSchema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    descripcion: z.string().optional(),
    slug: z.string().min(3, "El slug debe tener al menos 3 caracteres")
});

export type MarcasSchema = z.infer<typeof marcasSchema>;


export const editMarcasSchema = z.object({
    id: z.number().min(1, "El id es requerido"),
    ...marcasSchema.shape,
});

export type EditMarcasSchema = z.infer<typeof editMarcasSchema>;