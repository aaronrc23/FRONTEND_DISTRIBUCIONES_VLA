import InputSearch from "@/shared/components/molecules/InputSearch";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";

export default function Searchplant({ forms, SearchProductos, cantidad, name }: any) {
    const errorProducto = forms.formState.errors?.producto ?? forms.formState.errors?.[name];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <InputSearch
                    label="Buscar producto"
                    fetchOptions={SearchProductos}
                    onClear={() =>
                        forms.setValue("product_id", undefined as any, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }

                    onSelect={(prod) =>
                        forms.setValue("product_id", Number(prod.id), {
                            shouldValidate: true,
                        })
                    }
                />
                {errorProducto && (
                    <p className="text-xs text-red-500">
                        {errorProducto.message as string}
                    </p>
                )}
            </div>

            {/* Renderizado condicional con animación de entrada suave */}
            {/* {productoSeleccionado && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <CardProd producto={productoSeleccionado} />
                </div>
            )} */}

            <FrInput
                type="number"
                label="Cantidad"
                placeholder="Stock del producto"
                name={cantidad ?? "stock"}
                min={0}
                control={forms.control}
            />
        </div>
    )
}