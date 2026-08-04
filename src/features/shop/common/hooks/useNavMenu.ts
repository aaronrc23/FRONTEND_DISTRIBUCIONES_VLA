import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * Maneja el estado del menú móvil:
 * - Abre/cierra el menú
 * - Cierra automáticamente al pasar a desktop
 * - Bloquea el scroll del body cuando está abierto en móvil
 * - Provee el handler de navegación suave
 *
 * @param {boolean} isMobile - viene de useWindowSize
 * @returns {{ isMenuOpen, toggleMenu, closeMenu, handleNavClick }}
 */
export function useNavMenu(isMobile = false) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        if (!isMobile && isMenuOpen) setIsMenuOpen(false);
    }, [isMobile, isMenuOpen]);

    useEffect(() => {
        if (!isMobile) return;
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen, isMobile]);
    const handleNavClick = useCallback((href: string) => {
        setIsMenuOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    return {
        isMenuOpen,
        toggleMenu,
        closeMenu,
        handleNavClick,
    };
}

interface NavItem {
    href?: string;
    to?: string;
}


export function useNavScroll(navLinks: NavItem[], scrollThreshold = 24) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const location = useLocation();

    /* ── Glass effect ── */
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > scrollThreshold);
        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollThreshold]);

    /* ── Detectar rutas (React Router) ── */
    useEffect(() => {
        const currentPath = location.pathname;

        const routeMatch = navLinks.find(link => link.to === currentPath);

        if (routeMatch) {
            setActiveSection(currentPath);
        }
    }, [location.pathname, navLinks]);

    /* ── Detectar scroll (solo anchors) ── */
    useEffect(() => {
        const sections = navLinks
            .filter(link => link.href?.startsWith("#"))
            .map(link => document.querySelector(link.href!))
            .filter(Boolean);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: "-35% 0px -60% 0px" }
        );

        sections.forEach((s) => observer.observe(s as Element));
        return () => observer.disconnect();
    }, [navLinks]);

    return { isScrolled, activeSection };
}


