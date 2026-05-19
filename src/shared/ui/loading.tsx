import { Icon } from '@iconify-icon/react'
import { Texto } from './texto'

export default function Loading({ mensaje = "Cargando...", className }: { mensaje?: string, className?: string }) {
    return (
        <div className={(`flex flex-row gap-2 items-center w-full  justify-center ${className}`)}>
            <Icon icon="fontisto:spinner-refresh" className="animate-spin text-4xl text-shoprimary " />
            <Texto>{mensaje ?? "Cargando..."}</Texto>
        </div>
    )
}
