import { useMarcaCrudMuttation } from "@/features/logistica/common/hooks/useCrudMarcas";
import { marcasSchema, type MarcasSchema } from "@/features/logistica/common/libs/MarcasSchema";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";
import { FrTextarea } from "@/shared/components/atoms/FR/FrTextarea";
import { showConfirmation } from "@/shared/hooks/useSwalert";
import { Button } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";


export default function FrmAddMarcas() {
    const methods = useForm<MarcasSchema>({
        resolver: zodResolver(marcasSchema as any),
        defaultValues: {
            nombre: "",
            descripcion: "",
            slug: ""
        },
    });

    const { AddMarcaMuttation } = useMarcaCrudMuttation();

    const handleCancel = () => {
        methods.reset();
    };

    const onSubmit = async (data: MarcasSchema) => {
        const isconfirm = await showConfirmation("¿Estas seguro de guardar la marca?");
        if (!isconfirm) return;
        AddMarcaMuttation.mutate(data);
    };
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit as any)}
                className="w-full  flex justify-start flex-col gap-4"
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
        </FormProvider>
    )
}
