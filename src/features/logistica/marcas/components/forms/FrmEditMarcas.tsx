import { useMarcaCrudMuttation } from '@/features/logistica/common/hooks/useCrudMarcas';
import { editMarcasSchema, type EditMarcasSchema } from '@/features/logistica/common/libs/MarcasSchema';
import { FrInput } from '@/shared/components/atoms/FR/FrInput';
import { FrTextarea } from '@/shared/components/atoms/FR/FrTextarea';
import { showConfirmation } from '@/shared/hooks/useSwalert';
import { Button } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

export default function FrmEditMarcas({ info, onClose }: any) {
    const methods = useForm<EditMarcasSchema>({
        resolver: zodResolver(editMarcasSchema as any),
        defaultValues: {
            id: info?.id ?? "",
            nombre: info?.nombre ?? "",
            descripcion: info?.descripcion ?? "",
            slug: info?.slug ?? ""
        },
    });
    const { EditMarcaMuttation } = useMarcaCrudMuttation({ onClose });

    const onSubmit = async (data: EditMarcasSchema) => {
        const isconfirm = await showConfirmation("¿Estas seguro de editar la marca?");
        if (!isconfirm) return;
        EditMarcaMuttation.mutate(data);
    };
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit as any)}
                className="w-full flex flex-col gap-4 "
            >
                <FrInput
                    type="text"
                    control={methods.control}
                    label="Nombre de la marca"
                    name="nombre"
                    placeholder="Ej: Coca-Cola"
                />
                <FrInput
                    type="text"
                    control={methods.control}
                    label="Slug de la marca"
                    name="slug"
                    placeholder="Ej: coca-cola"
                />

                <FrTextarea
                    control={methods.control}
                    label="Descripcion de la marca"
                    name="descripcion"
                    placeholder="Ej: Gaseosa de Coca-Cola"
                />

                <div className="flex gap-2 justify-center pt-2">
                    <Button type="submit" className="cursor-pointer " variant={"primary"}>
                        Guardar
                    </Button>


                </div>

            </form>
        </FormProvider>
    )
}
