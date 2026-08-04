import { useFieldArray, useFormContext } from "react-hook-form";

import { Plus, Trash2 } from "lucide-react";
import { FrInput } from "../../../../../shared/components/atoms/FR/FrInput";
import { Button } from "../../../../../shared/ui";


export default function FrCaracteristicas() {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "caracteristicas",
    });

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Lista de inputs */}
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2 w-full">
                    <FrInput
                        control={control}
                        label={`Característica ${index + 1}`}
                        name={`caracteristicas.${index}.descripcion`}
                        placeholder={`Característica ${index + 1}`}
                        className="w-full"
                    />

                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="rounded-xl"
                        onClick={() => remove(index)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ))}

            {/* Botón agregar */}
            <Button
                type="button"
                variant="success"
                className="flex items-center gap-2 w-fit rounded-md "
                onClick={() => append({ value: "" })}
            >
                <Plus size={16} />
                Agregar característica
            </Button>
        </div>
    );
}