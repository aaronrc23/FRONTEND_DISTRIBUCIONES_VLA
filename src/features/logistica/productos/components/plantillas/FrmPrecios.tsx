import { FrInput } from "../../../../../shared/components/atoms/FR/FrInput";
export default function FrmPrecios({ methods }: any) {
    return (
        <section className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div >
                    <FrInput
                        name="precio_compra"
                        label="Precio de compra"
                        control={methods.control}
                        type="number"
                        placeholder="0.00"
                        prefix="S/ "
                    />
                </div>

                <div>
                    <FrInput
                        name="precio_venta"
                        label="Precio de venta"
                        control={methods.control}
                        type="number"
                        placeholder="0.00"
                        prefix="S/ "
                    />
                </div>

                <div>
                    <FrInput
                        name="precio_mayoreo"
                        label="Precio al mayoreo"
                        control={methods.control}
                        type="number"
                        placeholder="0.00"
                        prefix="S/ "
                    />
                </div>
                <div className="">

                    <FrInput
                        name="cantidad_mayoreo"
                        label="Cantd mín. para mayoreo"
                        control={methods.control}
                        type="number"
                        placeholder="0"
                        min={0}

                    />

                </div>
            </div>


        </section>
    )
}
