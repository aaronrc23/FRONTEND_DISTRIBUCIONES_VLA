import { Icon } from "@iconify-icon/react";
import { Texto } from "../../../../shared/ui";

const features = [
    {
        icon: <Icon icon="heroicons-solid:light-bulb" className="text-orange-50" />,
        bgColor: "bg-orange-500",
        title: "Calidad Garantizada",
        description: "Adhesivos resistentes que no fallan."
    },
    {
        icon: <Icon icon="lucide:tag" className="text-blue-50" />,
        bgColor: "bg-blue-500",
        title: "Precios Directos",
        description: "Sin intermediarios, mejor precio.",
        highlight: true,
    },
    {
        icon: <Icon icon="lucide:box" className="text-teal-50" />,
        bgColor: "bg-teal-500",
        title: "Stock Inmediato",
        description: "Siempre disponible para tu negocio.",
        highlight: false,
    },
    {
        icon: <Icon icon="lucide:headphones" className="text-indigo-50" />,
        bgColor: "bg-indigo-500",
        title: "Asesoría Real",
        description: "Te ayudamos a elegir bien.",
        highlight: false,
    },
];

export default function Beneficios() {
    return (
        <section className=" py-16 px-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col-reverse   lg:flex-row items-center gap-12">

                <div className="flex flex-wrap justify-center gap-6 w-full lg:w-1/2">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`
            w-full sm:w-[45%]
            p-6 rounded-2xl
            flex flex-col items-center text-center
            ${feature.bgColor}
            shadow-md hover:shadow-xl
            transition-all duration-300
            hover:scale-[1.03]
          `}
                        >
                            <div className="text-4xl mb-2">{feature.icon}</div>
                            <strong className="text-white mb-2">{feature.title}</strong>
                            <p className="text-white/80 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 🟦 LADO DERECHO → TEXTO */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <Texto className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
                        Sobre Distribuciones Vla
                    </Texto>

                    <div className="w-12 h-1 bg-cyan-500 mb-6 mx-auto lg:mx-0"></div>

                    <Texto className="text-shop-secondary-foreground mb-4 leading-relaxed">
                        Somos una empresa especializada en la distribución de cintas adhesivas de alta calidad,
                        diseñadas para ofrecer resistencia, durabilidad y un rendimiento confiable en todo tipo
                        de aplicaciones, desde uso doméstico hasta industrial.
                    </Texto>

                    <Texto className="text-shop-secondary-foreground leading-relaxed">
                        Trabajamos con tecnología de adhesivos moderna y un stock siempre disponible,
                        para brindarte soluciones rápidas, precios competitivos y una atención personalizada
                        que se adapta a las necesidades de tu negocio.
                    </Texto>
                </div>

            </div>
        </section>
    );
}





