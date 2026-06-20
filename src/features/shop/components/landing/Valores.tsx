import { Icon } from "@iconify-icon/react";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";

/* ─── Datos de valores ─── */
const valores = [
    {
        icon: "mdi:handshake",
        title: "Confianza",
        description:
            "Creemos que el respeto y la honestidad construyen relaciones que trascienden una simple transacción.",
    },
    {
        icon: "mdi:shield-check",
        title: "Calidad",
        description:
            "Cada producto que ofrecemos pasa por nuestro propio filtro de exigencia. No vendemos nada que no usaríamos.",
    },
    {
        icon: "mdi:target",
        title: "Compromiso",
        description:
            "Cumplimos lo que prometemos. Si decimos que llegamos, llegamos. Si decimos que funciona, funciona.",
    },
    {
        icon: "mdi:account-group",
        title: "Cercanía",
        description:
            "Nada de grandes corporaciones. Somos personas atendiendo personas, con trato directo y sin rodeos.",
    },
    {
        icon: "mdi:clock-check",
        title: "Responsabilidad",
        description:
            "Con cada hora, cada pedido y cada detalle. Sabemos que tu trabajo depende de que el nuestro esté bien hecho.",
    },
    {
        icon: "mdi:star",
        title: "Pasión",
        description:
            "Amamos lo que hacemos. Y eso se nota en la forma en que cuidamos cada rollo, cada cliente y cada oportunidad de mejorar.",
    },
];

export default function Valores() {
    const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

    return (
        <section
            ref={ref}
            className={`pt-16 pb-20 md:pb-28 px-6 relative transition-all duration-700 ease-out ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
            }`}
        >
            <div className="max-w-5xl mx-auto relative z-10">
                {/* ─── HEADER ─── */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-section-title leading-[1.1] tracking-tight">
                        Nuestros valores
                    </h2>
                    <p className="mt-4 text-sm md:text-base font-medium text-section-title-muted max-w-lg mx-auto">
                        Lo que nos define como empresa y como personas
                    </p>
                </div>

                {/* ─── GRID DE VALORES ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {valores.map((v) => (
                        <div
                            key={v.title}
                            className="group bg-card flex flex-col justify-center items-center  rounded-2xl border border-shopborder shadow-sm p-6 md:p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {/* ─── ICONO ─── */}
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 group-hover:bg-section-primary/10 transition-colors duration-300">
                                <Icon icon={v.icon} className="text-shopforeground text-4xl" />
                            </div>

                            {/* ─── TÍTULO (bold) ─── */}
                            <h3 className="text-base md:text-lg font-bold text-shopforeground mb-2 leading-snug">
                                {v.title}
                            </h3>

                            {/* ─── DESCRIPCIÓN (medium) ─── */}
                            <p className="text-sm leading-relaxed font-normal text-shop-secondary-foreground">
                                {v.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
