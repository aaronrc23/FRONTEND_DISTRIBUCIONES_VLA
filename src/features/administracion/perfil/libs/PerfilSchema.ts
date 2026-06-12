import * as z from "zod";

export const perfilSchema = z.object({
    name: z
        .string()
        .min(1, "El nombre es obligatorio"),
    apellidos: z
        .string()
        .min(1, "Los apellidos son obligatorios"),
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email("El correo debe ser válido"),
    phone: z
        .string()
        .optional(),
});

export type PerfilFormValues = z.infer<typeof perfilSchema>;

export const cambiarPasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, "La contraseña actual es obligatoria"),
        new_password: z
            .string()
            .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
        new_password_confirmation: z
            .string()
            .min(1, "Debes confirmar la contraseña"),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["new_password_confirmation"],
    });

export type CambiarPasswordFormValues = z.infer<typeof cambiarPasswordSchema>;





