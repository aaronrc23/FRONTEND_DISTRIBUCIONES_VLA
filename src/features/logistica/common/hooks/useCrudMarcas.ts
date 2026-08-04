import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { activateMarcas, addMarcas, deleteMarcas, desactivateMarcas, editMarcas, listMarcas } from "../services/MarcaService"
import { showError, showLoading, showSuccess } from "@/shared/hooks/useSwalert"
import { formatLaravelErrors } from "@/shared/helpers/formatLaravelErrors"

type Props = {
    forms?: any;
    onClose?: () => void;
};

export const uselistarMarcas = () => {
    return useQuery({
        queryKey: ["marcas"],
        queryFn: listMarcas,
        refetchOnWindowFocus: false,
    })
}



export const useMarcaCrudMuttation = (props?: Props) => {
    const { forms, onClose } = props ?? {};

    const queryClient = useQueryClient();
    const Success = (data: any) => {
        if (data.success == true) {
            showSuccess(data.message, data.detail ? data.detail : undefined);
            forms?.reset();
            onClose?.();
        } else {
            showError("Error", data.message);
        }

    }
    const Error = (error: any) => {
        const message = error.response.data.message || "Error al agregar la Marca";
        const html = error?.response?.data?.errors
            ? formatLaravelErrors(error.response.data.errors)
            : undefined;

        showError("Error", message, html);
    }
    const onSettled = () => {
        queryClient.invalidateQueries({ queryKey: ["marcas"] });
    }

    const AddMarcaMuttation = useMutation({
        mutationFn: addMarcas,
        onMutate: () => showLoading("Agregando Marca.."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const EditMarcaMuttation = useMutation({
        mutationFn: editMarcas,
        onMutate: () => showLoading("Editando Marca..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const DesactivarMarcaMuttation = useMutation({
        mutationFn: desactivateMarcas,
        onMutate: () => showLoading("Desactivando Marca..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const ActivarMarcaMuttation = useMutation({
        mutationFn: activateMarcas,
        onMutate: () => showLoading("Activando Marca..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const DeleteMarcaMuttation = useMutation({
        mutationFn: deleteMarcas,
        onMutate: () => showLoading("Eliminando Marca..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    return { AddMarcaMuttation, EditMarcaMuttation, DeleteMarcaMuttation, ActivarMarcaMuttation, DesactivarMarcaMuttation };
}
