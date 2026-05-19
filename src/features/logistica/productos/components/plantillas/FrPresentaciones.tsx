import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Texto } from "../../../../../shared/ui";
import { FrInput } from "../../../../../shared/components/atoms/FR/FrInput";
import { Plus, Trash2 } from "lucide-react";

export default function FrPresentaciones() {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "presentaciones",
    });

    return (
        <div className="w-full">
            {/* Filas */}
            <div className="flex flex-col gap-4">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="
                            border-none rounded-xl p-4 shadow-none
                            md:border-0 md:p-0 md:shadow-none
                        "
                    >
                        <Texto className="font-semibold mb-4  text-secondary-foreground">Presentación {index + 1}</Texto>
                        <div
                            className="
                                    grid
                                    grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
                                    gap-3
                                "
                        >
                            <div>
                                <FrInput
                                    control={control}
                                    label="Medida"
                                    name={`presentaciones.${index}.medida`}
                                    placeholder="1/2 pulgada"
                                    className="h-9 text-sm"
                                />
                            </div>

                            <div>
                                <FrInput
                                    control={control}
                                    label="Und x caja"
                                    name={`presentaciones.${index}.unidades_por_caja`}

                                    className="h-9 text-sm"
                                />
                            </div>

                            <FrInput
                                control={control}
                                label="Largo"
                                name={`presentaciones.${index}.largo`}
                                type="number"
                            />

                            <FrInput
                                control={control}
                                label="Ancho"
                                name={`presentaciones.${index}.ancho`}
                                type="number"
                            />
                            <FrInput
                                control={control}
                                label="Peso"
                                name={`presentaciones.${index}.peso`}
                                type="number"
                            />



                            <div>
                                <div className="flex gap-2 items-end">
                                    <FrInput
                                        control={control}
                                        label="Alto"
                                        name={`presentaciones.${index}.alto`}
                                        type="number"
                                    />

                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="icon"
                                        className="h-9 w-9 shrink-0"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón agregar */}
            <div className="mt-5">
                <Button
                    type="button"
                    variant="indigo"
                    className="w-full border-dashed cursor-pointer flex items-center justify-center gap-2"
                    onClick={() =>
                        append({
                            medida: "",
                            undCaja: 0,
                            dimensiones: "",
                            peso: 0,
                        })
                    }
                >
                    <Plus size={16} />
                    Agregar variante de empaque
                </Button>
            </div>
        </div>
    );
}