import z from "zod";

/** Dimensiones recomendadas para banners del carrusel (relación 2:1) */
export const BANNER_RECOMMENDED_WIDTH = 1600;
export const BANNER_RECOMMENDED_HEIGHT = 800;
export const BANNER_MAX_WIDTH = 4000;
export const BANNER_MAX_HEIGHT = 2000;

/** Helper para obtener dimensiones de una imagen */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("No se pudo leer la imagen"));
        };
        img.src = url;
    });
}

export const bannerSchema = z.object({
    enlace: z.string().max(500, "El enlace no debe exceder 500 caracteres").optional().or(z.literal("")),
    orden: z.coerce.number().int().min(0, "El orden debe ser un número positivo").optional(),
    imagen: z
        .instanceof(File)
        .refine((file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type), {
            message: "La imagen debe estar en formato: jpg, jpeg, png o webp",
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "La imagen no debe superar los 5MB",
        })
        .optional(),
});

export type BannerSchema = z.infer<typeof bannerSchema>;

export const editBannerSchema = z.object({
    id: z.number().min(1, "El id es requerido"),
    ...bannerSchema.shape,
});

export type EditBannerSchema = z.infer<typeof editBannerSchema>;
