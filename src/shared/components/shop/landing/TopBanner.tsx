import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Simulación del store ──────────────────────────────────────────
const useUIStore = () => {
    const [showBanner, setShowBanner] = useState(true);
    return {
        showBanner,
        hideBanner: () => setShowBanner(false),
    };
};

// ── Variantes de animación tipo ruleta ────────────────────────────
const variants = {
    enter: {
        x: "100%",
        opacity: 0,
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: "-100%",
        opacity: 0,
    },
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
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (!showBanner) return;
        const timer = setInterval(() => {
            setDirection(1);
            setIndex((prev) => (prev + 1) % mensajesProp.length);
        }, intervalo);
        return () => clearInterval(timer);
    }, [showBanner, mensajesProp.length, intervalo]);

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    key="banner-wrapper"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full h-auto p-2 relative overflow-hidden bg-linear-to-r from-orange-500 to-orange-500 text-white px-6  flex justify-center items-center shadow-md"
                >
                    {/* Shimmer de fondo */}
                    <motion.div
                        className="absolute inset-0 bg-white/10 w-1/3"
                        initial={{ x: "-100%" }}
                        animate={{ x: "400%" }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 2,
                        }}
                        style={{ skewX: "-20deg" }}
                    />

                    {/* Ruleta de mensajes */}
                    <div className="flex-1 overflow-hidden  flex justify-center items-center h-8.5 sm:h-7 relative">
                        <AnimatePresence mode="popLayout" custom={direction}>
                            <motion.span
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute text-xs sm:text-sm h-auto  font-medium tracking-wide text-white/95 text-center w-full"
                            >
                                {mensajesProp[index]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                  

                    {/* Botón cerrar */}
                    <motion.button
                        onClick={hideBanner}
                        whileHover={{ scale: 1.15, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-4 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold cursor-pointer"
                        aria-label="Cerrar banner"
                    >
                        ✕
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
