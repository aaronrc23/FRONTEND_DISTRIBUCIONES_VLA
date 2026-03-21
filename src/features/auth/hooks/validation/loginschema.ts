import * as z from "zod";

export const loginSchemaPanel = z.object({
    email: z
        .string()
        .email("El correo debe ser válido"),

    password: z
        .string()
        .min(1, "La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});


export type LoginFormValuesPanel = z.infer<typeof loginSchemaPanel>;