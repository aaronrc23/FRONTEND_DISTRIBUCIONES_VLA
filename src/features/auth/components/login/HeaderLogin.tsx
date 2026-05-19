
import { Texto } from '../../../../shared/ui'

export default function HeaderLogin() {
    return (
        <div className="mb-8 flex w-full flex-col lg:items-start text-center">
            <Texto className="text-3xl font-extrabold  text-foreground">
                Bienvenido de nuevo
            </Texto>
            <Texto variant="secondary" className="mt-2 text-base leading-relaxed text-slate-500">
                Ingresa tus credenciales para continuar
            </Texto>

        </div>
    )
}