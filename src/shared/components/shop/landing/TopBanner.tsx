import type React from "react";
import { useState, useEffect, useRef } from "react";

// ── Simulación del store ──────────────────────────────────────────
const useUIStore = () => {
    const [showBanner, setShowBanner] = useState(true);
    return {
        showBanner,
        hideBanner: () => setShowBanner(false),
    };
};

// ── Mensajes del banner ───────────────────────────────────────────
const mensajes: React.ReactNode[] = [
    <>🚀 <strong>Envío gratis</strong> en compras mayores a S/. 99</>,
    <>🎉 Usa el código <strong className="bg-white/20 px-1.5 py-0.5 rounded">SAVE20</strong> y obtén 20% de descuento</>,
    <>⏰ <strong>Oferta del día:</strong> Solo quedan pocas unidades — ¡Aprovecha ahora!</>,
    <>🌟 Nuevos productos cada semana — <strong>¡Explora el catálogo!</strong></>,
];

// ── Props ─────────────────────────────────────────────────────────
interface Props {
    mensajes?: React.ReactNode[];
    intervalo?: number; // ms entre cada mensaje
}

// ── Componente ────────────────────────────────────────────────────
export default function TopBanner({
    mensajes: mensajesProp = mensajes,
    intervalo = 3500,
}: Props) {
    const { showBanner, hideBanner } = useUIStore();
    const [index, setIndex] = useState(0);
    const [bannerMounted, setBannerMounted] = useState(true);
    const [bannerVisible, setBannerVisible] = useState(true);
    const [msgFade, setMsgFade] = useState(true);
    const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Animación de salida del banner completo
    useEffect(() => {
        if (showBanner) {
            setBannerMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setBannerVisible(true);
                });
            });
        } else {
            setBannerVisible(false);
            bannerTimerRef.current = setTimeout(() => {
                setBannerMounted(false);
            }, 400);
        }
        return () => {
            if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
        };
    }, [showBanner]);

    // Carrusel de mensajes con crossfade
    useEffect(() => {
        if (!showBanner) return;
        const timer = setInterval(() => {
            setMsgFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % mensajesProp.length);
                requestAnimationFrame(() => {
                    setMsgFade(true);
                });
            }, 300);
        }, intervalo);
        return () => clearInterval(timer);
    }, [showBanner, mensajesProp.length, intervalo]);

    if (!bannerMounted) return null;

    return (
        <div
            className={`
                w-full h-auto p-2 relative overflow-hidden
                bg-linear-to-r from-orange-500 to-orange-500 text-white px-6
                flex justify-center items-center shadow-md
                transition-all duration-[400ms] ease-out will-change-transform will-change-opacity
                ${bannerVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
            `}
        >
            {/* Shimmer de fondo */}
            <div
                className="absolute inset-0 bg-white/10 w-1/3 animate-[shimmer-slide_3s_ease-in-out_infinite]"
                style={{ transform: "skewX(-20deg)" }}
            />

            {/* Ruleta de mensajes */}
            <div className="flex-1 overflow-hidden flex justify-center items-center h-8.5 sm:h-7 relative">
                <span
                    className={`
                        absolute text-xs sm:text-sm h-auto font-medium tracking-wide
                        text-white/95 text-center w-full
                        transition-all duration-[300ms] ease-out will-change-transform will-change-opacity
                        ${msgFade ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
                    `}
                >
                    {mensajesProp[index]}
                </span>
            </div>

            {/* Botón cerrar */}
            <button
                onClick={hideBanner}
                className="
                    absolute right-4 w-6 h-6 flex items-center justify-center
                    rounded-full bg-white/20 hover:bg-white/30
                    text-white text-xs font-bold cursor-pointer
                    transition-all duration-200 ease-out
                    hover:scale-110 hover:rotate-90 active:scale-90
                "
                aria-label="Cerrar banner"
            >
                ✕
            </button>
        </div>
    );
}
