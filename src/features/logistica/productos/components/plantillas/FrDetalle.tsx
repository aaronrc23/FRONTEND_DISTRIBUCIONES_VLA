import { useEffect } from "react";
import { FrInput } from "../../../../../shared/components/atoms/FR/FrInput";
import { FrCheckbox } from "../../../../../shared/components/atoms/FR/FrCheckbox";
import { FrTextarea } from "../../../../../shared/components/atoms/FR/FrTextarea";
import { CheckboxCard } from "../../../../../shared/components/molecules/CheckboxCard";

export default function FrDetalle({ methods }: { methods: any }) {
    const isDestacado = methods.watch("destacado");
    const afectoIcbper = methods.watch("afecto_icbper");
    useEffect(() => {
        if (!afectoIcbper) {
            methods.setValue("factor_icbper", undefined);
        }
    }, [afectoIcbper]);


    return (
        <section className="grid grid-cols-1  gap-5" >

            <CheckboxCard
                checked={isDestacado}
                variant="success"
                title="Marcar como destacado"
                description="Este producto se mostrará en la sección de destacados"
            >
                <FrCheckbox
                    name="destacado"
                    control={methods.control}
                    size="md"
                    variant="success"
                />
            </CheckboxCard>
            <CheckboxCard
                checked={afectoIcbper}
                variant="primary"
                title="Afecto a ICBPER"
                description="Se aplicará el impuesto por cada bolsa plástica entregada al cliente."

            >
                <FrCheckbox
                    name="afecto_icbper"
                    control={methods.control}
                    size="md"
                    variant="primary"
                />
            </CheckboxCard>


            {afectoIcbper && (
                <div className=" bg-secondary/40 p-4 rounded-md animate-fadeIn">
                    <FrInput
                        name="factor_icbper"
                        label="Factor ICBPER"
                        control={methods.control}
                        type="number"
                        placeholder="0.10"
                        prefix="S/ "
                    />
                </div>
            )}
            <div className="">
                <FrTextarea
                    name="description"
                    label="Descripción del Producto"
                    control={methods.control}
                    placeholder="Describe las características del producto..."
                    textareaSize="lg"
                    required
                />

            </div>



        </section>
    )
}