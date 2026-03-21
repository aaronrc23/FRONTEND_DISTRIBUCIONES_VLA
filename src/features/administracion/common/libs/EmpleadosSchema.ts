import * as z from "zod";

export const empleadosSchema = z.object({
    name: z
        .string()
        .min(1, "El nombre es obligatorio"),
    apellidos: z
        .string()
        .min(1, "El apellido es obligatorio"),
    dni: z
        .string()
        .min(1, "El DNI es obligatorio"),
    genero: z
        .string()
        .min(1, "El género es obligatorio"),
    direccion: z
        .string()
        .optional(),
    phone: z
        .string()
        .optional(),
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email("El correo debe ser válido"),

    password: z
        .string()
        .min(1, "La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    sucursal_id: z
        .string()
        .min(1, "La sucursal es obligatoria"),
});


export type EmpleadosFormValues = z.infer<typeof empleadosSchema>;



export const empleadosEditSchema = z.object({
    id: z
        .number()
        .optional(),
    name: z
        .string()
        .min(1, "El nombre es obligatorio"),
    apellidos: z
        .string()
        .min(1, "El apellido es obligatorio"),
    dni: z
        .string()
        .min(1, "El DNI es obligatorio"),
    genero: z
        .string()
        .optional(),
    direccion: z
        .string()
        .optional(),
    phone: z
        .string()
        .optional(),
    email: z
        .string()
        .optional(),

    password: z
        .string()
        .optional(),
    sucursal_id: z
        .number()
        .optional(),

});


export type EmpleadosEditFormValues = z.infer<typeof empleadosEditSchema>;






