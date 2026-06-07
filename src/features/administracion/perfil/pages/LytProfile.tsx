import { useState, useRef } from "react";
import { Icon } from "@iconify-icon/react";
import { Card, Texto, Button, Badge } from "@/shared/ui";
import { FrTabs } from "@/shared/components/atoms/FR/FrTabs";
import { usePerfilStore } from "../store/PerfilStore";
import FrmInfoPersonal from "../components/forms/FrmInfoPersonal";
import FrmCambiarPassword from "../components/forms/FrmCambiarPassword";
import { showSuccess, showConfirmation } from "@/shared/hooks/useSwalert";

export default function LytProfile() {
    const { profile, setProfile } = usePerfilStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeTabPreview, setActiveTabPreview] = useState<"sidebar" | "topbar">("sidebar");

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            setProfile({ avatar: dataUrl });
        };
        reader.readAsDataURL(file);

        // Limpiar el input para permitir re-seleccionar el mismo archivo
        e.target.value = "";
        showSuccess("Foto actualizada", "Tu foto de perfil se ha actualizado.");
    };

    const handleCerrarSesionTodos = async () => {
        const confirm = await showConfirmation(
            "¿Cerrar sesión en todos los dispositivos?",
            "Esto cerrará tu sesión en todos los navegadores y dispositivos donde hayas iniciado sesión."
        );
        if (!confirm) return;

        // TODO: conectar con API cuando esté disponible
        showSuccess("Sesiones cerradas", "Se ha cerrado sesión en todos los dispositivos.");
    };

    const fullName = `${profile.name} ${profile.apellidos}`;

    const tabs = [
        {
            id: "info",
            label: "Información Personal",
            content: (
                <div className="pt-2">
                    <FrmInfoPersonal />
                </div>
            ),
        },
        {
            id: "password",
            label: "Cambiar Contraseña",
            content: (
                <div className="pt-2">
                    <FrmCambiarPassword />
                </div>
            ),
        },
    ];

    return (
        <div className="h-full w-full space-y-6 px-2 md:px-4 py-0 sm:py-2">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <Texto className="font-bold text-3xl">Mi Perfil</Texto>
                    <Texto variant="muted" className="mt-1">
                        Gestiona tu información personal y seguridad
                    </Texto>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                {/* ─── COLUMNA IZQUIERDA: FORMULARIOS ─── */}
                <div className="space-y-6">
                    {/* Avatar + Info básica */}
                    <Card variant="elevated" className="overflow-hidden">
                        <div className="bg-linear-to-r from-blue-600 to-blue-800 h-24 sm:h-28 relative" />
                        <div className="px-6 pb-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 sm:-mt-14 relative z-10">
                                {/* Avatar */}
                                <div className="relative group shrink-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-gray-900 overflow-hidden shadow-xl bg-white">
                                        <img
                                            src={profile.avatar}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
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
                                    <Texto className="text-xl font-bold truncate">
                                        {fullName}
                                    </Texto>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                            color="primary"
                                            visual="flat"
                                            leftIcon="mdi:shield-account"
                                        >
                                            {profile.rol}
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

                    {/* Tabs: Info Personal / Cambiar Contraseña */}
                    <Card variant="elevated" className="p-6">
                        <FrTabs tabs={tabs} variant="pill" />
                    </Card>
                </div>

                {/* ─── COLUMNA DERECHA: VISTA PREVIA + ACCIONES ─── */}
                <div className="space-y-6 pb-4">
                    

                    {/* Resumen del perfil */}
                    <Card variant="elevated" className="p-6">
                        <Texto weight="bold" className="text-base mb-4">
                            Resumen del perfil
                        </Texto>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-border/40">
                                <span className="text-sm text-muted-foreground">Email</span>
                                <span className="text-sm font-medium text-foreground">{profile.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-border/40">
                                <span className="text-sm text-muted-foreground">Teléfono</span>
                                <span className="text-sm font-medium text-foreground">{profile.phone || "—"}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-border/40">
                                <span className="text-sm text-muted-foreground">Rol</span>
                                <Badge color="primary" visual="flat" size="sm">
                                    {profile.rol}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-muted-foreground">Sesiones activas</span>
                                <Badge color="success" visual="flat" size="sm" leftIcon="mdi:check">
                                    1 activa
                                </Badge>
                            </div>
                        </div>
                    </Card>

                    {/* Cerrar sesión en todos los dispositivos */}
                    <Button
                        variant="outline"
                        className="w-full border-destructive/30 bg-destructive/70 text-white dark:bg-error-20 dark:text-texterror-20 hover:bg-destructive/90 "
                        size="lg"
                        onClick={handleCerrarSesionTodos}
                    >
                        <Icon icon="solar:logout-2-linear" className="text-lg" />
                        Cerrar sesión en todos los dispositivos
                    </Button>
                </div>
            </div>
        </div>
    );
}
