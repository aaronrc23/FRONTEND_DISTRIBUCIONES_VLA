import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useCategoryShop } from "../../common/hooks/useConsultas";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import Image from "@/shared/ui/image";
import Loading from "@/shared/ui/loading";
import { Texto } from "@/shared/ui";
import ReusableCarousel from "@/shared/components/molecules/ReusableCarousel";
import type { CarouselSlide } from "@/shared/components/molecules/ReusableCarousel";

interface Categoria {
    id: number;
    categoria: string;
    slug?: string | null;
    img: string | null;
    icon: string | null;
    childrenCount: number;
}

const ICONOS_CATEGORIA = [
    "material-symbols:category-outline",
    "mdi:package-variant-closed",
    "mdi:shopping-outline",
    "mdi:tag-outline",
    "mdi:star-outline",
    "mdi:gift-outline",
    "mdi:food-apple-outline",
    "mdi:tshirt-crew-outline",
    "mdi:laptop",
    "mdi:home-outline",
    "mdi:tools",
    "mdi:book-open-variant",
];

export default function CategoriasSection() {
    const navigate = useNavigate();
    const { data, isLoading } = useCategoryShop();
    const { ref: sectionRef } = useScrollReveal<HTMLElement>();
    const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

    if (isLoading) {
        return (
            <section className="py-20 px-6 text-center">
                <Loading mensaje="Cargando categorías..." />
            </section>
        );
    }

    const categorias: Categoria[] = data ?? [];

    if (categorias.length === 0) return null;

    const noTieneImagen = (cat: Categoria, index: number) => {
        return !cat.img || cat.img.includes("default.png") || imgErrors.has(index);
    };

    const slides: CarouselSlide[] = categorias.map((cat, index) => {
        const sinImagen = noTieneImagen(cat, index);
        const icono = cat.icon || ICONOS_CATEGORIA[index % ICONOS_CATEGORIA.length];

        return {
            id: `cat-${cat.id}`,
            content: (
                <div
                    className="flex justify-center pt-1 select-none"
                >
                    <div
                        onClick={() => navigate(`/catalogo?categoria=${cat.slug  || cat.id}`)}
                        className="flex flex-col items-center text-center cursor-pointer"
                    >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-accent/70 ">
                            {sinImagen ? (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                    <Icon
                                        icon={icono}
                                        className="text-2xl sm:text-3xl text-shopforeground"
                                    />
                                    <span className="text-[10px] sm:text-xs font-semibold text-shopforeground tracking-widest">
                                        Sin imagen
                                    </span>
                                </div>
                            ) : (
                                <Image
                                    src={cat.img!}
                                    alt={cat.categoria}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    containerClassName="w-full h-full"
                                    onError={() => {
                                        setImgErrors((prev) => new Set(prev).add(index));
                                    }}
                                />
                            )}
                        </div>

                        <div className="px-2 pt-3 pb-1">
                            <h3 className=" text-sm sm:text-base text-shopforeground font-medium hover:text-shoprimary">
                                {cat.categoria}
                            </h3>
                           
                        </div>
                    </div>
                </div>
            ),
        };
    });

    return (
        <section
            ref={sectionRef}
            className="py-14 md:py-16 px-6 bg-card dark:bg-transparent transition-all duration-700 ease-out"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 sm:mb-14">
                    <Texto className="mb-2 font-extrabold text-2xl md:text-3xl opacity-95">
                        Encuentra lo que buscas
                    </Texto>
                    <p className=" text-muted-foreground mt-2">
                        Explora nuestras categorías principales
                    </p>
                </div>

                <ReusableCarousel
                    slides={slides}
                    variant="card"
                    slidesPerView={[2, 3, 4, 4, 4]}
                    slidesGap="gap-5"
                    showArrows
                    showDots
                    autoplay
                    autoplayDelay={4000}
                    stopOnInteraction={false}
                    stopOnHover={false}
                    arrowClassName="bg-black/40 hover:bg-black/60 text-white rounded-md border-0 shadow-md backdrop-blur-sm"
                    cardClassName="flex justify-center pt-1"
                />
            </div>
        </section>
    );
}
