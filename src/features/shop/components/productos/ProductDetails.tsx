import { useParams } from "react-router-dom";
import { useProductoDetalle } from "../../common/hooks/useConsultas";
import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge, Button, Card, Texto } from "../../../../shared/ui";
import { useCartStore } from "../../common/store/cartStore";
import { showToastSuccess } from "@/shared/hooks/useSwalert";

export default function ProductDetail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useProductoDetalle(id!);

    const [activeImg, setActiveImg] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const addItem = useCartStore((state) => state.addItem);

    // ✅ hooks siempre se ejecutan (aunque data sea undefined)
    const product = data?.producto;

    const images = useMemo(() => {
        if (!product) return [];
        return product.imagenes?.length ? product.imagenes : [{ url: product.imagen }];
    }, [product]);

    const currentImage = activeImg ?? product?.imagen ?? "";

    // ✅ recién aquí retornos condicionales
    if (isLoading) return <p className="p-6">Cargando...</p>;
    if (isError || !data || !product) return <p className="p-6 text-red-500">Error</p>;

    const formatPrice = (value: number) => `S/ ${value.toFixed(2)}`;
    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
            <div className="space-y-6">
                {/* PRODUCTO */}
                <Card className="p-4 md:p-6 shadow-xs hover:shadow-xs">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                        {/* IMÁGENES */}
                        <div className="space-y-4">
                            <div className="rounded-2xl border-border-2 bg-white/60 p-4  dark:bg-zinc-900/40">
                                <div className="aspect-4/3 w-full overflow-hidden rounded-xl  flex items-center justify-center">
                                    <img
                                        src={currentImage}
                                        alt={product.name}
                                        className="h-full w-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Miniaturas */}
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {images.map((img: { id?: number; url: string }) => {
                                    const isActive = currentImage === img.url;
                                    return (
                                        <button
                                            key={img.id ?? img.url}
                                            onClick={() => setActiveImg(img.url)}
                                            className={[
                                                "h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-white/5",
                                                "transition focus:outline-none cursor-pointer p-2",
                                                isActive
                                                    ? "border-blue-500 "
                                                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700",
                                            ].join(" ")}
                                        >
                                            <img src={img.url} alt="preview" className="h-full w-full object-cover" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="flex flex-col justify-start py-4 gap-2">
                            {/* Header */}
                            <div className="space-y-4">
                                <Badge visual="flat" color="primary">
                                    {product.categoria}
                                </Badge>

                                <Texto variant="subtitle" className="font-bold leading-tight">
                                    {product.name}
                                </Texto>
                            </div>

                            {/* Precio */}
                            <div className=" py-3  dark:border-zinc-800">
                                <Texto className="font-medium text-3xl">
                                    {formatPrice(Number(product.precio))}
                                </Texto>


                            </div>

                            {/* Compra */}
                            <div className="space-y-5">

                                <div className="flex gap-2 flex-col">
                                    {product.precio_mayoreo && (
                                        <Texto variant="small" className="text-secondary-foreground">
                                            Precio mayorista: {formatPrice(Number(product.precio_mayoreo))}
                                        </Texto>
                                    )}
                                    <div>
                                        <Badge size="lg" visual="flat" className="px-4 text-sm text-foreground/88 border-none py-2">
                                            Stock disponible:{" "}
                                            {data.stock}
                                        </Badge>
                                    </div>

                                </div>

                                {/* Cantidad */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-sm text-zinc-500">Cantidad</span>

                                    <div className="inline-flex items-center overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                                        <button
                                            onClick={handleDecrease}
                                            className="px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
                                            aria-label="Disminuir cantidad"
                                        >
                                            -
                                        </button>

                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                                            className="w-14 bg-transparent text-center text-sm outline-none [appearance:textfield] dark:text-white"
                                        />

                                        <button
                                            onClick={handleIncrease}
                                            className="px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
                                            aria-label="Aumentar cantidad"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Botón */}
                                <Button
                                    variant="brand"
                                    className="w-full py-3"
                                    size="lg"
                                    onClick={() => {
                                        addItem({
                                            id: product.id,
                                            nombre: product.name,
                                            precio: Number(product.precio),
                                            imagen: product.imagen,
                                            cantidad: quantity,
                                        });
                                        showToastSuccess(
                                            `${product.name} agregado al carrito`
                                        );
                                    }}
                                >
                                    <ShoppingCart size={18} />
                                    Agregar al carrito
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* DESCRIPCIÓN */}
                <Card className="p-4 md:p-6 shadow-xs hover:shadow-xs">
                    <Texto variant="secondary" className="font-bold mb-2">
                        Descripción del producto
                    </Texto>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {product.descripcion}
                    </p>
                </Card>

                {/* CARACTERÍSTICAS + PRESENTACIONES */}
                <div className="grid grid-cols-1 gap-6 ">

                    {/* CARACTERÍSTICAS */}
                    <Card className="p-4 md:p-6 shadow-xs hover:shadow-xs">
                        <Texto variant="secondary" className="font-bold mb-4">
                            Características
                        </Texto>

                        {product.caracteristicas?.length ? (
                            <ul className="space-y-3">
                                {product.caracteristicas.map((item: any, index: number) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                                    >
                                        <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                                        <span>{item.descripcion}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Texto className="text-sm text-zinc-500">
                                Sin características disponibles
                            </Texto>
                        )}
                    </Card>

                    {/* PRESENTACIONES */}
                    <Card className="p-4 md:p-6 shadow-xs hover:shadow-xs">
                        <Texto variant="secondary" className="font-bold mb-4">
                            Presentaciones
                        </Texto>

                        {product.presentaciones?.length ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left border-collapse">

                                    <thead className="text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                                        <tr>
                                            <th className="py-2 pr-3">Medida</th>
                                            <th className="py-2 pr-3">Peso</th>
                                            <th className="py-2 pr-3">Caja</th>
                                            <th className="py-2 pr-3">Dimensiones</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {product.presentaciones.map((item: any) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-border dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
                                            >
                                                {/* Medida */}
                                                <td className="py-3 pr-3 font-medium text-zinc-800 dark:text-zinc-200">
                                                    {item.medida}
                                                </td>

                                                {/* Peso */}
                                                <td className="py-3 pr-3 text-secondary-foreground dark:text-zinc-400">
                                                    {(() => {
                                                        const num = Number(item.peso);
                                                        if (isNaN(num)) return "—";
                                                        return Math.round(num);
                                                    })()}
                                                </td>

                                                {/* Caja */}
                                                <td className="py-3 pr-3 text-secondary-foreground dark:text-zinc-400">
                                                    {(() => {
                                                        const num = Number(item.unidades_por_caja);
                                                        if (isNaN(num)) return "—";
                                                        return Math.round(num);
                                                    })()} u.
                                                </td>

                                                {/* Dimensiones */}
                                                <td className="py-3 pr-3 text-secondary-foreground dark:text-zinc-400">
                                                    {[
                                                        item.dimensiones?.largo,
                                                        item.dimensiones?.ancho,
                                                        item.dimensiones?.alto,
                                                    ]
                                                        .map((v) => {
                                                            const num = Number(v);
                                                            return isNaN(num) ? "—" : Math.round(num);
                                                        })
                                                        .join(" × ")}
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <Texto className="text-sm text-zinc-500">
                                Sin presentaciones disponibles
                            </Texto>
                        )}
                    </Card>
                </div>


            </div>
        </div>
    );
}
