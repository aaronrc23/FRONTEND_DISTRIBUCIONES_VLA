import { Icon } from '@iconify-icon/react';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: React.ReactNode; // botón opcional
}

export default function EmptyState({
    icon = "mdi:package-variant-remove",
    title,
    description,
    action
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-4">

            {/* Icono */}
            <Icon
                icon={icon}
                className="text-6xl text-gray-300"
            />

            {/* Título */}
            <h3 className="text-xl font-semibold text-gray-700">
                {title}
            </h3>

            {/* Descripción */}
            {description && (
                <p className="text-sm text-gray-400 max-w-md">
                    {description}
                </p>
            )}

            {/* Acción opcional */}
            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
}