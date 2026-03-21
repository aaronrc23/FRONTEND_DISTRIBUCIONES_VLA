import type { Row } from "@tanstack/react-table";
import { useModal } from "../../../../shared/hooks/useModal";
import { showConfirmation } from "../../../../shared/hooks/useSwalert";
import { useCrudAlmacen } from "../hooks/useCrudAlmacen";
import type { Almacen } from "../validation/fr_val_almacen";
import { Icon } from "@iconify-icon/react";
import { Badge, Button } from "../../../../shared/ui";
import { useAlmacenStore } from "../store/useAlmacenStore";


export default function ColumnsAlmacen() {
    const modalEdit = useModal("md-editAlm")
    const { setData } = useAlmacenStore();
    const { deleteAlmacen } = useCrudAlmacen();
    const handleEdit = (data: Almacen) => {
        setData(data);
        modalEdit.open()
    };
    const handleDelete = async (id: number) => {
        const ok = await showConfirmation(
            "Confirmar",
            "Estas seguro de eliminar el almacén?",
        );
        if (ok) deleteAlmacen.mutate(id);
    };
    return [
        {
            accessorKey: "nombre",
            header: "Nombre"
        },
        {
            accessorKey: "code",
            header: "Codigo"
        },
        {
            accessorKey: "tipo",
            header: "Tipo",
            cell: ({ row }: { row: Row<Almacen> }) => {
                const tipo = row.original.tipo;

                const styles = {
                    FISICO: "bg-info/10 text-info border-info/40",
                    VIRTUAL: "bg-purple/10 text-purple border-purple/40"
                };

                return (
                    <div className="flex  w-full">
                        <span className={`
                    px-2 py-[4px]
                    rounded-lg
                    text-[11px] font-semibold
                    border
                    ${styles[tipo] || "bg-slate-50 text-slate-600 border-slate-200"}
                `}>
                            {tipo}
                        </span>
                    </div>
                );
            }
        }
        ,
        {
            accessorKey: "is_principal",
            header: "Principal",
            cell: ({ row }: any) => {
                const isPrincipal = Boolean(row.original.is_principal);

                return (
                    <div className="flex  w-full">
                        {isPrincipal ? (
                            <span className="
                        inline-flex items-center gap-1
                        px-2 py-[3px]
                        rounded-full
                        text-xs font-semibold
                        bg-orange-100 text-orange-700
                        border border-orange-200
                    ">
                                <Icon icon="mdi:crown" width="14" />
                                Principal
                            </span>
                        ) : (
                            <span className="text-sm text-center text-foreground-2">—</span>
                        )}
                    </div>
                );
            }
        }
        ,


        {
            accessorKey: "estado",
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
                const id = row.original.id;
                return (
                    <div className="flex w-full ">
                        <div className="w-[90px] flex flex-row items-center justify-center gap-2">
                            <Button
                                size="icon"
                                onClick={() => handleEdit(row.original)}
                                className="bg-info/10 hover:bg-info/20"
                            >
                                <Icon icon="mdi:edit" width="22" height="22" className="text-info" />
                            </Button>
                            <Button
                                size="icon"
                                onClick={() => handleDelete(id)}
                                className="bg-destructive/10 hover:bg-destructive/20"
                            >
                                <Icon icon="mdi:delete" width="22" height="22" className="text-destructive" />
                            </Button>
                        </div>
                    </div>
                );
            }
        }

    ]
}
