import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createInventario, deleteInventario, listInventario, movInventario } from "../services/inventarioservice"
import { showError, showLoading, showSuccess } from "../../../../shared/hooks/useSwalert"

type Props = {
    forms?: any;
    onClose?: () => void;
};
export const useInventario = () => {
    return useQuery({
        queryKey: ["listInventario"],
        queryFn: listInventario,
        refetchOnWindowFocus: false,
    })
}



export const useCrudInventario = (props?: Props) => {
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
        queryClient.invalidateQueries({ queryKey: ["listInventario"] });
    }

    const addInv = useMutation({
        mutationFn: createInventario,
        onMutate: () => showLoading("Agregando Almacen..."),
        onSuccess: (data) => success(data),
        onError: (data) => error(data),
        onSettled: () => onSellect()
    })

    const updateInv = useMutation({
        mutationFn: movInventario,
        onMutate: () => showLoading("Actualizando Almacen..."),
        onSuccess: (data) => success(data),
        onError: (data) => error(data),
        onSettled: () => onSellect()
    })

    const deleteInv = useMutation({
        mutationFn: deleteInventario,
        onMutate: () => showLoading("Eliminando Almacen..."),
        onSuccess: (data) => success(data),
        onError: (data) => error(data),
        onSettled: () => onSellect()
    })



    return {
        addInv,
        updateInv,
        deleteInv
    }

}
