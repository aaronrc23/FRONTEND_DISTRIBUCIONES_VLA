import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
    /** Umbral de visibilidad (0-1). Default 0.15 */
    threshold?: number;
    /** Margen del root observer. Default "0px" */
    rootMargin?: string;
    /** Si se anima solo la primera vez (unobserve). Default true */
    once?: boolean;
    /** Delay adicional en ms antes de añadir la clase visible */
    delay?: number;
}

/**
 * Hook ultra-liviano para animaciones al scrollear.
 * Usa IntersectionObserver nativo — sin librerías, sin event listeners,
 * solo propiedades GPU (opacity + transform) para máximo rendimiento.
 *
 * Uso:
 * ```tsx
 * const { ref, isVisible } = useScrollReveal();
 * <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    options: ScrollRevealOptions = {}
) {
    const { threshold = 0.15, rootMargin = "0px", once = true, delay = 0 } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respeta preferencia de accesibilidad: animaciones reducidas
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (delay > 0) {
                        setTimeout(() => setIsVisible(true), delay);
                    } else {
                        setIsVisible(true);
                    }
                    if (once) {
                        observer.unobserve(el);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once, delay]);

    return { ref, isVisible };
}
