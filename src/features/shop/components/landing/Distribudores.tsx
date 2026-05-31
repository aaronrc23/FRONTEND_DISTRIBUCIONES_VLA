import Image from "../../../../shared/ui/image";
import { v } from "../../../../styles/variables";
import { useScrollReveal } from "../../../../shared/hooks/useScrollReveal";

export default function Distribudores() {
    const { ref, isVisible } = useScrollReveal<HTMLElement>();
    return (
        <section ref={ref} className={`relative py-20 px-6  overflow-hidden transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
            {/* Elementos decorativos sutiles */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-900/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-orange-500/[0.03] rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-900/5 border border-blue-900/10 px-4 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">Distribución Directa</span>
                </div>

                {/* Título */}
                <h2 className="text-3xl sm:text-4xl font-black text-blue-900 leading-tight">
                    Distribuidores Directos
                </h2>

                {/* Logo */}
                <div className="relative group py-4">
                    <div className="absolute -inset-10 bg-gradient-to-br from-blue-900/[0.04] via-cyan-500/[0.04] to-orange-500/[0.04] rounded-full blur-2xl transition-all duration-500 group-hover:scale-110"></div>
                    <div className="relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.06)] px-12 py-8 border border-blue-900/5 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(15,23,42,0.1)] group-hover:-translate-y-0.5">
                        <Image
                            src={v.iconpegafan}
                            alt="Logo Pegafan - Distribuciones VLA"
                            className="w-40 h-auto"
                        />
                    </div>
                </div>

                {/* Tagline */}
                <p className="text-shop-secondary-foreground/70 font-light text-base max-w-md leading-relaxed">
                    Trabajamos directamente con <strong className="text-blue-900 font-semibold">Pegafan</strong> y marcas líderes para ofrecerte la mejor calidad.
                </p>
            </div>
        </section>
    );
}
