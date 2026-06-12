import { Card, Texto } from "@/shared/ui";
import { FrTabs } from "@/shared/components/atoms/FR/FrTabs";
import FrmInfoPersonal from "../components/forms/FrmInfoPersonal";
import FrmCambiarPassword from "../components/forms/FrmCambiarPassword";
import { usePerfil } from "../../common/hooks/useCrudPerfil";
import ResumenPerfil from "../components/ResumenPerfil";
import InfoEmpPerfil from "../components/InfoEmpPerfil";

export default function LytProfile() {
    const { data: profile, isLoading, refetch } = usePerfil();


    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Texto variant="muted">Cargando perfil...</Texto>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Texto variant="muted">No se pudo cargar el perfil.</Texto>
            </div>
        );
    }


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
                    <InfoEmpPerfil profile={profile} refetch={refetch} />

                    <Card variant="elevated" className="p-6">
                        <FrTabs tabs={tabs} variant="pill" />
                    </Card>

                </div>
                <ResumenPerfil profile={profile} />
            </div>
        </div>
    );
}
