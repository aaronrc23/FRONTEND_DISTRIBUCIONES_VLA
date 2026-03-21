import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activarSeries, addSeries, desactivarSeries, dropSeries, editSeries, listSeries, listTipocomp } from "../services/SeriesService";
import { useModal } from "../../../../shared/hooks/useModal";
import { showConfirmation, showError, showLoading, showSuccess } from "../../../../shared/hooks/useSwalert";
import { useSeriesStore } from "../store/Empstore";


export function ListSeriesAll() {
    const { data, isLoading, error, ...props } = useQuery({
        queryKey: ["series"],
        queryFn: listSeries,
    })

    return { data, isLoading, error, ...props }
}

export function ListTipocomp() {
    const { data, isLoading, error, ...props } = useQuery({
        queryKey: ["tipocomp"],
        queryFn: listTipocomp,
    })

    return { data, isLoading, error, ...props }
}

export function CrudMuttation() {
    const modalEdit = useModal("drawer-seriesedit");
    const modalAdd = useModal("drawer-series");
    const queryClient = useQueryClient();


    const Success = (data: any) => {
        if (data.success == true) {
            if (modalAdd.isOpen) {
                modalAdd.close();
            }
            if (modalEdit.isOpen) {
                modalEdit.close();
            }
            showSuccess("Exito", data.message ?? "Operacion exitosa");
        }

    }

    const Error = (error: any) => {
        const message = error.response.data.message || "Error al editar la serie";
        showError("Error", message);
    }

    const handleAddSerie = useMutation({
        mutationFn: addSeries,
        onMutate: () => showLoading("Agregando series..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["series"] }),
    })
    const handleEditSerie = useMutation({
        mutationFn: editSeries,
        onMutate: () => showLoading("Editando serie..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["series"] }),
    })

    const handleDesactivarSerie = useMutation({
        mutationFn: desactivarSeries,
        onMutate: () => showLoading("Desactivando serie..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["series"] }),
    })

    const handleActivarSerie = useMutation({
        mutationFn: activarSeries,
        onMutate: () => showLoading("Activando serie..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["series"] }),
    })

    const handleDeleteSerie = useMutation({
        mutationFn: dropSeries,
        onMutate: () => showLoading("Eliminando serie..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["series"] }),
    })

    return { handleEditSerie, handleDeleteSerie, handleAddSerie, handleDesactivarSerie, handleActivarSerie }
}

export const AccionesSeries = () => {
    const modalEdit = useModal("drawer-serieedit");
    const { setData } = useSeriesStore();
    const OpenEdit = (data: any) => {
        setData(data);
        modalEdit.open("drawer-seriesedit");
    };
    const { handleEditSerie, handleDeleteSerie, handleAddSerie, handleDesactivarSerie, handleActivarSerie } = CrudMuttation();
    const handleEdit = async (data: any) => {
        const isconfirm = await showConfirmation("Editar serie", "¿Estas seguro de editar esta serie?");
        if (!isconfirm) return;

        handleEditSerie.mutate(data);
    }

    const handleAdd = async (data: any) => {
        const isconfirm = await showConfirmation("Agregar serie", "¿Estas seguro de agregar esta serie?");
        if (!isconfirm) return;

        handleAddSerie.mutate(data);
    }

    const handleDesactivar = async (data: any) => {
        const isconfirm = await showConfirmation("Desactivar serie", "¿Estas seguro de desactivar esta serie?");
        if (!isconfirm) return;

        handleDesactivarSerie.mutate(data);
    }
    const handleActivar = async (data: any) => {
        const isconfirm = await showConfirmation("Activar serie", "¿Estas seguro de activar esta serie?");
        if (!isconfirm) return;

        handleActivarSerie.mutate(data);
    }


    const handleDestroy = async (data: any) => {
        const isconfirm = await showConfirmation("Eliminar serie", "¿Estas seguro de eliminar esta serie?");
        if (!isconfirm) return;

        handleDeleteSerie.mutate(data);
    }

    return { handleEdit, OpenEdit, handleDestroy, handleAdd, handleDesactivar, handleActivar }
}

