import { Icon } from "@iconify-icon/react";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";

const reasons = [
    {
        icon: "mdi:shield-check",
        title: "Calidad Superior",
        description: "Trabajamos con las mejores marcas como Pegafan. Cada rollo pasa por estrictos controles de calidad.",
    },
    {
        icon: "mdi:truck-delivery",
        title: "Entrega Rápida",
        description: "Despachamos tu pedido en 24 horas. Llegamos a todo Lima y provincias.",
    },
    {
        icon: "mdi:handshake",
        title: "Precios Directos",
        description: "Al ser distribuidores directos, te ofrecemos precios sin intermediarios.",
    },
    {
        icon: "mdi:headset",
        title: "Asesoría Personalizada",
        description: "Te ayudamos a elegir el producto ideal para tu proyecto. Sin compromiso.",
    },
];

export default function WhyUsSection() {
    const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

    return (
        <section
            ref={ref}
            className={`py-20 px-6 bg-shopabout-bg text-white transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                  
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                        La mejor opción para tu negocio
                    </h2>
                    <p className="text-blue-200/70 max-w-lg mx-auto">
                        Más de 5 años distribuyendo cintas adhesivas en Lima Metropolitana
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((reason) => (
                        <div
                            key={reason.title}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                                hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4
                                group-hover:bg-amber-500/30 transition-colors">
                                <Icon icon={reason.icon} className="text-2xl text-amber-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                            <p className="text-sm text-blue-200/70 leading-relaxed">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
