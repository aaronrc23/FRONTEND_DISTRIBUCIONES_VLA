import { Texto } from '../../../../../shared/ui'

export default function CardProd({ producto }: { producto: any }) {
    return (
        <div className="border rounded-lg p-3 bg-card" >
            <div className="flex gap-2">
                <Texto className="text-sm font-semibold">Producto:</Texto>
                <Texto className="text-sm">{producto.name}</Texto>
            </div>
            <div className="flex gap-2">
                <Texto className="text-sm font-semibold">Precio Venta:</Texto>
                <Texto className="text-sm">{producto.precio_venta}</Texto>
            </div>
            <div className="flex gap-2">
                <Texto className="text-sm font-semibold">Categoria:</Texto>
                <Texto className="text-sm">{producto.categoria_id}</Texto>
            </div>
        </div >
    )
}
