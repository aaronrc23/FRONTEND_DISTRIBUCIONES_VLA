import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addBanner,
    editBanner,
    listBanners,
    deleteBanner,
    activateBanner,
    desactivateBanner,

} from "../services/BannerService";
import { showError, showLoading, showSuccess } from "@/shared/hooks/useSwalert";
import { formatLaravelErrors } from "@/shared/helpers/formatLaravelErrors";

type Props = {
    forms?: any;
    onClose?: () => void;
};

export const useListarBanners = () => {
    return useQuery({
        queryKey: ["banners"],
        queryFn: listBanners,
        refetchOnWindowFocus: false,
    });
};

export const useBannerCrudMutation = (props?: Props) => {
    const { forms, onClose } = props ?? {};
    const queryClient = useQueryClient();

    const Success = (data: any) => {
        if (data.success === true) {
            showSuccess(data.message, data.detail ?? undefined);
            forms?.reset();
            onClose?.();
        } else {
            showError("Error", data.message);
        }
    };

    const Error = (error: any) => {
        const message = error.response?.data?.message || "Error al procesar la solicitud";
        const html = error?.response?.data?.errors
            ? formatLaravelErrors(error.response.data.errors)
            : undefined;
        showError("Error", message, html);
    };

    const onSettled = () => {
        queryClient.invalidateQueries({ queryKey: ["banners"] });
    };

    const AddBannerMut = useMutation({
        mutationFn: addBanner,
        onMutate: () => showLoading("Agregando banner..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    });

    const EditBannerMut = useMutation({
        mutationFn: editBanner,
        onMutate: () => showLoading("Editando banner..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    });

    const DesactivarBannerMut = useMutation({
        mutationFn: desactivateBanner,
        onMutate: () => showLoading("Desactivando banner..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    });

    const ActivarBannerMut = useMutation({
        mutationFn: activateBanner,
        onMutate: () => showLoading("Activando banner..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    });

    const DeleteBannerMut = useMutation({
        mutationFn: deleteBanner,
        onMutate: () => showLoading("Eliminando banner..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    });

    return {
        AddBannerMut,
        EditBannerMut,
        DeleteBannerMut,
        ActivarBannerMut,
        DesactivarBannerMut,
    };
};
