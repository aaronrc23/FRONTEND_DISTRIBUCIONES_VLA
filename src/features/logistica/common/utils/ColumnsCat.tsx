
import { Icon } from '@iconify-icon/react';

import { useCatCrudMuttation } from '../../common/hooks/useCrudCat';
import { Button, Toggle } from '../../../../shared/ui';
import { useModal } from '../../../../shared/hooks/useModal';
import { showConfirmation } from '../../../../shared/hooks/useSwalert';
import { useCatStore } from '../store/useCatStore';
import { Badge } from '../../../../shared/ui/badge';
import { BtnOpcion } from '../../../../shared/components/atoms/FR/BtnOpcion';



export default function ColumnsCat() {
    const { setInfo } = useCatStore();

    const modalEdit = useModal("md-cat-edit");
    const { DesactivarCatMuttation, ActivarCatMuttation } = useCatCrudMuttation();
    const handleEdit = (category: any) => {
        setInfo(category);
        modalEdit.open();
    };
    const handleDelete = async (category: any) => {
        const isconfirm = await showConfirmation("Desactivar categoria", "¿Estas seguro de desactivar esta categoria?");
        if (!isconfirm) return;
        DesactivarCatMuttation.mutate(category.id);
    };

    const handleActive = async (category: any) => {
        const isconfirm = await showConfirmation("Activar categoria", "¿Estas seguro de activar esta categoria?");
        if (!isconfirm) return;
        ActivarCatMuttation.mutate(category.id);
    };
    const handleToggle = async (category: any) => {
        if (category.isActive) {
            await handleDelete(category); // desactiva
        } else {
            await handleActive(category); // activa
        }
    };

    return (
        [
            {
                accessorKey: "",
                header: "#",
                cell: ({ row }: any) => row.index + 1,
            },

            {
                accessorKey: "name",
                header: "Nombre",
            },
            {
                accessorKey: "level",
                header: "Nivel",
                cell: ({ row }: any) => {
                    const level = row.original.level;

                    const getColor = () => {
                        switch (level) {
                            case "categoria":
                                return "success";
                            case "subcategoria":
                                return "warning";
                            case "items":
                                return "info";
                            default:
                                return "default";
                        }
                    };

                    return (
                        <Badge color={getColor()} visual="flat" size="sm">
                            {level}
                        </Badge>
                    );
                },
            },

            {
                accessorKey: "parentCategoryName",
                header: "Categoria Padre",
                cell: ({ row }: any) => {
                    const parentCategoryName = row.original.parentCategoryName;
                    return (
                        <span>{parentCategoryName ?? "No aplica"}</span>
                    );
                },
            },
            {
                accessorKey: "isActive",
                header: "Estado",
                cell: ({ row }: { row: any }) => (
                    <div className="flex items-center gap-2" >
                        {row.original.isActive ? <Badge visual="flat" color="success">Activo</Badge> : <Badge visual="flat" color="destructive">Inactivo</Badge>}
                    </div>
                ),
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
                                    checked={category.isActive}
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
                                        category.isActive ?
                                            {
                                                label: "Desactivar",
                                                icon: "lets-icons:trash",


                                                onClick: () => handleDelete(category),
                                            } : {
                                                label: "Activar",
                                                icon: "mdi:backup-restore",

                                                onClick: () => handleActive(category),
                                            }
                                    ]}
                                />
                            </div>
                        </div>
                    );
                },
            }

        ]
    )
}
