import { useForm } from 'react-hook-form';
import { almacenFormAdd, type AlmacenFormValuesAdd } from '../../../common/validation/fr_val_almacen';
import { zodResolver } from '@hookform/resolvers/zod';
import { showConfirmation } from '../../../../../shared/hooks/useSwalert';
import { FrInput } from '../../../../../shared/components/atoms/FR/FrInput';
import { FrSelect } from '../../../../../shared/components/atoms/FR/FrSelect';
import { Button } from '../../../../../shared/ui';
import Msj from '../../../../../shared/components/atoms/Msj';
import { useCrudAlmacen } from '../../../common/hooks/useCrudAlmacen';
interface FrmAddAlmacenProps {
    onClose: () => void;
}

export default function FrmAddAlmacen({ onClose }: FrmAddAlmacenProps) {
    const forms = useForm<AlmacenFormValuesAdd>({
        resolver: zodResolver(almacenFormAdd)
    });
    const tipoSeleccionado = forms.watch("tipo");
    const options = [
        { value: "FISICO", label: "Físico" },
        { value: "VIRTUAL", label: "Virtual" },
    ];
    const { addAlmacen } = useCrudAlmacen({ forms, onClose })
    const onSubmit = async (data: AlmacenFormValuesAdd) => {
        const isConfirm = await showConfirmation("Confirmar", "¿Estas seguro de agregar este almacén?")
        if (isConfirm) {
            addAlmacen.mutate(data)
        }
    }
    return (
        <div className="p-0 md:min-w-[400px]">
            <form onSubmit={forms.handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col gap-4">
                    <FrInput
                        name="nombre"
                        control={forms.control}
                        label="Nombre"
                        inputSize="md"
                        placeholder="Ejm: Almacen Inicial"

                    />
                    <FrSelect
                        name="tipo"
                        control={forms.control}
                        label="Tipo"
                        options={options || []}
                    />
                    {tipoSeleccionado === "FISICO" && (
                        <Msj
                            variant="info"
                            message="Has seleccionado un almacén físico"
                            message2="Este almacén se gestionará de manera local."
                        />
                    )}

                    {tipoSeleccionado === "VIRTUAL" && (
                        <Msj
                            variant="success"
                            message="Has seleccionado un almacén virtual. "
                            message2="Se gestionará mediante la nube."
                        />
                    )}

                    <div className="flex justify-between gap-2 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="default"
                        >
                            Guardar
                        </Button>
                    </div>


                </div>
            </form>
        </div>
    )
}
