import { useMutation, useQuery } from "@tanstack/react-query"

import { listPerm, listPermByUser, sincronizarPermisos } from "../services/PermisosService"
import { showError, showSuccess } from "../../../../shared/hooks/useSwalert"


export const listPermisos = () => {
    return useQuery({
        queryKey: ["permisos"],
        queryFn: listPerm,
        refetchOnWindowFocus: false,
    })
}

export const listUserPermisos = (id: number) => {
    return useQuery({
        queryKey: ["permisosuser"],
        queryFn: () => listPermByUser(id),
        refetchOnWindowFocus: false,
    })
}


export const useModificarPermisos = (id: number) => {
    return useMutation({
        mutationFn: (permissions: string[]) =>
            sincronizarPermisos(id, permissions),
        onSuccess: () => {
            showSuccess("Exito", "Permisos actualizados correctamente");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Error al guardar permisos";
            showError("Error", message);
        }
    });
};