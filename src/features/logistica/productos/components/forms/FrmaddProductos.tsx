import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../../../../shared/ui';
import { showConfirmation } from '../../../../../shared/hooks/useSwalert';
import { productToFormData } from '../../../common/utils/productFormdata';
import { productSchema, type ProductSchema } from '../../../common/libs/ProductSchema';
import { listarRefProd, useProdCrudMut } from '../../../common/hooks/useCrudProd';
import { zodResolver } from '@hookform/resolvers/zod';
import FrDetalle from '../plantillas/FrDetalle';
import FrmImg from '../plantillas/FrmImg';
import FrmPrecios from '../plantillas/FrmPrecios';
import FrmInfoProd from '../plantillas/FrmInfoProd';

export default function FrmaddProductos({ onClose }: { onClose?: () => void }) {
    const methods = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            unidad_id: "NIU",
            tipo_afectacion_id: "10",
            afecto_icbper: false,
            imagenes: []
        },
    });

    const { data: refprod } = listarRefProd();
    const { AddProdMuttation } = useProdCrudMut({ onClose });
    console.log("errors", methods.formState.errors);

    const onSubmit = async (data: ProductSchema) => {
        console.log(data);
        const formData = productToFormData(data);
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        const confirm = await showConfirmation("¿Estas seguro de guardar el producto?");
        if (confirm) { AddProdMuttation.mutate(formData); }

    };



    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-8 p-2 py-4"
            >
                <FrmInfoProd methods={methods} data={refprod} />
                <FrmPrecios methods={methods} />
                <FrDetalle methods={methods} />

                {/* ================== IMAGEN ================== */}
                <FrmImg
                    value={methods.watch("imagenes") || []}
                    onChange={(imgs) => methods.setValue("imagenes", imgs)} />

                {/* ================== ACTIONS ================== */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                    <Button type='button' variant={"secondary"} onClick={onClose} size={"lg"} className=" cursor-pointer">
                        Cancelar
                    </Button>

                    <Button type="submit" size={"lg"} className="cursor-pointer">Guardar producto</Button>
                </div>
            </form>
        </FormProvider>
    );
}