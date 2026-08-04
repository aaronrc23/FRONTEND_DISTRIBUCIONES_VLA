import { type ReactNode } from "react";
import { Card } from "@/shared/ui";

interface CardPatternProps {
    /** Contenido que se muestra sobre el patrón animado */
    children: ReactNode;
    /** Clases adicionales para el Card */
    className?: string;
    /** Altura del patrón en mobile y desktop (default: h-28 sm:h-36) */
    height?: string;
    /** Margen negativo para superponer contenido (default: -mt-16 sm:-mt-20) */
    offset?: string;
}

/**
 * Card con fondo de patrón animado (puntos geométricos + orbes flotantes).
 * El contenido se superpone al patrón mediante margen negativo.
 * Usa las clases `.pattern-text` y `.pattern-text-muted` para texto sobre el patrón.
 */
export default function CardPattern({
    children,
    className = "",
    height = "h-28 sm:h-36",
    offset = "-mt-16 sm:-mt-20",
}: CardPatternProps) {
    return (
        <Card variant="elevated" className={`overflow-hidden ${className}`}>
            <div className={`pattern-perfil-bg ${height} rounded-t-xl`} />
            <div className="px-6 pb-6">
                <div className={`${offset} relative`}>
                    {children}
                </div>
            </div>
        </Card>
    );
}
