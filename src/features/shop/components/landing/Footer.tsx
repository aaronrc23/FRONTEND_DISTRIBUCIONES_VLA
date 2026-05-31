import { Icon } from "@iconify-icon/react";
import { useScrollReveal } from "../../../../shared/hooks/useScrollReveal";

const footerLinks = {
    tienda: [
        { label: "Todos los productos", href: "#" },
        { label: "Ofertas del día", href: "#" },
        { label: "Nuevos ingresos", href: "#" },
        { label: "Más vendidos", href: "#" },
        { label: "Categorías", href: "#" },
    ],
    ayuda: [
        { label: "Cómo comprar", href: "#" },
        { label: "Seguimiento de pedido", href: "#" },
        { label: "Devoluciones", href: "#" },
        { label: "Preguntas frecuentes", href: "#" },
        { label: "Términos y condiciones", href: "#" },
    ],
};

const socialLinks = [
    { icon: "mdi:facebook", label: "Facebook", href: "#" },
    { icon: "mdi:instagram", label: "Instagram", href: "#" },
    { icon: "ri:twitter-x-fill", label: "X (Twitter)", href: "#" },
];

export default function Footer() {
    const { ref, isVisible } = useScrollReveal<HTMLElement>();

    return (
        <footer
            ref={ref}
            className={`relative bg-white }`}
        >
            {/* Línea decorativa superior */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-900/10 to-transparent" />

            <div className="max-w-6xl bg-white mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Columna 1 — Marca */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center shadow-sm">
                                <Icon icon="mdi:package-variant-closed" className="text-white text-xl" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-blue-900 tracking-tight">Distribuciones VLA</h2>
                                <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-[0.2em]">E.I.R.L</span>
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                            Tu tienda de confianza con los mejores productos al mejor precio.
                            Calidad garantizada en cada compra.
                        </p>

                        {/* Redes sociales */}
                        <div className="flex items-center gap-3 mt-1">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-900 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 group"
                                >
                                    <Icon
                                        icon={social.icon}
                                        className="text-base transition-transform duration-300 group-hover:scale-110"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columna 2 — Tienda */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-blue-900 uppercase tracking-[0.15em]">Tienda</h3>
                        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        <ul className="flex flex-col gap-3">
                            {footerLinks.tienda.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-500 hover:text-blue-900 transition-colors duration-200 inline-flex items-center gap-1.5 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-blue-500 transition-all duration-200" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3 — Ayuda */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-blue-900 uppercase tracking-[0.15em]">Ayuda</h3>
                        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        <ul className="flex flex-col gap-3">
                            {footerLinks.ayuda.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-500 hover:text-blue-900 transition-colors duration-200 inline-flex items-center gap-1.5 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-blue-500 transition-all duration-200" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 4 — Contacto */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-blue-900 uppercase tracking-[0.15em]">Contacto</h3>
                        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-900/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <Icon icon="mdi:map-marker" className="text-blue-600 text-base" />
                                </div>
                                <span className="text-sm text-slate-500 leading-relaxed">Av. Principal 123, Lima, Perú</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-900/5 flex items-center justify-center shrink-0">
                                    <Icon icon="mdi:phone" className="text-blue-600 text-base" />
                                </div>
                                <a href="tel:+51999999999" className="text-sm text-slate-500 hover:text-blue-900 transition-colors">
                                    +51 999 999 999
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-900/5 flex items-center justify-center shrink-0">
                                    <Icon icon="mdi:email" className="text-blue-600 text-base" />
                                </div>
                                <a href="mailto:contacto@vla.com" className="text-sm text-slate-500 hover:text-blue-900 transition-colors">
                                    contacto@vla.com
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Barra inferior */}
            <div className="border-t border-blue-900/5 bg-blue-900/[0.02]">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} Distribuciones VLA E.I.R.L. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-xs text-slate-400 hover:text-blue-900 transition-colors">Política de privacidad</a>
                        <span className="text-slate-300 text-[10px]">|</span>
                        <a href="#" className="text-xs text-slate-400 hover:text-blue-900 transition-colors">Términos de uso</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
