import { BtnOpcion } from "@/shared/components/atoms/FR/BtnOpcion";
import { Badge, Button } from "@/shared/ui";
import { useBannerStore } from "../store/useBannerStore";
import { useModal } from "@/shared/hooks/useModal";
import { showConfirmation } from "@/shared/hooks/useSwalert";
import { useBannerCrudMutation } from "../hooks/useCrudBanners";

export default function ColumnsBanners() {
    const { setInfo } = useBannerStore();
    const { ActivarBannerMut, DesactivarBannerMut } = useBannerCrudMutation();

    const modalEdit = useModal("md-banners-edit");

    const handleEdit = (banner: any) => {
        setInfo(banner);
        modalEdit.open();
    };

    const handleDesactivate = async (banner: any) => {
        const isconfirm = await showConfirmation(
            "Desactivar banner",
            "¿Estás seguro de desactivar este banner?"
        );
        if (!isconfirm) return;
        DesactivarBannerMut.mutate(banner.id);
    };

    const handleActivate = async (banner: any) => {
        const isconfirm = await showConfirmation(
            "Activar banner",
            "¿Estás seguro de activar este banner?"
        );
        if (!isconfirm) return;
        ActivarBannerMut.mutate(banner.id);
    };

    return [
        {
            accessorKey: "",
            header: "#",
            cell: ({ row }: any) => row.index + 1,
        },
        {
            accessorKey: "url_imagen",
            header: "Imagen",
            cell: ({ row }: any) => (
                <div className="flex items-center">
                    {row.original.url_imagen ? (
                        <img
                            src={row.original.url_imagen}
                            alt="Banner"
                            className="w-24 h-14 object-cover rounded-lg border border-border"
                        />
                    ) : (
                        <span className="text-xs text-muted-foreground">Sin imagen</span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "titulo",
            header: "Título",
            cell: ({ row }: any) => (
                <span className="font-medium truncate max-w-[200px] block">
                    {row.original.titulo || "—"}
                </span>
            ),
        },
        {
            accessorKey: "subtitulo",
            header: "Subtítulo",
            cell: ({ row }: any) => (
                <span className="text-sm text-muted-foreground truncate max-w-[250px] block">
                    {row.original.subtitulo || "—"}
                </span>
            ),
        },
        {
            accessorKey: "orden",
            header: "Orden",
        },
        {
            accessorKey: "is_active",
            header: "Estado",
            cell: ({ row }: any) => {
                const isActive = row.original.is_active;
                const isDeleted = !!row.original.deleted_at;
                return (
                    <Badge
                        color={isDeleted ? "destructive" : isActive ? "success" : "warning"}
                        visual="flat"
                        size="md"
                    >
                        {isDeleted ? "Eliminado" : isActive ? "Activo" : "Inactivo"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "actions",
            header: "Acciones",
            cell: ({ row }: any) => {
                const banner = row.original;
                const isDeleted = !!banner.deleted_at;
                const isActive = banner.is_active;

                if (isDeleted) {
                    return <span className="text-xs text-muted-foreground">—</span>;
                }

                return (
                    <div>
                        {isActive ? (
                            <BtnOpcion
                                variant="secondary"
                                label="Acciones"
                                actions={[
                                    {
                                        label: "Editar",
                                        icon: "cuida:edit-outline",
                                        onClick: () => handleEdit(banner),
                                    },
                                    {
                                        label: "Desactivar",
                                        icon: "mdi:delete",
                                        variant: "destructive",
                                        onClick: () => handleDesactivate(banner),
                                    },
                                ]}
                            />
                        ) : (
                            <Button
                                variant="unstyled"
                                size="sm"
                                onClick={() => handleActivate(banner)}
                                className="bg-green-200 rounded-lg shadow-none text-green-800 hover:text-green-900 cursor-pointer"
                            >
                                Reactivar
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];
}
