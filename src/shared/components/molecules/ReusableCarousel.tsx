import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CarouselArrow } from "../atoms/CarruselArrow";

/* ── Tipos públicos ─────────────────────────────────────────────── */

export type CarouselSlide = {
  id: string | number;
  /** Banner mode: imagen de fondo */
  image?: string;
  imageSrcSet?: string;
  imageSizes?: string;
  /** Banner mode: overlay style (ej: "bg-gradient-to-r from-blue-900/60 to-transparent") */
  overlayClassName?: string;
  /** Banner mode: contenido central */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Banner mode: acción principal */
  action?: React.ReactNode;
  /** Link de redirección al hacer clic en el slide completo */
  link?: string;
  /** Render personalizado (reemplaza el layout banner completo) */
  content?: React.ReactNode;
};

export interface ReusableCarouselProps {
  /* ── Slides ── */
  slides: CarouselSlide[];

  /* ── Modo ── */
  /** "banner" → full-width cada slide, overlay + contenido centrado.
   *  "card" → múltiples items por view, cada slide renderiza slide.content. */
  variant?: "banner" | "card";

  /* ── Layout banner ── */
  bannerHeight?: string;

  /* ── Cards / multi-item ── */
  /** Número de columnas en cada breakpoint: [mobile, sm, md, lg, xl] */
  slidesPerView?: number[];
  /** Gap entre items (Tailwind, ej: "gap-4") */
  slidesGap?: string;
  /** Classes extra para el wrapper de cada slide en modo card */
  cardClassName?: string;

  /* ── Navegación ── */
  showArrows?: boolean;
  showDots?: boolean;
  arrowClassName?: string;
  dotsClassName?: string;

  /* ── Autoplay ── */
  autoplay?: boolean;
  autoplayDelay?: number;
  stopOnInteraction?: boolean;
  stopOnHover?: boolean;

  /* ── Estilo general ── */
  className?: string;
}

/* ── Hook de utilidad responsive ── */
function useSlidesPerView(breakpoints: number[]): number {
  const [cols, setCols] = React.useState(breakpoints[0] ?? 1);

  React.useEffect(() => {
    const bp = breakpoints;
    const queries = [
      { match: window.matchMedia("(min-width: 1280px)"), idx: 4 },
      { match: window.matchMedia("(min-width: 1024px)"), idx: 3 },
      { match: window.matchMedia("(min-width: 768px)"), idx: 2 },
      { match: window.matchMedia("(min-width: 640px)"), idx: 1 },
    ];

    const update = () => {
      for (const q of queries) {
        if (q.match.matches && bp[q.idx] !== undefined) {
          setCols(bp[q.idx]);
          return;
        }
      }
      setCols(bp[0] ?? 1);
    };

    update();
    const listeners = queries.map((q) => {
      q.match.addEventListener("change", update);
      return () => q.match.removeEventListener("change", update);
    });
    return () => listeners.forEach((fn) => fn());
  }, [breakpoints]);

  return cols;
}

