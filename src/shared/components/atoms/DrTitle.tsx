

import { Icon } from '@iconify-icon/react'
import { Texto } from '../../ui'
export default function DrTitle({
    title,
    icon,
    icon2,
    subtitle,
}: {
    title: string
    icon?: string
    icon2?: React.ReactNode
    subtitle?: string
}) {
    return (
        <div className="flex flex-col gap-1 p-5 bg-transparent ">
            <div className="flex items-center gap-2">
                {icon && <Icon icon={icon || ""} className="text-2xl" />}
                {icon2}
                <Texto variant="message" className="font-bold">
                    {title}
                </Texto>

            </div>
            <p className="text-sm text-muted-foreground">
                {subtitle}
            </p>
        </div>
    )
}

