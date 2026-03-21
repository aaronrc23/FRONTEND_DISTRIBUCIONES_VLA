

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../../shared/ui';
import { FrSelectAsync } from '../../../../../shared/components/atoms/FR/FrSelectAsync';
import { FrSelect } from '../../../../../shared/components/atoms/FR/FrSelect';
import { FrInput } from '../../../../../shared/components/atoms/FR/FrInput';
import { buildCategoriaFormData } from '../../../common/utils/buildCategoriaFormData';
import { showConfirmation } from '../../../../../shared/hooks/useSwalert';
import { CATEGORY_LEVEL } from '../../../common/constants/CategoryLevel';
import { categoriaSchema, type CategoriaSchema } from '../../../common/libs/CategoriaSchema';
import { listarCatPadre, useCatCrudMuttation } from '../../../common/hooks/useCrudCat';

export default function FrmAddCategorias() {
    const { data, isLoading, isError, refetch } = listarCatPadre()
    const forms = useForm<CategoriaSchema>({
        resolver: zodResolver(categoriaSchema),
        defaultValues: {
            name: "",
            level: CATEGORY_LEVEL.CATEGORIA,
            parent_id: "",
            imagen: null,
        },
    });
    const { AddCatMuttation } = useCatCrudMuttation({ forms });
    const onSubmit = async (data: CategoriaSchema) => {
        console.log(data);

        const isConfirm = await showConfirmation("Guardar categoria", "¿Estas seguro de guardar la categoria?")
        if (!isConfirm) return;
        const formData = buildCategoriaFormData(data);

        AddCatMuttation.mutate(formData);
    };
    // const [fileKey, setFileKey] = useState(0);
    const handleCancel = () => {
        forms.reset();
        // setFileKey(prev => prev + 1);

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
                defaultValue={CATEGORY_LEVEL.CATEGORIA}
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

{/* 
            <FrFileInput
                name="imagen"
                label="Imagen"
                control={forms.control}
                key={fileKey}
            />



            {forms.watch("imagen") && (
                <div className="flex gap-2 justify-center ">
                    <FrImagePreview file={forms.watch("imagen")} />
                </div>
            )} */}

            <div className="flex gap-2 justify-center pt-2">
                <Button type="submit" className="cursor-pointer " variant={"primary"}>
                    Guardar
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    className="cursor-pointer"

                >
                    Limpiar
                </Button>
            </div>
        </form>
    );
}
