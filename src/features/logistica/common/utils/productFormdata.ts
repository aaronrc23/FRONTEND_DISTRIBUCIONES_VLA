import type { ProductSchema } from "../libs/ProductSchema";

export function productToFormData(data: ProductSchema): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (key === "imagenes" && Array.isArray(value)) {
            value.forEach((img) => {
                if (img.file instanceof File) {
                    formData.append("imagenes[]", img.file);
                }
            });
            return;
        }

        if (typeof value === "boolean") {
            formData.append(key, value ? "1" : "0");
            return;
        }

        if (typeof value === "number") {
            formData.append(key, value.toString());
            return;
        }

        formData.append(key, value as string);
    });

    return formData;
}


export function productToFormDataEdit(imgs: any[]): FormData {
    const formData = new FormData();

    imgs.forEach((img, index) => {

        // 🧠 estructura obligatoria para Laravel
        formData.append(`imagenes[${index}][orden]`, String(img.orden));
        formData.append(
            `imagenes[${index}][isPrincipal]`,
            img.isPrincipal ? "1" : "0"
        );

        // si existe id (imagen vieja)
        if (img.id) {
            formData.append(`imagenes[${index}][id]`, String(img.id));
        }

        // 🆕 solo archivos nuevos
        if (img.file instanceof File) {
            formData.append(`newFiles[${index}]`, img.file);
        }
    });

    return formData;
}
