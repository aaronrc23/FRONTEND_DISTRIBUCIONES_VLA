
import { Icon } from '@iconify-icon/react';
import { Texto } from '../../../../shared/ui';
export default function HeaderLogin() {
    return (
        <div className="text-center flex justify-center flex-col items-center mb-6 w-full space-y-2 text-white">

            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <Icon icon="mdi:shield-account" className="text-emerald-500 text-3xl" />
            </div>

            <Texto variant="subtitle" className="dark:text-white font-bold text-2xl md:text-[28px]">Acceso de Empleados</Texto>
            <Texto variant="secondary" className="text-secondary-foreground md:text-sm font-medium dark:text-white">Solo personal autorizado</Texto>
        </div>

    )
}
