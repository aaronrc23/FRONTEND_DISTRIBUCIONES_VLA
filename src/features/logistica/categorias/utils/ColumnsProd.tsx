import type { ColumnDef } from "@tanstack/react-table"
import { useProdCrudMut } from "../../common/hooks/useCrudProd"
import { useModal } from "../../../../shared/hooks/useModal"
import { showConfirmation } from "../../../../shared/hooks/useSwalert"
import { Badge, Button, Texto, Toggle } from "../../../../shared/ui"
import { Icon } from "@iconify-icon/react"
import { BtnOpcion } from "../../../../shared/components/atoms/FR/BtnOpcion"
import { useProductStore } from "../../common/store/useProductStore"

interface Categoria {
    id: string
    name: string
}

type Producto = {
    id: string
    name: string
    precio_venta: string
    precio_compra: string
    precio_mayoreo: string
    categoria_id: string
    categoria: Categoria
    codigo_interno: string
    codigo_barras: string
    activo: boolean
    destacado: boolean
}
export default function ColumnsProd(): ColumnDef<Producto>[] {
    const moneda = "S/"
    const { desactivarProdMut, activarProdMut } = useProdCrudMut();
    const { setData } = useProductStore();
    const modaledit = useModal("md-edit-producto");
    const handleEdit = (category: Producto) => {
        setData(category);
        modaledit.open("md-edit-producto");
    }
    const handleDesactivar = async (prod: Producto) => {
        const isconfirm = await showConfirmation("Desactivar Producto", "¿Estas seguro de desactivar este producto?");
        if (!isconfirm) return;
        desactivarProdMut.mutate(prod.id);
    }
    const handleActivar = async (prod: Producto) => {
        const isconfirm = await showConfirmation("Activar Producto", "¿Estas seguro de activar este producto?");
        if (!isconfirm) return;
        activarProdMut.mutate(prod.id);
    }
    const handleToggle = async (data: Producto) => {
        if (data.activo) {
            await handleDesactivar(data); // desactiva
        } else {
            await handleActivar(data); // activa
        }
    }
    return [
        {
            accessorKey: "name",
            header: "Producto",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium">{row.original.name}</span>
                    <span className="text-xs text-muted-foreground">
                        Cod: {row.original.codigo_interno || "—"}
                    </span>
                </div>
            ),
        },

        {
            accessorKey: "",
            header: "Precios",
            cell: ({ row }) => {
                const precio_venta = parseFloat(row.original.precio_venta)
                const precio_compra = parseFloat(row.original.precio_compra)
                const precio_mayoreo = parseFloat(row.original.precio_mayoreo)
                return (
                    <div className="flex flex-col gap-1 text-xs">
                        <div className="flex gap-2">
                            <Badge color="success">P.Venta:</Badge>
                            <Texto className="text-xs">{moneda}{precio_venta.toFixed(2)}</Texto>
                        </div>
                        <div className="flex gap-2">
                            <Badge color="warning">P.Compra:</Badge>
                            <Texto className="text-xs">{moneda}{precio_compra.toFixed(2)}</Texto>
                        </div>
                        <div className="flex gap-2">
                            <Badge color="primary">P.V-Mayor:</Badge>
                            <Texto className="text-xs" >{moneda}{precio_mayoreo.toFixed(2)}</Texto>
                        </div>
                    </div>
                )
            },
        },

        {
            accessorKey: "categoria",
            header: "Categoría",
            cell: ({ row }) => (
                <span>{row.original.categoria.name}</span>
            ),
        },
        {
            accessorKey: "activo",
            header: "Estado",
            cell: ({ row }: any) => {
                const isActive = row.original.activo;

                return (
                    <div className="flex w-full">
                        <div className="w-[90px] flex flex-row md:flex-col items-center justify-center gap-1">
                            {isActive === 1 ? (
                                <>
                                    <Badge color="success">Activo</Badge>
                                </>
                            ) : (
                                <>
                                    <Badge color="destructive">Desactivado</Badge>
                                </>
                            )}
                        </div>
                    </div>
                );
            }
        },


        {
            accessorKey: "actions",
            header: "Acciones",
            cell: ({ row }: any) => {
                const category = row.original;
                return (
                    <div>
                        <div className="hidden md:flex gap-2">

                            <Button variant="outline" size="icon" onClick={() => handleEdit(category)} className="cursor-pointer">
                                <Icon icon="cuida:edit-outline" width="20" height="20" className="text-blue-500" />
                            </Button>
                            <Toggle
                                checked={category.activo}
                                size="sm"
                                onChange={() => handleToggle(category)}
                            />
                        </div>
                        <div className="flex gap-2 md:hidden">
                            <BtnOpcion

                                variant="secondary"
                                actions={[
                                    {
                                        label: "Editar",
                                        icon: "cuida:edit-outline",

                                        onClick: () => handleEdit(category),
                                    },
                                    category.activo ?
                                        {
                                            label: "Desactivar",
                                            icon: "lets-icons:trash",



                                            onClick: () => handleDesactivar(category),
                                        } : {
                                            label: "Activar",
                                            icon: "mdi:backup-restore",

                                            onClick: () => handleActivar(category),
                                        }
                                ]}
                            />
                        </div>
                    </div>
                );
            },
        }
    ]
}
