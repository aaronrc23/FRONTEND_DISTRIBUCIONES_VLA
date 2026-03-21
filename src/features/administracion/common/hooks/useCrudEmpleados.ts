import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addEmp, dropEmp, editEmp, listEmpleados } from "../services/EmpleadoService";
import { useModal } from "../../../../shared/hooks/useModal";
import { useEmpStore } from "../store/Empstore";
import {  showConfirmation, showError, showLoading, showSuccess  } from "../../../../shared/hooks/useSwalert";

export function ListEmpleador() {
    const { data, isLoading, error, ...props } = useQuery({
        queryKey: ["empleados"],
        queryFn: listEmpleados,
    })

    return { data, isLoading, error, ...props }
}

export function CrudMuttation() {
    const modalEdit = useModal("drawer-empedit");
    const queryClient = useQueryClient();

    const Success = (data: any) => {
        if (data.success == true) {
            modalEdit.close();
            showSuccess("Exito", data.message ?? "Operacion exitosa");
        }

    }
    const Error = (error: any) => {
        const message = error.response.data.message || "Error al editar el empleado";
        showError("Error", message);
    }

    const handleAddEmp = useMutation({
        mutationFn: addEmp,
        onMutate: () => showLoading("Agregando empleado..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["empleados"] }),
    })
    const handleEditEmp = useMutation({
        mutationFn: editEmp,
        onMutate: () => showLoading("Editando empleado..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["empleados"] }),
    })

    const handleDelete = useMutation({
        mutationFn: dropEmp,
        onMutate: () => showLoading("Eliminando empleado..."),
        onSuccess: (data) => Success(data),
        onError: (error) => Error(error),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["empleados"] }),
    })

    return { handleEditEmp, handleDelete, handleAddEmp }
}

export function AccionesEmpl() {
    const modalEdit = useModal("drawer-empedit");
    const { setData } = useEmpStore();
    const OpenEdit = (data: any) => {
        setData(data);
        modalEdit.open("drawer-empedit");
    };
    const { handleEditEmp, handleDelete, handleAddEmp } = CrudMuttation();
    const handleEmpEdit = async (data: any) => {
        const isconfirm = await showConfirmation("Editar empleado", "¿Estas seguro de editar este empleado?");
        if (!isconfirm) return;

        handleEditEmp.mutate(data);
    }

    const handleAdd = async (data: any) => {
        const isconfirm = await showConfirmation("Agregar empleado", "¿Estas seguro de agregar este empleado?");
        if (!isconfirm) return;

        handleAddEmp.mutate(data);
    }


    const handleDeleteEmp = async (data: any) => {
        const isconfirm = await showConfirmation("Eliminar empleado", "¿Estas seguro de eliminar este empleado?");
        if (!isconfirm) return;

        handleDelete.mutate(data);
    }

    return { handleEmpEdit, OpenEdit, handleDeleteEmp, handleAdd }

}