import { useQuery } from "@tanstack/react-query"
import { listmovimientos } from "../services/movservice"

export const useHistorialMovimientos = () => {
    return useQuery({
        queryKey: ["historialMovimientos"],
        queryFn: listmovimientos,
        refetchOnWindowFocus: false,
    })
}
