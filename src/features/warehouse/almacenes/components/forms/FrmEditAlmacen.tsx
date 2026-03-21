import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { almacenFormEdit, type AlmacenFormValuesEdit } from "../../../common/validation/fr_val_almacen";
import { useCrudAlmacen } from "../../../common/hooks/useCrudAlmacen";
import { useEffect } from "react";
import { showConfirmation } from "../../../../../shared/hooks/useSwalert";
import { FrInput } from "../../../../../shared/components/atoms/FR/FrInput";
import { FrSelect } from "../../../../../shared/components/atoms/FR/FrSelect";
import Msj from "../../../../../shared/components/atoms/Msj";
import { Button, Toggle } from "../../../../../shared/ui";
import { Icon } from "@iconify-icon/react";

interface Props {
    onClose?: () => void;
    data?: any;
}

export default function FrmEditAlmacen({ onClose, data }: Props) {

    const forms = useForm<AlmacenFormValuesEdit>({
        resolver: zodResolver(almacenFormEdit),
        defaultValues: {
            nombre: data?.name || "",
            tipo: data?.tipo || "FISICO",
            is_principal: data?.is_principal || false,
        }
    });

    const tipoSeleccionado = forms.watch("tipo");

    const options = [
        { value: "FISICO", label: "Físico" },
        { value: "VIRTUAL", label: "Virtual" },
    ];

    const { updateAlmacen } = useCrudAlmacen({ forms, onClose });

    // 🔥 si cambia a virtual quitar principal
    useEffect(() => {
        if (tipoSeleccionado === "VIRTUAL") {
            forms.setValue("is_principal", false);
        }
    }, [tipoSeleccionado]);

    const onSubmit = async (datos: AlmacenFormValuesEdit) => {
        const ok = await showConfirmation(
            "Confirmar",
            "Estas seguro de actualizar el almacén?",
        );
        if (ok) updateAlmacen.mutate({ data: datos, id: data.id });
    };

    return (
        <div className="w-full md:min-w-[440px]">
            {/* HEADER */}

            <form onSubmit={forms.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5">

                    {/* CODIGO READONLY */}


                    {/* NOMBRE */}
                    <FrInput
                        name="name"
                        control={forms.control}
                        label="Nombre"
                        placeholder="Ej: Almacén principal"
                    />

                    {/* TIPO */}
                    <FrSelect
                        name="tipo"
                        control={forms.control}
                        label="Tipo de almacén"
                        options={options}
                    />

                    {/* PRINCIPAL SOLO FISICO */}




                    {tipoSeleccionado === "FISICO" && (
                        <Msj
                            variant="info"
                            message="Almacén físico, Gestiona stock real en tienda"

                        />

                    )}

                    {tipoSeleccionado === "VIRTUAL" && (

                        <Msj
                            variant="success"
                            message="Almacén virtual , Gestiona stock virtual"
                        />

                    )}


                    {tipoSeleccionado === "FISICO" && (
                        <div
                            className="flex items-center justify-between 
        p-3 rounded-xl border bg-secondary/30"
                        >
                            <div>
                                <p className="font-medium text-sm">
                                    Sede principal
                                </p>
                                <p className="text-xs text-gray-500">
                                    Será la sede por defecto del sistema
                                </p>
                            </div>

                            <Toggle
                                checked={forms.watch("is_principal") || false}
                                onChange={(value) => forms.setValue("is_principal", value)}
                                size="md"
                            />
                        </div>
                    )}




                    {/* BOTONES */}
                    <div className="flex justify-between pt-4 border-t">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancelar
                        </Button>

                        <Button
                            type="submit">
                            <Icon icon="solar:diskette-bold" width="18" />
                            Guardar cambios
                        </Button>
                    </div>

                </div>
            </form>

        </div>
    );
}
