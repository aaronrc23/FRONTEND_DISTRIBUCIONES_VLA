import { useNavigate } from "react-router-dom";
import { useFilterProduct, useActiveBanners } from "../../common/hooks/useConsultas";
import { Icon } from "@iconify-icon/react";
import { Button, Card } from "@/shared/ui";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import ReusableCarousel from "@/shared/components/molecules/ReusableCarousel";
import CategoriasSection from "./CategoriasSection";

import type { CarouselSlide } from "@/shared/components/molecules/ReusableCarousel";
import { ImageOff } from "lucide-react";

/* ─── Sección: Hero / Carrusel ──────────────────────────── */
function HeroSection() {
  const { data: banners, isLoading } = useActiveBanners();

  const bannerSlides: CarouselSlide[] = (banners ?? []).map((b: any) => ({
    id: b.id,
    image: b.url_imagen,
    imageSizes: "100vw",
    link: b.enlace || "/catalogo",
  }));

  return (
    <section className="w-full px-4">
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] flex items-center justify-center bg-slate-100 rounded-xl">
            <Icon icon="fontisto:spinner-refresh" className="animate-spin text-4xl text-orange-400" />
          </div>
        ) : bannerSlides.length === 0 ? (
          <div className="h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] flex items-center justify-center bg-slate-100 rounded-xl">
            <p className="text-slate-400 text-lg">Próximamente</p>
          </div>
        ) : (
          <ReusableCarousel
            slides={bannerSlides}
            variant="banner"
            bannerHeight="h-[40vh] sm:h-[50vh] "
            autoplay
            autoplayDelay={6000}
            showArrows
            showDots
            className="w-full rounded-xl overflow-hidden"
          />
        )}
      </div>
    </section>
  );
}

function MenssageBienvenida() {
  return (
    <div className="relative w-full bg-card dark:bg-transparent px-6 py-20 md:pt-20 md:pb-10 overflow-hidden">
      {/* Resplandores ambientales sutiles */}
    

      <div className="relative z-10 max-w-3xl mx-auto text-center">


        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl  font-black leading-[1.1] tracking-tight">
          <span className="text-foreground/90">Distribuciones</span>{' '}
          <span className="relative inline-block mt-1">
            <span className="relative z-10 text-section-title">VLA</span>
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-orange-400 z-0" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Descripción */}
        <div className="py-8">
          <Card className="p-5 bg-accent/30 border-none">
            <p className=" text-lg sm:text-xl text-shopforeground leading-relaxed max-w-2xl mx-auto">
              Lo que construyes merece resistencia.{' '}
              <span className="font-semibold  text-section-title">Por eso distribuimos cintas adhesivas en las que puedes confiar.</span>
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
}



/* ─── Sección: Productos más vendidos (con fondo distinto) ─── */
function FeaturedProductsSection() {
  const navigate = useNavigate();
  const { data: response, isLoading } = useFilterProduct();

  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  // Extraer la data del formato paginado (página 1 con 12 items)
  const productos = response?.data ?? [];
  const featured = productos.slice(0, 12) ?? [];

  return (
    <section
      ref={ref}
      className={`py-14 md:py-16  bg-bgshop dark:bg-transparent  transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      <div className="max-w-6xl mx-auto px-1 sm:px-4">

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-2">
          <h2 className="text-lg sm:text-2xl font-bold">
            Más productos destacados
          </h2>

          <Button
            variant="default"
            onClick={() => navigate("/productos")}
          >
            Ver todos
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Icon icon="fontisto:spinner-refresh" className="animate-spin text-4xl text-orange-400" />
          </div>
        ) : featured.length === 0 ? (
          <p className="text-center text-shopforeground py-12">Próximamente más productos</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            {featured.slice(0, 10).map((item: any) => (
              <div
                key={item.id}
                className="group relative bg-card rounded-xl 
                overflow-hidden transition-all duration-300 
                h-[340px] flex flex-col"
              >
                {/* Imagen */}
                <div
                  className="h-44 overflow-hidden  cursor-pointer"
                  onClick={() => navigate(`/producto/${item.producto.slug || item.producto.id}`)}
                >
                  {item.producto.imagen ? (
                    <img
                      src={item.producto.imagen}
                      alt={item.producto.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                      <ImageOff className="w-12 h-12 mb-2 opacity-60" />
                      <span className="text-xs">Sin imagen</span>
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-3 flex flex-col flex-1 gap-2">
                  <h3
                    className="text-sm  text-foreground line-clamp-2 h-10 cursor-pointer hover:text-shoprimary transition-colors"
                    onClick={() => navigate(`/producto/${item.producto.slug || item.producto.id}`)}
                  >
                    {item.producto.name}
                  </h3>

                  <p className="text-base text-center font-bold text-foreground mt-2">
                    S/ {Number(item.producto.precio).toFixed(2)}
                  </p>

                  <Button variant="shopPrimary"> Agregar</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}



/* ─── Página principal ─── */
export default function LytHome() {
  return (
    <div className="w-full h-full flex flex-col sm:p-12">
      <HeroSection />
      <MenssageBienvenida />
      <CategoriasSection />
      <FeaturedProductsSection />

    </div>
  );
}
