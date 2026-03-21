import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showError, showLoading, showSuccess } from "../../../../shared/hooks/useSwalert";
import {  addAlmacenService, deleteAlmService, listAlmacenes, updataAlmService, updatePrincipalAlmService } from "../services/almacenservice";

type Props = {
    forms?: any;
    onClose?: () => void;
};


export const useAlmacen = () => {
    return useQuery({
        queryKey: ["listAlmacen"],
        queryFn: listAlmacenes,
        refetchOnWindowFocus: false,
    })
}

export const useCrudAlmacen = (props?: Props) => {
    const { forms, onClose } = props ?? {};
    const queryClient = useQueryClient();

    const success = (data: any) => {
        if (data.success == true) {
            showSuccess("Exito", data.message);
            forms?.reset();
            onClose?.();
        } else {
            showError("Error", data.message);
        }

    }
    const error = (data: any) => {
        const error = data.response?.data?.message || data.message || "Error al realizar la operación";
        showError("Error", error);
    }
    const onSellect = () => {
        queryClient.invalidateQueries({ queryKey: ["listAlmacen"] });
    }

    const addAlmacen = useMutation({
        mutationFn: addAlmacenService,
        onMutate: () => showLoading("Agregando Almacen..."),
        onSuccess: (data) => success(data),
        onError: (data) => error(data),
        onSettled: () => onSellect()
    })

    const updateAlmacen = useMutation({
        mutationFn: updataAlmService,
        onMutate: () => showLoading("Actualizando Almacen..."),
        onSuccess: (data) => success(data),
        onError: (data) => error(data),
        onSettled: () => onSellect()
    })

    const deleteAlmacen = useMutation({
        mutationFn: deleteAlmService,
        onMutate: () => showLoading("Eliminando Almacen..."),
        onSuccess: (data) => success(data),
        onError: (data) => error(data),
        onSettled: () => onSellect()
    })

    const updatePrincipalAlmacen = useMutation({
        mutationFn: updatePrincipalAlmService,
        onSuccess: () => { }
    })

    return {
        addAlmacen,
        updateAlmacen,
        deleteAlmacen,
        updatePrincipalAlmacen
    }

}