import { FrInput } from '../../../../../shared/components/atoms/FR/FrInput';
import { FrSelect } from '../../../../../shared/components/atoms/FR/FrSelect';

export default function FrmInfoProd({ methods, data }: any) {

    const subcategorias = data?.categoria || [];
    const unidades = data?.unidad || [];
    const tipo_afectacion = data?.afectacion || [];
    const marcas = data?.marcas || [];
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
                    options={unidades.map((item: any) => ({
                        value: (item.id).toString(),
                        label: item.descripcion,
                    }))}
                />

                <FrSelect
                    name="tipo_afectacion_id"
                    label="Afectación al IGV"
                    control={methods.control}
                    options={tipo_afectacion.map((item: any) => ({
                        value: (item.id).toString(),
                        label: item.descripcion,
                    }))}
                />
                <div className="">
                    <FrSelect
                        name="categoria_id"
                        label="Categoría"
                        control={methods.control}
                        options={subcategorias.map((item: any) => ({
                            value: (item.id).toString(),
                            label: item.name,
                        }))}
                    />
                </div>

                <div className="">
                    <FrSelect
                        name="marca_id"
                        label="Marcas"
                        control={methods.control}
                        options={marcas.map((item: any) => ({
                            value: (item.id).toString(),
                            label: item.nombre,
                        }))}
                    />
                </div>


            </div>
        </section>
    )
}
