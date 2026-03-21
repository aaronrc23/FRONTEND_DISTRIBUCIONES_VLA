import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showError, showLoading, showSuccess } from "../../../../shared/hooks/useSwalert";
import { activarProducto, addProducto, deleteImagenProducto, desactivarProducto, editProducto, listProductos, setPrincipalImagenProducto, updateImagenProducto } from "../services/ProductService";
import { formatLaravelErrors } from "../../../../shared/helpers/formatLaravelErrors";
import { listRefProduct } from "../services/ReferencialService";
import type { ImgItem } from "../../productos/components/plantillas/FrmImg";


type Props = {
    forms?: any;
    onClose?: () => void;
};
export const listarProd = () => {
    return useQuery({
        queryKey: ["productos"],
        queryFn: listProductos,
        refetchOnWindowFocus: false,
    })
}

export const listarRefProd = () => {
    return useQuery({
        queryKey: ["refprod"],
        queryFn: listRefProduct,
        refetchOnWindowFocus: false,
    })
}





export const useProdCrudMut = (props?: Props) => {
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
        queryClient.invalidateQueries({ queryKey: ["productos"] });
    }

    const AddProdMuttation = useMutation({
        mutationFn: addProducto,
        onMutate: () => showLoading("Agregando producto..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const EditProdMuttation = useMutation({
        mutationFn: editProducto,
        onMutate: () => showLoading("Editando producto..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const desactivarProdMut = useMutation({
        mutationFn: desactivarProducto,
        onMutate: () => showLoading("Desactivando producto..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const activarProdMut = useMutation({
        mutationFn: activarProducto,
        onMutate: () => showLoading("Activando producto..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => onSettled(),
    })

    const updImgProdMuttation = useMutation({
        mutationFn: updateImagenProducto,
        onSuccess: (data) => { if (data.success == true) { showSuccess(data.message, data.detail ? data.detail : undefined) } },
        onError: (error: any) => { const message = error.response.data.message || "Error al actualizar las imágenes"; showError("Error", message) },
        onSettled: () => { queryClient.invalidateQueries({ queryKey: ["productos"] }) },
    })

    const deleteImgProdMut = useMutation({
        mutationFn: deleteImagenProducto,
        onMutate: () => showLoading("Eliminando imágenes..."),
        onSuccess: (data) => { showSuccess(data.message, data.detail ? data.detail : undefined) },
        onError: (error: any) => { const message = error.response.data.message || "Error al eliminar las imágenes"; showError("Error", message) },
        onSettled: () => { queryClient.invalidateQueries({ queryKey: ["productos"] }) },
    })

    const setPrincipalImgProdMut = useMutation({
        mutationFn: setPrincipalImagenProducto,
        onMutate: () => showLoading("Cargando..."),
        onSuccess: (data) => { showSuccess("Exito", data.message) },
        onError: (error: any) => { const message = error.response.data.message || "Error al establecer la imagen principal"; showError("Error", message) },
        onSettled: () => { queryClient.invalidateQueries({ queryKey: ["productos"] }) },
    })

    // const DeleteCatMuttation = useMutation({
    //     mutationFn: deleteCategoria,
    //     onMutate: () => showLoading("Eliminando categoria..."),
    //     onSuccess: (data) => Success(data),
    //     onError: (error) => Error(error),
    //     onSettled: () => onSettled(),
    // })

    return {
        desactivarProdMut, activarProdMut, AddProdMuttation, EditProdMuttation, updImgProdMuttation, deleteImgProdMut, setPrincipalImgProdMut
    }
}


export const updImgProd = async (productId: number, images: ImgItem[]) => {
    const formData = new FormData();
    const { updImgProdMuttation } = useProdCrudMut();

    images.forEach((img, index) => {
        if (img.file) {
            formData.append(`files[]`, img.file);
        }

        if (img.id) {
            formData.append(`imagenes[${index}][id]`, String(img.id));
        }

        formData.append(`imagenes[${index}][orden]`, String(img.orden));
        formData.append(`imagenes[${index}][isPrincipal]`, img.isPrincipal ? "1" : "0");
    });

    const payload = { productId, formData };

    return await updImgProdMuttation.mutateAsync(payload);
};
