import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loginPanel } from "../services/LoginPanelService";
import { showError, showLoading, showSuccess } from "../../../shared/hooks/useSwalert";
import { useAuthStoreSession } from "../store/useAuthStoreSession";

export const useAccionAuth = () => {
    const navigate = useNavigate();
    const panelloginmutate = useMutation({
        mutationFn: loginPanel,
        onMutate: () => { showLoading("Cargando", "Iniciando Sesión") },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Error inesperado";

            showError("Error", message);
        },
        onSuccess: (datos: any) => {
            const data = datos?.data || "";
            Cookies.set("tokenp", data.token);
            Cookies.set("refreshTokenp", data.refreshToken);
            useAuthStoreSession.getState().login(data.token);
            showSuccess("Exito", "Sesión iniciada correctamente");
            navigate("/panel");

        },

    });

    return {
        panelloginmutate
    }
}