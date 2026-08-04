import { Badge, Button } from "@/shared/ui";
import { useBannerStore } from "../../common/store/useBannerStore";
import { useModal } from "@/shared/hooks/useModal";
import { showConfirmation } from "@/shared/hooks/useSwalert";
import { useBannerCrudMutation } from "../../common/hooks/useCrudBanners";
import { ExternalLink, Edit, Eye, EyeOff } from "lucide-react";

interface BannerCardGridProps {
    data: any[];
}

export default function BannerCardGrid({ data }: BannerCardGridProps) {
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

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <EyeOff className="w-12 h-12 mb-3" />
                <p className="text-lg font-medium">No hay banners registrados</p>
                <p className="text-sm">Crea un nuevo banner para empezar</p>
            </div>
        );
    }

    // Separar banners activos e inactivos (no mostrar eliminados)
    const activeBanners = data.filter((b: any) => b.is_active && !b.deleted_at);
    const inactiveBanners = data.filter((b: any) => !b.is_active && !b.deleted_at);

    return (
        <div className="space-y-8">
            {/* Banners activos */}
            {activeBanners.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-3">
                        Activos ({activeBanners.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {activeBanners.map((banner: any) => (
                            <BannerCard
                                key={banner.id}
                                banner={banner}
                                onEdit={() => handleEdit(banner)}
                                onToggle={() => handleDesactivate(banner)}
                                isActive
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Banners inactivos */}
            {inactiveBanners.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Inactivos ({inactiveBanners.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {inactiveBanners.map((banner: any) => (
                            <BannerCard
                                key={banner.id}
                                banner={banner}
                                onEdit={() => handleEdit(banner)}
                                onToggle={() => handleActivate(banner)}
                                isActive={false}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function BannerCard({
    banner,
    onEdit,
    onToggle,
    isActive,
}: {
    banner: any;
    onEdit: () => void;
    onToggle: () => void;
    isActive: boolean;
}) {
    return (
        <div
            className={`group relative rounded-xl overflow-hidden border transition-all duration-200 hover:shadow-md ${
                isActive
                    ? "bg-white border-slate-200"
                    : "bg-slate-50 border-slate-200/60 opacity-75"
            }`}
        >
            {/* Preview de la imagen */}
            <div className="relative aspect-[2/1] bg-slate-100 overflow-hidden">
                {banner.url_imagen ? (
                    <img
                        src={banner.url_imagen}
                        alt="Banner"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <EyeOff className="w-8 h-8 text-slate-300" />
                    </div>
                )}

                {/* Overlay con orden y estado */}
                <div className="absolute top-2 left-2 flex gap-2">
                    <span className="text-xs font-bold bg-black/50 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                        #{banner.orden ?? "—"}
                    </span>
                    <Badge
                        color={isActive ? "success" : "warning"}
                        visual="flat"
                        size="sm"
                    >
                        {isActive ? "Activo" : "Inactivo"}
                    </Badge>
                </div>

                {/* Eliminado soft */}
                {banner.deleted_at && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge color="destructive" visual="flat" size="md">
                            Eliminado
                        </Badge>
                    </div>
                )}
            </div>

            {/* Información inferior */}
            <div className="p-3 space-y-2">
                {/* Enlace */}
                {banner.enlace ? (
                    <a
                        href={banner.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 truncate max-w-full"
                    >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{banner.enlace}</span>
                    </a>
                ) : (
                    <span className="text-xs text-slate-400 italic">Sin enlace</span>
                )}

                {/* Acciones */}
                <div className="flex items-center gap-2 pt-1">
                    <Button
                        variant="unstyled"
                        size="sm"
                        onClick={onEdit}
                        className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-700 
                            bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                        <Edit className="w-3.5 h-3.5" />
                        Editar
                    </Button>

                    <Button
                        variant="unstyled"
                        size="sm"
                        onClick={onToggle}
                        className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                            isActive
                                ? "text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100"
                                : "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                        }`}
                    >
                        {isActive ? (
                            <>
                                <EyeOff className="w-3.5 h-3.5" />
                                Desactivar
                            </>
                        ) : (
                            <>
                                <Eye className="w-3.5 h-3.5" />
                                Reactivar
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
