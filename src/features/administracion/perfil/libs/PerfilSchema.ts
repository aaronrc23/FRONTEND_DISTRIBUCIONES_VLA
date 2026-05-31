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
        currentPassword: z
            .string()
            .min(1, "La contraseña actual es obligatoria"),
        newPassword: z
            .string()
            .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
        confirmPassword: z
            .string()
            .min(1, "Debes confirmar la contraseña"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type CambiarPasswordFormValues = z.infer<typeof cambiarPasswordSchema>;
