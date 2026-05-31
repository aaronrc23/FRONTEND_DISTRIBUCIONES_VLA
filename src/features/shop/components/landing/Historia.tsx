import { useState, useEffect, useCallback } from "react";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/shared/ui";

/* ─── Datos de la historia ─── */
const story = [
    {
        year: "2024",
        label: "El inicio",
        paragraphs: [
            "Nadie empieza un negocio de cintas masking pensando en cambiar el mundo. Uno empieza porque ve una necesidad, porque intuye que puede hacerlo mejor, o simplemente porque está cansado de esperar que alguien más lo haga.",
            "Para nosotros, todo arrancó con una observación sencilla: los que de verdad trabajan con cinta masking —pintores, contratistas, talleres pequeños— merecían a alguien que entendiera su ritmo, su presupuesto, su urgencia. Y ahí, sin darnos mucha cuenta, ya estábamos dentro.",
        ],
    },
    {
        year: "2025",
        label: "Los primeros rollos",
        paragraphs: [
            "No teníamos un almacén. Teníamos una mesa, un celular con el WhatsApp lleno de contactos y unas cuantas cajas de masking tape. Y aprendimos rápido: en este oficio, no vendes producto, vendes confianza. ¿La cinta va a llegar a tiempo? ¿Se va a despegar limpio? ¿Va a aguantar?",
            "Cada respuesta que dábamos, cada pedido que entregábamos en la hora acordada, era un ladrillo en algo que estábamos construyendo sin saber muy bien a dónde nos llevaba.",
        ],
    },
    {
        year: "Hoy",
        label: "El día a día",
        paragraphs: [
            "Hoy seguimos en esa misma mesa. Con más experiencia, algunos clientes que ya nos buscan por nombre, y la misma sensación de que cada pedido es una prueba. La cinta masking parece un producto simple, pero cuando de ella depende que un trabajo de pintura quede bien o que unas piezas lleguen protegidas, lo simple se vuelve importante.",
            "No tenemos todas las respuestas. Pero tenemos algo mejor: la disposición a aprender en cada entrega, a mejorar en cada llamada, a estar ahí cuando nos necesitan.",
        ],
    },
    {
        year: "2025+",
        label: "Lo que viene",
        paragraphs: [
            "Esto recién empieza. Y esa es la parte más emocionante. Queremos crecer, sí, pero sin perder de vista lo que nos trajo hasta aquí: el trato directo, la cinta correcta para cada trabajo, y la promesa de llegar cuando decimos que vamos a llegar.",
            "Si estás leyendo esto y estás pensando en probar nuestras cintas masking, queremos que sepas algo: detrás de cada rollo hay alguien que realmente se preocupa porque te funcione. Porque tu proyecto importa, y queremos ser parte de que salga bien.",
        ],
    },
];

/* ─── Componente principal ─── */
export default function Historia() {
    const { ref: sectionRef, isVisible: sectionVisible } =
        useScrollReveal<HTMLElement>({ threshold: 0.05 });

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    /* Sincronizar estado con el slide activo */
    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const handleDotClick = useCallback(
        (index: number) => {
            api?.scrollTo(index);
        },
        [api]
    );

    const handleYearSelect = useCallback(
        (year: string) => {
            const index = story.findIndex((c) => c.year === year);
            if (index !== -1) api?.scrollTo(index);
        },
        [api]
    );

    const years = story.map((c) => c.year);
    const currentChapter = story[current];

    return (
        <section
            ref={sectionRef}
            className={` pt-20 md:pt-28 pb-16 md:pb-20 px-6 relative transition-all duration-700 ease-out ${sectionVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
        >
            <div className="max-w-4xl mx-auto relative z-10">
                {/* ─── HEADER ─── */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-[1.1] tracking-tight">
                        Nuestra historia
                    </h2>
                </div>

                {/* ─── SELECTOR DE AÑOS (pills) ─── */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => handleYearSelect(year)}
                            className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 shrink-0 ${currentChapter?.year === year
                                    ? "bg-blue-900 text-white shadow-[0_2px_8px_rgba(30,58,138,0.2)] scale-105"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* ─── CARRUSEL ─── */}
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: false,
                        align: "center",
                        skipSnaps: false,
                    }}
                    className="relative"
                >
                    <CarouselContent>
                        {story.map((chapter) => (
                            <CarouselItem key={chapter.year}>
                                <div className="px-0 md:px-2">
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-10 select-none">
                                        {/* ─── AÑO + ETIQUETA ─── */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-900/5 text-blue-700 text-sm font-bold">
                                                {chapter.year}
                                            </span>
                                            <div>
                                                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                                                    Capítulo {story.indexOf(chapter) + 1}
                                                </span>
                                                <h3 className="text-base font-semibold text-blue-900 leading-snug">
                                                    {chapter.label}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* ─── LÍNEA DECORATIVA ─── */}
                                        <div className="w-10 h-[2px] bg-blue-200 rounded-full mb-6" />

                                        {/* ─── PÁRRAFOS ─── */}
                                        <div className="space-y-4">
                                            {chapter.paragraphs.map((p, i) => (
                                                <p
                                                    key={i}
                                                    className={`text-sm md:text-base leading-relaxed md:leading-[1.8] transition-all duration-500 ${i === 0
                                                            ? "font-normal text-shopforeground"
                                                            : "font-light text-shop-secondary-foreground"
                                                        }`}
                                                >
                                                    {p}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* ─── FLECHAS DE NAVEGACIÓN (solo desktop) ─── */}
                    <CarouselPrevious className="hidden md:flex -left-3 lg:-left-6 h-12 w-12 bg-white border-slate-200 text-slate-400 hover:bg-white hover:text-blue-900 shadow-sm hover:shadow-md transition-all" />
                    <CarouselNext className="hidden md:flex -right-3 lg:-right-6 h-12 w-12 bg-white border-slate-200 text-slate-400 hover:bg-white hover:text-blue-900 shadow-sm hover:shadow-md transition-all" />
                </Carousel>

                {/* ─── INDICADORES (dots) ─── */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {story.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className="group relative"
                            aria-label={`Ir al capítulo ${i + 1}`}
                        >
                            <div
                                className={`rounded-full transition-all duration-500 ease-out ${i === current
                                        ? "bg-blue-900 w-6 h-2"
                                        : "bg-slate-300 hover:bg-slate-400 w-2 h-2 group-hover:scale-125"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
