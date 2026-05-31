import { useScrollReveal } from "../../../../shared/hooks/useScrollReveal";

export default function AboutUs() {
    const { ref, isVisible } = useScrollReveal<HTMLElement>();

    return (
        <section ref={ref} className={`bg-blue-900 text-white py-28 px-6  md:px-14 relative overflow-hidden transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
            {/* Línea minimalista de fondo arquitectónica */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10"></div>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/10"></div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* MISIÓN & VISIÓN: Tipografía Asimétrica y Limpia */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Misión */}
                    <div className="lg:col-span-6 space-y-6 relative group">
                        {/* Número gigante tipográfico de fondo */}
                        <div className="absolute -left-4 -top-16 text-8xl md:text-[10rem] font-extralight text-white opacity-5 font-mono pointer-events-none select-none">
                            01
                        </div>
                        <div className="space-y-2 relative z-10">
                            
                            <h3 className="text-3xl md:text-4xl font-extralight tracking-tight">
                                Nuestra <span className="font-bold pt-1 text-5xl text-white block">Misión</span>
                            </h3>
                        </div>
                        <p className="text-blue-100/85 font-light leading-relaxed text-base md:text-lg pt-4 relative z-10">
                            Facilitar el trabajo de nuestros clientes ofreciendo cintas adhesivas de calidad, atención rápida y soluciones prácticas para cada necesidad de embalaje, sellado y protección.
                        </p>
                    </div>

                    {/* Visión */}
                    <div className="lg:col-span-6 space-y-6 relative lg:border-l lg:border-white/10 lg:pl-16 group">
                        {/* Número gigante tipográfico de fondo */}
                        <div className="absolute -left-4 lg:left-12 -top-16 text-8xl md:text-[10rem] font-extralight text-white opacity-5 font-mono pointer-events-none select-none">
                            02
                        </div>
                        <div className="space-y-2 relative z-10">
                            
                            <h3 className="text-3xl md:text-4xl font-extralight tracking-tight">
                                Nuestra <span className="font-bold pt-1 text-5xl text-white block">Visión</span>
                            </h3>
                        </div>
                        <p className="text-blue-100/85 font-light leading-relaxed text-base md:text-lg pt-4 relative z-10">
                            Ser una empresa reconocida por la confianza, responsabilidad y cercanía con nuestros clientes, creciendo paso a paso junto a los negocios que confían en nosotros.
                        </p>
                    </div>

                </div>
        
            </div>

        </section>
    )
}
