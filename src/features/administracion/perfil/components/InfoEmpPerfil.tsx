import { Avatar, AvatarFallback, AvatarImage, Badge, Card, Texto } from "@/shared/ui";
import { Icon } from "@iconify-icon/react";
import { useCallback, useRef } from "react";
import { updateAvatar } from "../services/PerfilService";
import { showError, showSuccess } from "@/shared/hooks/useSwalert";


export default function InfoEmpPerfil({ profile, refetch }: { profile: any; refetch: () => void }) {

    const fullName = `${profile.name} ${profile.apellidos}`.trim() || "Usuario";
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await updateAvatar(file);
            refetch();
            showSuccess("Foto actualizada", "Tu foto de perfil se ha actualizado.");
        } catch (error: any) {
            const message = error?.response?.data?.message || "No se pudo actualizar la foto.";
            showError("Error", message);
        }

        e.target.value = "";
    }, [refetch]);

    return (
        <Card variant="elevated" className="overflow-hidden">
            <div className="pattern-perfil-bg h-24 sm:h-28 rounded-t-xl" />
            <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 sm:-mt-14 relative z-10">
                    {/* Avatar */}
                    <div className="relative group shrink-0">
                        <Avatar
                            size="xl"
                            className="ring-4 ring-white dark:ring-gray-900 shadow-xl rounded-2xl"
                        >
                            <AvatarImage
                                src={profile.avatar || undefined}
                                alt="Avatar"
                                className="rounded-2xl"
                            />
                            <AvatarFallback
                                size="xl"
                                className="rounded-2xl bg-blue-100 text-blue-600 font-bold"
                            >
                                {profile.name?.charAt(0)?.toUpperCase() || "?"}
                            </AvatarFallback>
                        </Avatar>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                        >
                            <Icon icon="mdi:camera" className="text-sm" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    {/* Nombre + Rol */}
                    <div className="flex-1 min-w-0 pt-2 sm:pt-0">
                        <Texto className="text-xl font-bold truncate sm:text-indigo-100">
                            {fullName}
                        </Texto>
                        <div className="flex items-center gap-2 mt-3">
                            <Badge
                                color="primary"
                                visual="flat"
                                leftIcon="mdi:shield-account"
                            >
                                Administrador
                            </Badge>
                            <Badge
                                color="success"
                                visual="flat"
                                leftIcon="mdi:check-circle"
                            >
                                Activo
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
