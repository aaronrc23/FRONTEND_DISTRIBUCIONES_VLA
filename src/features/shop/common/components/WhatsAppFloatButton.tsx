import { useWhatsappNumber } from "../hooks/useWhatsappNumber";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";

export default function WhatsAppFloatButton() {
    const whatsappNumber = useWhatsappNumber();
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
        >
            {/* Tooltip */}
            <div
                className={`absolute bottom-full right-0 mb-4 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-black/10 whitespace-nowrap transition-all duration-300 ease-out ${showTooltip ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                    }`}
            >
                {/* Flecha del tooltip */}
                <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-white dark:bg-gray-800 rotate-45 shadow-sm" />

                <div className="relative flex items-center gap-2.5">

                    <div className="flex items-center gap-2">
                        <Icon icon="mdi:message-text-outline" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                            Estamos disponibles
                        </span>
                    </div>
                </div>
            </div>

            {/* Ondas de pulso radial */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-green-400/30 animate-[whatsapp-wave_2.5s_ease-out_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-green-400/20 animate-[whatsapp-wave_2.5s_ease-out_infinite_0.8s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-green-400/10 animate-[whatsapp-wave_2.5s_ease-out_infinite_1.6s]" />
            </div>

            {/* Botón circular con gradiente */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="relative flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-green-400 via-green-400 to-green-500 text-white shadow-xl shadow-green-500/40 hover:shadow-2xl hover:shadow-green-500/60 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Enviar mensaje por WhatsApp"
            >
                <Icon icon="mdi:whatsapp" className="text-4xl" />
            </a>
        </div>
    );
}
