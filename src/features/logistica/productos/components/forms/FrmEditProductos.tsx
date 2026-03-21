import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { EditProductSchema, type EditProdForm } from '../../../common/libs/ProductSchema';
import { listarRefProd, useProdCrudMut } from '../../../common/hooks/useCrudProd';
import { productToFormDataEdit } from '../../../common/utils/productFormdata';
import { showConfirmation } from '../../../../../shared/hooks/useSwalert';
import FrmInfoProd from '../plantillas/FrmInfoProd';
import FrmPrecios from '../plantillas/FrmPrecios';
import FrDetalle from '../plantillas/FrDetalle';
import FrmImg from '../plantillas/FrmImg';
import { Button } from '../../../../../shared/ui';

export default function FrmEditProductos({ onClose, data }: { onClose?: () => void, data: any }) {
    const { data: refprod } = listarRefProd();
    const methods = useForm<EditProdForm>({
        resolver: zodResolver(EditProductSchema),
        defaultValues: {
            id: data?.id || "",
            name: data?.name || "",
            unidad_id: data?.unidad_id || "",
            tipo_afectacion_id: data?.tipo_afectacion.id || "",
            categoria_id: data?.categoria.id?.toString() ?? "",
            cantidad_mayoreo: data?.cantidad_mayoreo || 0,
            afecto_icbper: data?.afecto_icbper || false,
            factor_icbper: data?.factor_icbper || 0,
            precio_compra: data?.precio_compra || 0,
            precio_venta: data?.precio_venta || 0,
            precio_mayoreo: data?.precio_mayoreo || 0,
            description: data?.description || "",
            destacado: data?.destacado || false,
            imagenes: [],
        },
    });

    const { EditProdMuttation, deleteImgProdMut, updImgProdMuttation, setPrincipalImgProdMut } = useProdCrudMut({ onClose });

    const handleSetPrincipal = async (img: any) => {
        await setPrincipalImgProdMut.mutateAsync(img.id);
        const updated = data.imagenes.map((i: any) => ({
            ...i,
            is_principal: i.id === img.id
        }));
        data.imagenes = updated;
    };


    const mappedImages = useMemo(() => {
        return data?.imagenes?.map(img => ({
            id: img.id,
            url: img.url,
            orden: img.orden,
            isPrincipal: img.is_principal,
        })) || [];
    }, [data?.id]);

    const onSubmit = async (datos: EditProdForm) => {
        const imagenes = datos.imagenes || [];
        const formData = productToFormDataEdit(imagenes);


        for (const [k, v] of formData.entries()) {
            console.log(k, v);
        }

        const confirm = await showConfirmation("¿Estas seguro de editar el producto?");
        if (confirm) {
            EditProdMuttation.mutate({ datos, id: data.id });
            if (formData.has("newFiles[0]")) {
                updImgProdMuttation.mutate({
                    formData,
                    id: data.id
                });
            }
        }
    };

    const DeleteImg = async (data: any) => {
        const confirm = await showConfirmation("¿Estas seguro de eliminar la imagen?");
        if (confirm) { deleteImgProdMut.mutate(data.id); }
        return
    }



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
                    value={mappedImages}
                    onChange={(imgs) => methods.setValue("imagenes", imgs)}
                    onDeleteImage={DeleteImg}
                    onIsPrincipal={handleSetPrincipal}
                />
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