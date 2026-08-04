import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmpresa, updateEmpresa } from "../services/EmpresaService";
import { showError, showLoading, showSuccess } from "@/shared/hooks/useSwalert";
import { formatLaravelErrors } from "@/shared/helpers/formatLaravelErrors";

export const useGetEmpresa = () => {
    return useQuery({
        queryKey: ["empresa"],
        queryFn: getEmpresa,
        refetchOnWindowFocus: false,
    });
};

export const useEmpresaMutation = () => {
    const queryClient = useQueryClient();

    const onSettled = () => {
        queryClient.invalidateQueries({ queryKey: ["empresa"] });
    };

    const UpdateEmpresaMut = useMutation({
        mutationFn: updateEmpresa,
        onMutate: () => showLoading("Guardando datos de la empresa..."),
        onSuccess: (data: any) => {
            if (data.success === true) {
                showSuccess(data.message, data.detail ?? undefined);
            } else {
                showError("Error", data.message);
            }
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Error al procesar la solicitud";
            const html = error?.response?.data?.errors
                ? formatLaravelErrors(error.response.data.errors)
                : undefined;
            showError("Error", message, html);
        },
        onSettled: () => onSettled(),
    });

    return {
        UpdateEmpresaMut,
    };
};
