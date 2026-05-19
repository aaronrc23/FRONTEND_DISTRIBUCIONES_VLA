import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { showConfirmation, showSuccess } from '../../../../../shared/hooks/useSwalert';
import { frvalInv, type FrvalInvValue } from '../../validation/frInv';
import { Button, Input, Texto } from '../../../../../shared/ui';
import { FrInput } from '../../../../../shared/components/atoms/FR/FrInput';
import { FrSelect } from '../../../../../shared/components/atoms/FR/FrSelect';
import { useAlmacen } from '../../../common/hooks/useCrudAlmacen';
import { SearchProductos } from '../../../common/services/referencialeservice';
import { useCrudInventario } from '../../../common/hooks/useCrudInventario';
import Searchplant from '../plantillas/Searchplant';
interface Props {
    onClose: () => void;

}

export default function FrmInventario({ onClose, }: Props) {
    const forms = useForm<any>(
        {
            defaultValues: {
                producto: null,
                stock: 1,
                min_stock: 1,
            }, resolver: zodResolver(frvalInv)
        }
    );
    const { data } = useAlmacen();
    const { addInv } = useCrudInventario();
    const onSubmit = async (data: FrvalInvValue) => {
        const ok = await showConfirmation("Confirmación", `¿Estas seguro de registrar  al inventario?`)
        if (ok) {
            showSuccess("Exito", `Inventario  correctamente`);
            addInv.mutate(data);
            onClose();
        }
    }



    return (
        <div className=" w-full md:min-w-md">
            <form className="flex gap-3 flex-col" onSubmit={forms.handleSubmit(onSubmit)}>

                <div className=" pb-4">
                    <Texto className="text-center font-bold text-xl">Registrar Entrada de Stock</Texto>
                </div>
                <Searchplant forms={forms} SearchProductos={SearchProductos} />
                <FrInput
                    type="number"
                    label="Min Stock"
                    placeholder="Stock minimo del producto"
                    name="min_stock"
                    min={0}
                    control={forms.control}
                />
 
                <FrSelect
                    label="Almacen"
                    placeholder="Seleccione un almacen"
                    name="almacen_id"
                    control={forms.control}
                    options={data?.map((item: any) => ({
                        value: (item.id).toString(),
                        label: item.nombre,
                    })) || []}
                />

                <div className="flex justify-between gap-2 pt-6">
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
            </form></div>
    )
}
