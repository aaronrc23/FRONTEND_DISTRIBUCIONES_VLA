import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getFooter,
    updateFooter,
    updateFooterLinks,
} from "../services/FooterService";
import { showError, showLoading, showSuccess } from "@/shared/hooks/useSwalert";
import { formatLaravelErrors } from "@/shared/helpers/formatLaravelErrors";

export const useGetFooter = () => {
    return useQuery({
        queryKey: ["footer"],
        queryFn: getFooter,
        refetchOnWindowFocus: false,
    });
};

export const useFooterMutation = () => {
    const queryClient = useQueryClient();

    const onSettled = () => {
        queryClient.invalidateQueries({ queryKey: ["footer"] });
    };

    const UpdateFooterMut = useMutation({
        mutationFn: updateFooter,
        onMutate: () => showLoading("Guardando configuración..."),
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

    const UpdateFooterLinksMut = useMutation({
        mutationFn: updateFooterLinks,
        onMutate: () => showLoading("Guardando links..."),
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
        UpdateFooterMut,
        UpdateFooterLinksMut,
    };
};