/* ── Componente principal ─────────────────────────────────────── */
export default function ReusableCarousel({
  slides,
  variant = "banner",
  bannerHeight = "h-[50vh] sm:h-[70vh]",
  slidesPerView = [1, 2, 3, 4, 4],
  slidesGap = "gap-4",
  cardClassName,
  showArrows = true,
  showDots = true,
  arrowClassName,
  dotsClassName,
  autoplay = false,
  autoplayDelay = 5000,
  stopOnInteraction = true,
  stopOnHover = true,
  className,
}: ReusableCarouselProps) {
  const cols = useSlidesPerView(slidesPerView);
  const isBanner = variant === "banner";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: slides.length > 1,
      align: "start",
      slidesToScroll: 1,
      breakpoints:
        !isBanner && slidesPerView.length > 1
          ? {
            "(min-width: 640px)": { slidesToScroll: slidesPerView[1] ?? 2 },
            "(min-width: 768px)": { slidesToScroll: slidesPerView[2] ?? 2 },
            "(min-width: 1024px)": {
              slidesToScroll: slidesPerView[3] ?? 3,
            },
            "(min-width: 1280px)": {
              slidesToScroll: slidesPerView[4] ?? 4,
            },
          }
          : undefined,
    },
    autoplay
      ? [
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction,
          stopOnMouseEnter: stopOnHover,
          rootNode: (emblaRoot) => emblaRoot.parentElement!,
        }),
      ]
      : []
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const slideVersion = React.useRef<Record<string | number, number>>({});
  const prevIndexRef = React.useRef(selectedIndex);

  // Incrementa la versión SOLO cuando cambia el slide activo (no en cada render)
  // Esto fuerza un remount del <img> para reiniciar la animación Ken Burns
  React.useEffect(() => {
    if (prevIndexRef.current !== selectedIndex) {
      const slide = slides[selectedIndex];
      if (slide) {
        slideVersion.current[slide.id] = (slideVersion.current[slide.id] ?? 0) + 1;
      }
      prevIndexRef.current = selectedIndex;
    }
  }, [selectedIndex, slides]);

  const onSelect = React.useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setScrollSnaps(api.scrollSnapList());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );
  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  if (!slides.length) return null;

  /* ────────────────────── MODO BANNER ────────────────────── */
  if (isBanner) {
    return (
      <div
        className={cn("relative w-full overflow-hidden group", className)}
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative min-w-0 shrink-0 grow-0 basis-full"
            >
              {slide.content ? (
                slide.content
              ) : (
                <div
                  className={cn(
                    "relative w-full",
                    bannerHeight,
                    slide.link && "cursor-pointer",
                    "carousel-slide-enter"
                  )}
                  {...(slide.link
                    ? {
                      onClick: () => {
                        if (slide.link?.startsWith("http")) {
                          window.open(slide.link, "_blank", "noopener,noreferrer");
                        } else {
                          window.location.href = slide.link!;
                        }
                      },
                      role: "button",
                      tabIndex: 0,
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (slide.link?.startsWith("http")) {
                            window.open(slide.link, "_blank", "noopener,noreferrer");
                          } else {
                            window.location.href = slide.link!;
                          }
                        }
                      },
                    }
                    : {})}
                >

                  {slide.image && (
                    <img
                      key={`${slide.id}-${slideVersion.current[slide.id] ?? 0}`}
                      src={slide.image}
                      srcSet={slide.imageSrcSet}
                      sizes={slide.imageSizes ?? "100vw"}
                      alt={typeof slide.title === "string" ? slide.title : ""}
                      className={cn(
                        "w-full h-full object-cover absolute inset-0",
                        idx === selectedIndex && "carousel-image-ken"
                      )}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  )}

                  {/* Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0",
                      slide.overlayClassName ??
                      "bg-linear-to-r from-blue-900/10 via-blue-900/10 to-blue-900/5"
                    )}
                  />

                  {/* Contenido animado */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-4 sm:gap-6">
                    {slide.title && (
                      <div className="carousel-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-white leading-tight">
                        {slide.title}
                      </div>
                    )}
                    {slide.description && (
                      <div className="carousel-desc text-sm md:text-lg text-white/80 leading-relaxed max-w-xl">
                        {slide.description}
                      </div>
                    )}
                    {slide.action && <div className="carousel-cta mt-2">{slide.action}</div>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Flechas */}
        {showArrows && slides.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 cursor-pointer rounded-full bg-white backdrop-blur-sm",
                "flex items-center justify-center text-gray-800",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                " active:scale-95",
                arrowClassName
              )}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className={cn(
                "absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 rounded-full bg-white backdrop-blur-sm",
                "flex items-center justify-center text-gray-800",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                " active:scale-95",
                arrowClassName
              )}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && slides.length > 1 && (
          <div
            className={cn(
              "absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10",
              "flex items-center gap-2",
              dotsClassName
            )}
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  idx === selectedIndex
                    ? "w-8 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Ir a slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ────────────────────── MODO CARD ────────────────────── */
  const gapPx = slidesGap === "gap-4" ? 16 : slidesGap === "gap-2" ? 8 : slidesGap === "gap-5" ? 20 : slidesGap === "gap-6" ? 24 : 16;
  const itemFlexBasis = cols > 0
    ? `0 0 calc((100% - ${(cols - 1) * gapPx}px) / ${cols})`
    : `0 0 100%`;

  return (
    <div className={cn("relative group", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className={cn("flex", slidesGap)}>
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={cn("min-w-0 shrink-0 grow-0", cardClassName)}
              style={{ flex: itemFlexBasis }}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Flechas */}
      {showArrows && slides.length > cols && (
        <>
          <CarouselArrow
            direction="left"
            onClick={scrollPrev}
            className={arrowClassName}
          />

          <CarouselArrow
            direction="right"
            onClick={scrollNext}
            className={arrowClassName}
          />
        </>
      )}

      {/* Dots */}
      {showDots && slides.length > 1 && (
        <div
          className={cn(
            "flex items-center justify-center gap-2 mt-6",
            dotsClassName
          )}
        >
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "rounded-full transition-all duration-300",
                idx === selectedIndex
                  ? "w-6 h-2 bg-shoprimary2"
                  : "w-2 h-2 bg-accent hover:bg-accent"
              )}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
