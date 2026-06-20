import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useCategoryShop } from "../../common/hooks/useConsultas";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import Image from "@/shared/ui/image";
import Loading from "@/shared/ui/loading";
import { Texto } from "@/shared/ui";

interface Categoria {
    categoria: string;
    img: string | null;
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
    const { ref: sectionRef} = useScrollReveal<HTMLElement>();
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

    return (
        <section
            ref={sectionRef}
            className={`py-20 px-6 bg-background transition-all duration-700 ease-out `}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 sm:mb-14">
                    <Texto className="mb-2 font-extrabold text-2xl md:text-4xl opacity-95">
                        Categorias
                    </Texto>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                    {categorias.map((cat, index) => {
                        const sinImagen = noTieneImagen(cat, index);
                        const icono = ICONOS_CATEGORIA[index % ICONOS_CATEGORIA.length];
                        return (
                            <article
                                key={`cat-${index}`}
                                onClick={() => navigate('/catalogo')}
                                className="group cursor-pointer"
                            >
                                <div className="relative rounded-xl overflow-hidden bg-shopcard shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
                                    {/* Image area */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        {sinImagen ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-shoprimary/5 to-shoprimary/15 group-hover:from-shoprimary/10 group-hover:to-shoprimary/25 transition-all duration-500">
                                                {/* Círculo decorativo */}
                                                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-shoprimary/10 group-hover:bg-shoprimary/20 transition-all duration-500 group-hover:scale-110">
                                                    <Icon
                                                        icon={icono}
                                                        className="text-3xl text-shoprimary/60 group-hover:text-shoprimary transition-all duration-500"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-medium text-shoprimary/40 uppercase tracking-widest">
                                                    Sin imagen
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <Image
                                                    src={cat.img!}
                                                    alt={cat.categoria}
                                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                                    containerClassName="w-full h-full"
                                                    onError={() => {
                                                        setImgErrors((prev) => new Set(prev).add(index));
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </>
                                        )}
                                    </div>

                                    {/* Name container below image */}
                                    <div className="px-4 py-3.5 bg-shopcard border-t border-shopborder/50">
                                        <h3 className="text-center font-semibold text-sm sm:text-base text-shopforeground group-hover:text-shoprimary transition-colors duration-300">
                                            {cat.categoria}
                                        </h3>
                                    </div>

                                    {/* Accent line on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-shoprimary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </div>
                            </article>
                        );
                    })}
                </div>

              
            </div>
        </section>
    );
}
