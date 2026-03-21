import type { CategoriaSchema } from "../../common/libs/CategoriaSchema";

export const buildCategoriaFormData = (data: CategoriaSchema) => {
    const fd = new FormData();

    fd.append("name", data.name ?? "");
    fd.append("level", data.level ?? "");

    if (data.parent_id) {
        fd.append("parent_id", data.parent_id);
    }

    if (data.imagen instanceof File) {
        fd.append("imagen", data.imagen);
    }

    return fd;
};
