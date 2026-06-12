import { useMemo } from 'react';
import { FrInput } from '../../../../../shared/components/atoms/FR/FrInput';
import { FrSelect } from '../../../../../shared/components/atoms/FR/FrSelect';

export default function FrmInfoProd({ methods, data }: any) {

    const options = useMemo(() => ({
        unidades: (data?.unidad || []).map((item: any) => ({
            value: String(item.id),
            label: item.descripcion,
        })),
        tipo_afectacion: (data?.afectacion || []).map((item: any) => ({
            value: String(item.id),
            label: item.descripcion,
        })),
        categorias: (data?.categoria || []).map((item: any) => ({
            value: String(item.id),
            label: item.name,
        })),
        marcas: (data?.marcas || []).map((item: any) => ({
            value: String(item.id),
            label: item.nombre,
        })),
    }), [data?.unidad, data?.afectacion, data?.categoria, data?.marcas]);

    return (
        <section className="flex flex-col gap-6">
            <FrInput
                name="name"
                label="Nombre del producto"
                control={methods.control}
                placeholder="Ej: Gaseosa Coca-Cola 500ml"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FrSelect
                    name="unidad_id"
                    label="Unidad de medida"
                    control={methods.control}
                    options={options.unidades}
                />

                <FrSelect
                    name="tipo_afectacion_id"
                    label="Afectación al IGV"
                    control={methods.control}
                    options={options.tipo_afectacion}
                />

                <div>
                    <FrSelect
                        name="categoria_id"
                        label="Categoría"
                        control={methods.control}
                        options={options.categorias}
                    />
                </div>

                <div>
                    <FrSelect
                        name="marca_id"
                        label="Marcas"
                        control={methods.control}
                        options={options.marcas}
                    />
                </div>
            </div>
        </section>
    )
}
