import { Icon } from "@iconify-icon/react";
import { Texto } from "../../../../shared/ui";
import Image from "@/shared/ui/image";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";

const features = [
    {
        icon: <Icon icon="heroicons-solid:light-bulb" className="text-blue-800" />,
        bgColor: "bg-orange-500",
        title: "Calidad Garantizada",
        description: "Adhesivos resistentes que no fallan."
    },
    {
        icon: <Icon icon="lucide:tag" className="text-blue-800" />,
        bgColor: "bg-blue-500",
        title: "Precios Directos",
        description: "Sin intermediarios, mejor precio.",
        highlight: true,
    },

    {
        icon: <Icon icon="lucide:headphones" className="text-blue-800" />,
        bgColor: "bg-indigo-500",
        title: "Asesoría Real",
        description: "Te ayudamos a elegir bien.",
        highlight: false,
    },
];

export default function Beneficios() {
    const { ref, isVisible } = useScrollReveal<HTMLElement>();

    return (
        <section id="beneficios" ref={ref} className={`py-24 px-6 flex gap-1 justify-center  transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
            <div className=" w-full px-2 sm:px-10 lg:px-0 flex flex-col lg:flex-row gap-12 items-center justify-center ">
                {/* 🟦 LADO DERECHO → TEXTO */}
                <div className="flex flex-col items-center lg:w-1/2 2xl:w-1/3">
                    <div className="w-full  text-center lg:text-left">
                        <Texto className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
                            Sobre Distribuciones Vla
                        </Texto>

                        <div className="w-12 h-1 bg-cyan-500 mb-6 mx-auto lg:mx-0"></div>

                        <Texto className="text-shop-secondary-foreground mb-4 leading-relaxed ">
                            Somos una empresa especializada en la distribución de cintas adhesivas de alta calidad,
                            diseñadas para ofrecer resistencia, durabilidad y un rendimiento confiable en todo tipo
                            de aplicaciones, desde uso doméstico hasta industrial.
                        </Texto>

                        {/* <Texto className="text-shop-secondary-foreground leading-relaxed">
                        Trabajamos con tecnología de adhesivos moderna y un stock siempre disponible,
                        para brindarte soluciones rápidas, precios competitivos y una atención personalizada
                        que se adapta a las necesidades de tu negocio.
                    </Texto> */}
                    </div>

                    <div className="flex flex-wrap justify-center  w-full ">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={` w-full py-5 rounded-2xl flex   items-center gap-4 `}
                            // ${feature.bgColor}
                            >
                                <div className="text-5xl  ">{feature.icon}</div>
                                <div className="flex flex-col ">
                                    <strong className="text-blue-900 mb-2">{feature.title}</strong>
                                    <Texto className="text-shop-secondary-foreground leading-relaxed">
                                        {feature.description}
                                    </Texto>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className={`w-full lg:w-1/3 transition-all duration-700 delay-150 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                    <Image
                        src="images/landing/sobre-nosotros-800.webp"
                        srcSet="/images/landing/sobre-nosotros-800.webp 800w, /images/landing/sobre-nosotros-800.webp 1600w" // Soporte Retina
                        sizes="(max-width: 768px) 100vw, 800px"   // En móvil ocupa todo el ancho, en desktop max 800px
                        alt="Almacén de Distribuciones VLA con stock de cintas adhesivas"
                        width={800}
                        height={463}
                    />
                </div>
            </div>
        </section>
    );
}





