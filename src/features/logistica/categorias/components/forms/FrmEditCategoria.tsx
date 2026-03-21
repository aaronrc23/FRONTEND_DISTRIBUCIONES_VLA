import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showConfirmation } from '../../../../../shared/hooks/useSwalert';
import { useModal } from '../../../../../shared/hooks/useModal';
import { Button } from '../../../../../shared/ui';
import { FrSelect } from '../../../../../shared/components/atoms/FR/FrSelect';
import { CATEGORY_LEVEL } from '../../../common/constants/CategoryLevel';
import { FrInput } from '../../../../../shared/components/atoms/FR/FrInput';
import { FrSelectAsync } from '../../../../../shared/components/atoms/FR/FrSelectAsync';
import { FrImagePreview } from '../../../../../shared/components/atoms/FR/FrImagePreview';
import { buildCategoriaFormData } from '../../../common/utils/buildCategoriaFormData';
import { editCategoriaSchema, type EditCategoriaSchema } from '../../../common/libs/CategoriaSchema';
import { listarCatPadre, useCatCrudMuttation } from '../../../common/hooks/useCrudCat';

export default function FrmEditCategorias({ info }: { info: EditCategoriaSchema }) {
    const { data, isLoading, isError, refetch } = listarCatPadre()
    const modaledit = useModal("md-cat-edit")
    const forms = useForm<EditCategoriaSchema>({
        resolver: zodResolver(editCategoriaSchema),
        defaultValues: {
            id: info.id,
            name: info.name ?? "",
            level: info.level ?? "",
            parent_id: String(info.parent_id) ?? "",
            imagen: info.imagen ?? null,
        },
    });
    const imageValue = forms.watch("imagen");
    const { EditCatMuttation } = useCatCrudMuttation({ forms, onClose: modaledit.close });
    const onSubmit = async (data: EditCategoriaSchema) => {
        const isConfirm = await showConfirmation(
            "Guardar categoría",
            "¿Estás seguro de guardar la categoría?"
        );
        if (!isConfirm) return;
        const formData = buildCategoriaFormData(data);
        EditCatMuttation.mutate({ id: info.id, data: formData });
    };


    const handleCancel = () => {
        forms.reset();
        modaledit.close();
    };


    return (
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FrInput
                control={forms.control}
                name="name"
                type="text"
                placeholder="Nombre de la categoria"
                label="Nombre"
            />

            <FrSelect
                name="level"
                control={forms.control}
                label="Tipo de Categoria"
                defaultValue="CATEGORIA"
                options={[
                    { label: "Categoria padre", value: CATEGORY_LEVEL.CATEGORIA },
                    { label: "Sub Categoria", value: CATEGORY_LEVEL.SUBCATEGORIA },
                ]}
                placeholder="Seleccione estado"
            />
            {forms.watch("level") === CATEGORY_LEVEL.SUBCATEGORIA && (
                <FrSelectAsync
                    name="parent_id"
                    control={forms.control}
                    label="Categoria"
                    isLoading={isLoading}
                    isError={isError}
                    refetch={refetch}
                    options={
                        data?.map((item: any) => ({
                            label: item.name,
                            value: String(item.id),
                        })) ?? []
                    }
                    emptyText="No se encontraron categorías"
                    loadingText="Cargando categorías..."
                />
            )}



            {/* <FrFileInput
                name="imagen"
                label="Imagen"
                control={forms.control}
            />
            {typeof imageValue === "string" && imageValue && (
                <div className="flex gap-2 justify-center">
                    <img
                        src={imageValue}
                        alt="Imagen actual"
                        className="h-32 w-32 object-cover rounded-md"
                    />
                </div>
            )} */}

            {/* PREVIEW DE NUEVA IMAGEN */}
            {imageValue instanceof File && (
                <div className="flex gap-2 justify-center">
                    <FrImagePreview file={imageValue} />
                </div>
            )}

            <div className="flex gap-2 justify-center pt-2">
                <Button type="submit" className="cursor-pointer " >
                    Guardar
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    className=""
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}
