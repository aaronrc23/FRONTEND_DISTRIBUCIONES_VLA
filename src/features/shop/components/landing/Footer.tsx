import { Icon } from "@iconify-icon/react";
import { useScrollReveal } from "../../../../shared/hooks/useScrollReveal";
import { useQuery } from "@tanstack/react-query";
import { getFooterPublic } from "../../common/services/FooterService";

const defaultFooter = {
    razon_social: "Distribuciones VLA",
    nombre_comercial: "Distribuciones VLA",
    descripcion: "Tu tienda de confianza con los mejores productos al mejor precio. Calidad garantizada en cada compra.",
    direccion: "Av. Principal 123, Lima, Perú",
    telefono: "+51 999 999 999",
    email: "contacto@vla.com",
    whatsapp: "51999999999",
    copyright_text: `© ${new Date().getFullYear()} Distribuciones VLA E.I.R.L. Todos los derechos reservados.`,
    footer_links: {
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
    },
    logo_url: null,
};

export default function Footer() {
    const { ref } = useScrollReveal<HTMLElement>();

    const { data: footerData } = useQuery({
        queryKey: ["footer-public"],
        queryFn: getFooterPublic,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    const footer = footerData ?? defaultFooter;

    const footerLinks = footer.footer_links ?? defaultFooter.footer_links;
    const tiendaLinks = footerLinks?.tienda ?? [];
    const ayudaLinks = footerLinks?.ayuda ?? [];

    // Redes sociales disponibles (incluyendo WhatsApp)
    const socialLinks = [
        ...(footer.facebook_url ? [{ icon: "mdi:facebook", label: "Facebook", href: footer.facebook_url }] : []),
        ...(footer.instagram_url ? [{ icon: "mdi:instagram", label: "Instagram", href: footer.instagram_url }] : []),
        ...(footer.twitter_url ? [{ icon: "ri:twitter-x-fill", label: "X (Twitter)", href: footer.twitter_url }] : []),
    ];

    const direccionCompleta = [footer.direccion, footer.distrito, footer.provincia, footer.departamento]
        .filter(Boolean)
        .join(", ");

    // Enlace y formato de WhatsApp
    const whatsappDigits = footer.whatsapp?.replace(/[^0-9]/g, "");
    const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}` : null;

    // Formatear número: +51 999 999 999
    const formatWhatsapp = (num: string) => {
        const digits = num.replace(/[^0-9]/g, "");
        if (digits.length === 11) {
            return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
        }
        if (digits.length === 9) {
            return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
        }
        return num;
    };

    return (
        <footer ref={ref} className="relative bg-footer-bg">
            {/* Línea decorativa superior */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-footer-border" />

            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Columna 1 — Marca */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                        <div className="flex items-center gap-3">

                            <div>
                                <h2 className="text-lg font-bold text-footer-title tracking-tight">{footer.nombre_comercial}</h2>
                                <span className="text-sm font-bold text-footer-accent uppercase tracking-[0.2em]">E.I.R.L</span>
                            </div>
                        </div>

                        <p className="text-sm text-footer-foreground leading-relaxed max-w-sm">
                            {footer.descripcion || defaultFooter.descripcion}
                        </p>

                        {/* Redes sociales */}
                        {socialLinks.length > 0 && (
                            <div className="flex items-center gap-3 mt-1">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-9 h-9 rounded-full bg-footer-border/50 hover:bg-footer-accent text-footer-foreground hover:text-white flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Icon
                                            icon={social.icon}
                                            className="text-base transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Columna 2 — Tienda */}
                    {tiendaLinks.length > 0 && (
                        <div className="lg:col-span-3 flex flex-col gap-4">
                          
                            <h3 className="text-sm font-bold text-footer-title uppercase tracking-[0.15em]">Tienda</h3>
                            <ul className="flex flex-col gap-3">
                                {tiendaLinks.map((link: any) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-footer-foreground hover:text-footer-accent transition-colors duration-200 inline-flex items-center gap-1.5 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-[1px] bg-footer-accent transition-all duration-200" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Columna 3 — Ayuda */}
                    {ayudaLinks.length > 0 && (
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <h3 className="text-sm font-bold text-footer-title uppercase tracking-[0.15em]">Ayuda</h3>

                            <ul className="flex flex-col gap-3">
                                {ayudaLinks.map((link: any) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-footer-foreground hover:text-footer-accent transition-colors duration-200 inline-flex items-center gap-1.5 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-[1px] bg-footer-accent transition-all duration-200" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Columna 4 — Contacto */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-footer-title uppercase tracking-[0.15em]">Contacto</h3>

                        <ul className="flex flex-col gap-4">
                            {direccionCompleta && (
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-footer-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon icon="mdi:map-marker" className="text-footer-accent text-base" />
                                    </div>
                                    <span className="text-sm text-footer-foreground leading-relaxed">{direccionCompleta}</span>
                                </li>
                            )}
                            {footer.telefono && (
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-footer-accent/10 flex items-center justify-center shrink-0">
                                        <Icon icon="mdi:phone" className="text-footer-accent text-base" />
                                    </div>
                                    <a href={`tel:${footer.telefono}`} className="text-sm text-footer-foreground hover:text-footer-accent transition-colors">
                                        {footer.telefono}
                                    </a>
                                </li>
                            )}
                            {footer.email && (
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-footer-accent/10 flex items-center justify-center shrink-0">
                                        <Icon icon="mdi:email" className="text-footer-accent text-base" />
                                    </div>
                                    <a href={`mailto:${footer.email}`} className="text-sm text-footer-foreground hover:text-footer-accent transition-colors">
                                        {footer.email}
                                    </a>
                                </li>
                            )}
                            {/* WhatsApp */}
                            {whatsappUrl && footer.whatsapp && (
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                        <Icon icon="mdi:whatsapp" className="text-green-600 dark:text-green-400 text-lg" />
                                    </div>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-footer-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                    >
                                        {formatWhatsapp(footer.whatsapp)}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Barra inferior */}
            <div className="bg-footer-bg">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-footer-muted font-medium">
                        {footer.copyright_text || defaultFooter.copyright_text}
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-xs text-footer-muted hover:text-footer-accent transition-colors font-medium">Política de privacidad</a>
                        <span className="text-footer-border text-[10px]">|</span>
                        <a href="#" className="text-xs text-footer-muted hover:text-footer-accent transition-colors font-medium">Términos de uso</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
