
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showError, showLoading, showSuccess } from "../../../../shared/hooks/useSwalert";
import { formatLaravelErrors } from "../../../../shared/helpers/formatLaravelErrors";
import { addCategoria, activarCategoria, desactivarCategoria, editCategoria, listCatPadre, listCategorias, deleteCategoria } from "../services/CategoriaService";


type Props = {
    forms?: any;
    onClose?: () => void;
};

export const listarCat = () => {
    return useQuery({
        queryKey: ["categorias"],
        queryFn: listCategorias,
        refetchOnWindowFocus: false,
    })
}

export const listarCatPadre = () => {
    return useQuery({
        queryKey: ["categorias-padre"],
        queryFn: listCatPadre,
        refetchOnWindowFocus: false,
    })
}

export const useCatCrudMuttation = (props?: Props) => {
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
        const message = error.response.data.message || "Error al agregar la categoria";
        const html = error?.response?.data?.errors
            ? formatLaravelErrors(error.response.data.errors)
            : undefined;

        showError("Error", message, html);
    }
    const onSettled = () => {
        queryClient.invalidateQueries({ queryKey: ["categorias"] });
    }

    const AddCatMuttation = useMutation({
        mutationFn: addCategoria,
        onMutate: () => showLoading("Agregando categoria..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const EditCatMuttation = useMutation({
        mutationFn: editCategoria,
        onMutate: () => showLoading("Editando categoria..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const DesactivarCatMuttation = useMutation({
        mutationFn: desactivarCategoria,
        onMutate: () => showLoading("Desactivando categoria..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const ActivarCatMuttation = useMutation({
        mutationFn: activarCategoria,
        onMutate: () => showLoading("Activando categoria..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const DeleteCatMuttation = useMutation({
        mutationFn: deleteCategoria,
        onMutate: () => showLoading("Eliminando categoria..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    return { AddCatMuttation, EditCatMuttation, DeleteCatMuttation, DesactivarCatMuttation, ActivarCatMuttation }

}
