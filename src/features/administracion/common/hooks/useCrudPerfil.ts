import { useMutation, useQuery } from "@tanstack/react-query"
import { cambiarPassword, getPerfil } from "../../perfil/services/PerfilService"
import type { PerfilEmpleado, PerfilData } from "../../perfil/interfaces/PerfilInterfaces"
import { showError, showInfo, showSuccess } from "@/shared/hooks/useSwalert"

/**
 * Mapea la respuesta anidada de la API a una estructura plana para el frontend.
 *
 * La API devuelve:
 * {
 *   id, user_id, phone, dni, direccion, ...,
 *   user: { email, ..., profile: { name, apellidos, photo, ... } }
 * }
 */
function mapPerfilResponse(data: PerfilEmpleado): PerfilData {
    return {
        name: data.user?.profile?.name ?? "",
        apellidos: data.user?.profile?.apellidos ?? "",
        email: data.user?.email ?? "",
        phone: data.phone ?? "",
        dni: data.dni ?? "",
        direccion: data.direccion ?? "",
        avatar: data.user?.profile?.photo ?? null,
        genero: data.user?.profile?.genero ?? null,
    }
}

/**
 * Hook principal para obtener el perfil desde la API.
 * Devuelve los datos aplanados listos para el frontend.
 */
export function usePerfil() {
    const query = useQuery<PerfilEmpleado, Error, PerfilData>({
        queryKey: ["perfil"],
        queryFn: getPerfil,
        select: mapPerfilResponse,
        refetchOnWindowFocus: false,
    })

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        isError: query.isError,
        refetch: query.refetch,
    }
}

/**
 * Hook simplificado para el sidebar (solo nombre completo y avatar).
 */
export function usePerfilName() {
    const query = useQuery<PerfilEmpleado>({
        queryKey: ["perfil"],
        queryFn: getPerfil,
        refetchOnWindowFocus: false,
    })

    const profile = query.data
        ? {
            name: profileFullName(query.data),
            avatar: query.data.user?.profile?.photo ?? null,
        }
        : { name: "", avatar: null }

    return { data: profile, isLoading: query.isLoading }
}

function profileFullName(data: PerfilEmpleado): string {
    const p = data.user?.profile
    return p ? `${p.name} ${p.apellidos}`.trim() : ""
}

export const useCrudPerfil = () => {

    //condicion de exito
    const Success = (data: any) => {
        if (data.success == true) {
            showSuccess("Exito", data.message ?? "Operacion exitosa");
        }
        showInfo("Info", data.message ?? "Observacion de la operacion");
    }

    const Error = (error: any) => {
        const message = error.response.data.message || "Error en la operacion";
        showError("Error", message);
    }

    const handleUpdatePassword = useMutation({
        mutationFn: cambiarPassword,
        onMutate: () => showInfo("Actualizando contraseña...", "Por favor espera..."),
        onSuccess: (data: any) => Success(data),
        onError: (error: any) => Error(error),
    });
    return { handleUpdatePassword }
}