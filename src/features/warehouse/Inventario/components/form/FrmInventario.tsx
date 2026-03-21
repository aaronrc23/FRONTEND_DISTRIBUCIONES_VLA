import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { showConfirmation, showSuccess } from '../../../../../shared/hooks/useSwalert';
import { frvalInv, type FrvalInvValue } from '../../validation/frInv';
import { Button, Texto } from '../../../../../shared/ui';
import { FrInput } from '../../../../../shared/components/atoms/FR/FrInput';
import { FrSelect } from '../../../../../shared/components/atoms/FR/FrSelect';
import { useAlmacen, useCrudAlmacen } from '../../../common/hooks/useCrudAlmacen';
import InputSearch from '../../../../../shared/components/molecules/InputSearch';
import CardProd from './CardProd';
import { SearchProductos } from '../../../common/services/referencialeservice';
import { useCrudInventario, useInventario } from '../../../common/hooks/useCrudInventario';
interface Props {
    onClose: () => void;
    mode?: "Entrada" | "Salida";
}

export default function FrmInventario({ onClose, mode = "Entrada" }: Props) {
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
        const ok = await showConfirmation("Confirmación", `¿Estas seguro de registrar ${mode} al inventario?`)
        if (ok) {
            showSuccess("Exito", `Inventario ${mode} correctamente`);
            addInv.mutate(data);
            onClose();
        }
    }

    const productoSeleccionado = forms.watch("producto");
    const errorProducto = forms.formState.errors?.producto;
    return (
        <div className=" w-full md:min-w-md">
            <form className="flex gap-3 flex-col" onSubmit={forms.handleSubmit(onSubmit)}>

                <div className=" py-1">
                    <Texto className="text-center font-bold">Registrar {mode}</Texto>
                </div>
                <InputSearch
                    label="Buscar producto"
                    fetchOptions={SearchProductos}
                    onSelect={(prod) =>
                        forms.setValue("producto", prod, { shouldValidate: true })
                    }

                />
                {errorProducto && (
                    <p className="text-red-500 text-xs -mt-2">
                        {errorProducto.message as string}
                    </p>
                )}
                {
                    productoSeleccionado && (
                        <CardProd producto={productoSeleccionado} />
                    )
                }

                <FrInput
                    type="number"
                    label="cantidad"
                    placeholder="Stock del producto"
                    name="stock"
                    min={0}
                    control={forms.control}
                />
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
