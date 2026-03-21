import * as z from "zod";

const REQUIRED = "Campo obligatorio";

export const required = {
    string: (msg = REQUIRED) =>
        z.string({
            error: (issue) => issue.input === undefined
                ? msg || REQUIRED
                : "No es una cadena de texto"
        }),

    number: (msg = REQUIRED) =>
        z.preprocess(
            (v) => (v === "" || v === null ? undefined : Number(v)),
            z.number({ error: (issue) => issue.input === undefined ? msg || REQUIRED : "No es un número" }).min(1, "Debe ser mayor a 0")
        ),

    select: (msg = REQUIRED) =>
        z.preprocess(
            (v) => Number(v),
            z.number({ error: (issue) => issue.input === undefined || issue.input === 0 ? msg || REQUIRED : "No se seleccionó un valor" }).min(1, "Debe seleccionar una opción")
        ),
    selectString: (msg = REQUIRED) =>
        z.preprocess(
            (v) => String(v),
            z.string({ error: (issue) => issue.input === undefined || issue.input === "" ? msg || REQUIRED : "No se seleccionó un valor" }).min(1, "Debe seleccionar una opción")
        ),

    true: (msg = REQUIRED) =>
        z.literal(true, {
            error: () => msg,
        }),



    stringNormalized: (msg = REQUIRED) =>
        z.preprocess(
            (v) => {
                if (typeof v !== "string") return v;
                const normalized = v.replace(/\s+/g, " ").trim();
                return normalized === "" ? undefined : normalized;
            },
            z.string({
                error: (issue) =>
                    issue.input === undefined ? msg : "No es una cadena de texto",
            })
        ),

}

