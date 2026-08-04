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
import FormSection from '../plantillas/FormSection';
import { FrTabs } from '../../../../../shared/components/atoms/FR/FrTabs';
import FrCaracteristicas from '../plantillas/FrCaracteristicas';
import FrPresentaciones from '../plantillas/FrPresentaciones';

export default function FrmaddProductos({ onClose }: any) {
    const methods = useForm<ProductSchema>({
        resolver: zodResolver(productSchema as any),
        defaultValues: {
            unidad_id: "NIU",
            tipo_afectacion_id: "10",
            afecto_icbper: false,
            cantidad_mayoreo: 0,
            imagenes: [],
            marca_id: "",
            caracteristicas: [{ descripcion: "" }],
            presentaciones: []
        },
    });

    const { data: refprod } = listarRefProd();
    const { AddProdMuttation } = useProdCrudMut({ forms: methods });

    const onSubmit = async (data: ProductSchema) => {
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
                onSubmit={methods.handleSubmit(onSubmit as any)}
                className="w-full  justify-start"
            >

                <FrTabs
                    variant="pill"
                    tabs={[
                        {
                            id: "tab1",
                            label: "Producto",
                            content: < div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 py-4">
                                <div className='flex flex-col gap-4'>
                                    <FormSection title="Información del producto" icon="si:info-fill" >
                                        <FrmInfoProd methods={methods} data={refprod} />
                                    </FormSection>
                                    <FormSection title="Precios y stock" icon="mdi:cash-register"  >
                                        <FrmPrecios methods={methods} />
                                    </FormSection>
                                </div>

                                <div className='flex flex-col gap-4'>

                                    <FormSection title="Imágenes y detalles" icon="mdi:image-multiple" >
                                        <FrmImg
                                            value={methods.watch("imagenes") || []}
                                            onChange={(imgs) => methods.setValue("imagenes", imgs)} />
                                        <FrDetalle methods={methods} />
                                    </FormSection>
                                </div></div>,
                        },
                        {
                            id: "tab2",
                            label: "Detalles",
                            content: <div className='w-full flex flex-col gap-3 items-stretch'>

                                <FormSection title={<>Características Técnicas < span className='text-xs text-gray-600 dark:text-gray-400'> (Opcional)</span></>} icon="si:info-fill" >
                                    <FrCaracteristicas />
                                </FormSection>

                                <FormSection title={<>Presentaciones y Logísticas < span className='text-xs text-gray-600 dark:text-gray-400'> (Opcional)</span></>} icon="si:info-fill" >
                                    <FrPresentaciones />
                                </FormSection></div>,
                        },

                    ]}
                />


                <div className="flex justify-center gap-3 pt-6 col-span-1 lg:col-span-2 ">
                    <Button type='button' variant={"secondary"} onClick={onClose} size={"lg"} className=" cursor-pointer">
                        Cancelar
                    </Button>

                    <Button type="submit" variant={"primary"} size={"lg"} className="cursor-pointer">Guardar producto</Button>
                </div>


            </form >
        </FormProvider >
    );
}