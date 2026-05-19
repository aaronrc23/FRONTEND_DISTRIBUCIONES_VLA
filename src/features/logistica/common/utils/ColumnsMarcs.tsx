import { BtnOpcion } from "@/shared/components/atoms/FR/BtnOpcion";
import { Badge, Button } from "@/shared/ui";
import { useMarcasStore } from "../store/useMarcarstore";
import { useModal } from "@/shared/hooks/useModal";
import { showConfirmation } from "@/shared/hooks/useSwalert";
import { useMarcaCrudMuttation } from "../hooks/useCrudMarcas";
// import { useMarcaCrudMuttation } from "../hooks/useCrudMarcas";
// import { showConfirmation } from "@/shared/hooks/useSwalert";

export default function ColumnsMarcas() {
    const { setInfo } = useMarcasStore();
    const { ActivarMarcaMuttation, DesactivarMarcaMuttation } = useMarcaCrudMuttation();

    const modalEdit = useModal("md-marcas-edit");
    // const { DesactivarCatMuttation, ActivarCatMuttation } = useMarcaCrudMuttation();
    const handleEdit = (category: any) => {
        setInfo(category);
        modalEdit.open();
    };
    const handleDesactivate = async (marcas: any) => {
        const isconfirm = await showConfirmation("Desactivar categoria", "¿Estas seguro de desactivar esta categoria?");
        if (!isconfirm) return;
        DesactivarMarcaMuttation.mutate(marcas.id);
    };

    const handleActive = async (category: any) => {
        const isconfirm = await showConfirmation("Activar categoria", "¿Estas seguro de activar esta categoria?");
        if (!isconfirm) return;
        ActivarMarcaMuttation.mutate(category.id);
    };
    // const handleToggle = async (category: any) => {
    //     if (category.isActive) {
    //         await handleDelete(category); // desactiva
    //     } else {
    //         await handleActive(category); // activa
    //     }
    // };



    return (
        [
            {
                accessorKey: "",
                header: "#",
                cell: ({ row }: any) => row.index + 1,
            },

            {
                accessorKey: "nombre",
                header: "Nombre",
            },
            {
                accessorKey: "slug",
                header: "Slug",
            },

            {
                accessorKey: "descripcion",
                header: "Descripcion",
            },


            {
                accessorKey: "estado",
                header: "Estado",
                cell: ({ row }: any) => {
                    const estado = row.original.estado;
                    return (
                        <Badge color={estado === "activo" ? "success" : "destructive"} visual="flat" size="md">
                            {estado === "activo" ? "Activo" : "Inactivo"}
                        </Badge>
                    );
                },
            },

            {
                accessorKey: "actions",
                header: "Acciones",
                cell: ({ row }: any) => {
                    const category = row.original;
                    const isActive = category.estado === "activo" ? true : false;
                    return (
                        <div>
                            {isActive ? (
                                <div className="">
                                    <BtnOpcion
                                        variant="secondary"
                                        label="Acciones"
                                        actions={[
                                            {
                                                label: "Editar",
                                                icon: "cuida:edit-outline",

                                                onClick: () => handleEdit(category),
                                            },
                                            {
                                                label: "Desactivar",
                                                icon: "mdi:delete",
                                                variant: "destructive",
                                                onClick: () => handleDesactivate(category),
                                            },

                                        ]}
                                    />
                                </div>

                            ) : (
                                <Button variant="unstyled" size="sm" onClick={() => handleActive(category)}
                                    className="bg-green-200 rounded-lg shadow-none  text-green-800 hover:text-green-900 cursor-pointer">
                                    Reactivar
                                </Button>
                            )}


                        </div>
                    );
                },
            }

        ]
    )
}