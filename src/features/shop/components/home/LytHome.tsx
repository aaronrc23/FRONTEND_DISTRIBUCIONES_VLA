import { useNavigate } from "react-router-dom";
import { useFilterProduct, useActiveBanners } from "../../common/hooks/useConsultas";
import { Icon } from "@iconify-icon/react";
import { Button, Texto } from "@/shared/ui";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import ReusableCarousel from "@/shared/components/molecules/ReusableCarousel";
import CategoriasSection from "./CategoriasSection";
import { useWhatsappNumber } from "../../common/hooks/useWhatsappNumber";
import type { CarouselSlide } from "@/shared/components/molecules/ReusableCarousel";

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
    <section className="w-full">
      {isLoading ? (
        <div className="h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] flex items-center justify-center bg-slate-100">
          <Icon icon="fontisto:spinner-refresh" className="animate-spin text-4xl text-orange-400" />
        </div>
      ) : bannerSlides.length === 0 ? (
        <div className="h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] flex items-center justify-center bg-slate-100">
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
          className="w-full"
        />
      )}
    </section>
  );
}



/* ─── Sección: Productos más vendidos (con fondo distinto) ─── */
function FeaturedProductsSection() {
  const navigate = useNavigate();
  const { data: productos, isLoading } = useFilterProduct();

  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  const featured = productos?.slice(0, 12) ?? [];

  const productSlides: CarouselSlide[] = featured.map((item: any) => ({
    id: item.id,
    content: (
      <div
        className="group relative bg-card rounded-xl border border-slate-100 shadow-sm
  overflow-hidden hover:shadow-lg transition-all duration-300
  h-[340px] flex flex-col"
      >
        {/* Imagen */}
        <div
          className="h-44 overflow-hidden bg-slate-50 cursor-pointer"
          onClick={() => navigate(`/producto/${item.producto.id}`)}
        >
          <img
            src={item.producto.imagen}
            alt={item.producto.name}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Contenido */}
        <div className="p-3 flex flex-col flex-1">
          <h3
            className="text-sm font-medium text-slate-800 line-clamp-2 h-10"
            onClick={() => navigate(`/producto/${item.producto.id}`)}
          >
            {item.producto.name}
          </h3>

          <p className="text-lg font-bold text-orange-500 mt-2">
            S/ {Number(item.producto.precio).toFixed(2)}
          </p>

          <Button variant="shopPrimary"> Agregar</Button>
        </div>
      </div>
    ),
  }));

  return (
    <section
      ref={ref}
      className={`py-20 px-6 bg-white dark:bg-background  transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Título minimalista */}
        <div className="text-center mb-12 sm:mb-14">
          <Texto className="mb-2 font-extrabold text-2xl md:text-4xl opacity-95">
            PRODUCTOS DESTACADOS
          </Texto>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Icon icon="fontisto:spinner-refresh" className="animate-spin text-4xl text-orange-400" />
          </div>
        ) : productSlides.length === 0 ? (
          <p className="text-center text-slate-400 py-12">Próximamente más productos</p>
        ) : (
          <ReusableCarousel
            slides={productSlides}
            variant="card"
            slidesPerView={[1, 2, 3, 4]}
            slidesGap="gap-4"
            autoplay
            autoplayDelay={4000}
            showArrows
            showDots
            cardClassName="h-full"
          />
        )}
      </div>
    </section>
  );
}

/* ─── Sección: CTA Final ─── */
function CTASection() {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const whatsappNumber = useWhatsappNumber();

  return (
    <section
      ref={ref}
      className={`py-2 md:py-24 px-6 relative overflow-hidden transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {/* Background decorative */}
      <div className="absolute inset-0 bg-white dark:bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 sm:max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#3b50ad] mb-6 leading-tight">
          ¿Listo para empezar?
        </h2>
        <p className="text-base md:text-lg text-shop-secondary-foreground mb-10 max-w-xl mx-auto">
          Explora nuestro catálogo y encuentra la cinta adhesiva perfecta para tu proyecto.
          ¡Haz tu pedido hoy y recíbelo en 24 horas!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => navigate("/catalogo")}
            size="xl"
            variant="brand"
            className="px-10 rounded-full "
          >
            <Icon icon="mdi:shopping-outline" />
            Ir al Catálogo
          </Button>

          <Button
            onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
            variant="shopSecondary"
            size="xl"
            className="px-10 rounded-full border-2"
          >
            <Icon icon="logos:whatsapp-icon" className="text-xl" />
            Escribir por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Página principal ─── */
export default function LytHome() {
  return (
    <div className="w-full h-full">
      <HeroSection />

      <FeaturedProductsSection />
      <CategoriasSection />
      <CTASection />
    </div>
  );
}
