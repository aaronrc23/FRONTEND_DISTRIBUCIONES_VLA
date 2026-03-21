
import { useModal } from '../../../../shared/hooks/useModal';
import { useEmpStore } from '../../common/store/Empstore';
import { BtnOpcion } from '../../../../shared/components/atoms/FR/BtnOpcion';
import { AccionesEmpl } from '../../common/hooks/useCrudEmpleados';

export default function ColumnsEmpleado() {
    const modalEdit = useModal("drawer-empedit");
    const modalPermisos = useModal("dr-permisos");
    const { setData } = useEmpStore();
    const { handleDeleteEmp } = AccionesEmpl();
    const handleEdit = (data: any) => {
        setData(data);
        modalEdit.open("drawer-empedit");
    };

    const handleDelete = (data: any) => {
        setData(data);
        handleDeleteEmp(data);
    };

    const handlePermisos = (data: any) => {
        setData(data);
        modalPermisos.open("dr-permisos");
    };
    return [
        {
            accessorKey: "user.name",
            header: "Nombre",
        },
        {
            accessorKey: "user.email",
            header: "Email",
        },
        {
            accessorKey: "dni",
            header: "DNI",
        },

        {
            accessorKey: "phone",
            header: "Telefono",
        },
        {
            accessorKey: "opciones",
            header: "Acciones",
            cell: ({ row }: { row: any }) => (
                <div className="flex items-center gap-2">

                    <BtnOpcion
                        variant="secondary"
                        icon="rivet-icons:filter"

                        actions={[
                            {
                                label: "Editar",
                                icon: "lucide:edit",
                                onClick: () => handleEdit(row.original),
                            },
                            {
                                label: "Asignar Permisos",
                                icon: "uil:lock",
                                onClick: () => handlePermisos(row.original),
                            },
                            {
                                label: "Eliminar",
                                icon: "mage:trash",
                                variant: "destructive",
                                onClick: () => handleDelete(row.original.id),
                            },

                        ]}
                    />
                    {/* <BtnOpcion
                        label="Acciones"
                        icon="iwwa:option"
                        options={[
                            {
                                label: "Editar",
                                icon: "uil:edit",
                                onClick: () => handleEdit(row.original),
                                clsicon: "text-blue-500",


                            },
                            {
                                label: "Eliminar",
                                icon: "mage:trash",
                                onClick: () => handleDelete(row.original),
                                clsicon: "text-destructive",

                            },
                            {
                                label: "Asignar Permisos",
                                icon: "uil:lock",
                                onClick: () => handlePermisos(row.original),


                            }

                        ]}
                    /> */}

                </div>
            ),
        },
    ];
}
