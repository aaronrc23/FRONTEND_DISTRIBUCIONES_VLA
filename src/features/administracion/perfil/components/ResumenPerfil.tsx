import { Badge, Button, Card, Texto } from '@/shared/ui'
import { Icon } from '@iconify-icon/react'
import { AccionesEmpl } from '../../common/hooks/useCrudEmpleados';

export default function ResumenPerfil({ profile }: { profile: any }) {
    const { handleLogoutGlobal } = AccionesEmpl();
    return (
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
                            Administrador
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
                className="w-full border-destructive/30 bg-destructive/70 text-white hover:text-white dark:bg-error-20 dark:text-texterror-20 hover:bg-destructive/90 "
                size="lg"
                onClick={handleLogoutGlobal}
            >
                <Icon icon="solar:logout-2-linear" className="text-lg" />
                Cerrar sesión en todos los dispositivos
            </Button>
        </div>
    )
}
