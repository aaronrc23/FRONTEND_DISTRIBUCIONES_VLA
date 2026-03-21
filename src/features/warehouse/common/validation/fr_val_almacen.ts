import z from "zod";
import { TipoInvEnum } from "../utils/TipoAlmacen";


export interface Almacen {
    id: number;
    code: string;
    nombre: string;
    tipo: TipoInvEnum;
    estado: number;
    is_principal: boolean;
    created_at?: string;
    updated_at?: string;
}


export const almacenFormAdd = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    tipo: z.enum(TipoInvEnum),
})

export type AlmacenFormValuesAdd = z.infer<typeof almacenFormAdd>;


export const almacenFormEdit = z.object({
    id: z.string().optional(),
    nombre: z.string().min(1, "El nombre es requerido"),
    tipo: z.enum(TipoInvEnum),
    is_principal: z.boolean().optional(),

})

export type AlmacenFormValuesEdit = z.infer<typeof almacenFormEdit>;
