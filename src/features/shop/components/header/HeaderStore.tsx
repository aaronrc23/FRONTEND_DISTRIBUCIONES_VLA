
import { Logo } from "./Subcomponents";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui";
import { Icon } from "@iconify-icon/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useMobileMenuStore } from "../../common/store/menuStore";
import { useModal } from "@/shared/hooks/useModal";
import { useCartStore } from "../../common/store/cartStore";
import MobileMenu from "./MobileMenu";


const NavbarBottom = lazy(() => import("../../../../shared/components/shop/header/NavbarBotom"));

export default function HeaderStore({ className }: any) {
    const navigate = useNavigate();
    const handleHome = () => navigate('/');
    const { toggle, isOpen, close } = useMobileMenuStore();
    const cartModal = useModal("md-carrito");
    const totalItems = useCartStore((state) => state.items.reduce((acc, item) => acc + item.cantidad, 0));
    const [scrolled, setScrolled] = useState(() => window.scrollY > 10);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`sticky top-0 z-40 
                        bg-shopheader backdrop-blur-md border-b border-shopborder/60
                    transition-all duration-300 w-full
                    p-3 ${scrolled ? "shadow-xl" : "shadow-xs"} ${className} `}
            >
                <div className="flex items-center lg:container px-2 lg:mx-auto justify-between h-16 w-full">
                    <div>
                        <Logo onClick={handleHome} dark={true} />

                    </div>

                    {/* Navegación + acciones */}
                    <div className="flex items-center gap-4 flex-1 justify-end">

                        {/* Navbar (desktop) */}
                        <div className="">
                            <Suspense fallback={null}>
                                <NavbarBottom dark={true} />
                            </Suspense>
                        </div>



                        {/* Mobile actions */}
                        <div className="md:hidden flex items-center gap-1">
                            {/* Cart button */}
                            <Button
                                aria-label="carrito"
                                className="relative p-2 text-shopheader-foreground"
                                variant="outline"
                                onClick={cartModal.open}
                            >
                                <Icon icon="lucide:shopping-cart" className="text-2xl" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-md">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>

                            {/* Menu button */}
                            <Button
                                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                                aria-expanded={isOpen}
                                aria-controls="mobile-menu"
                                className="p-2 text-shopheader-foreground"
                                variant="outline"
                                onClick={toggle}
                            >
                                {isOpen ? (
                                    <Icon icon="lucide:x" className="text-2xl" />
                                ) : (
                                    <Icon icon="lucide:menu" className="text-2xl" />
                                )}
                            </Button>
                        </div>


                    </div>
                </div>
                {/* Menú móvil: dropdown de ancho completo anclado debajo del header */}
                <MobileMenu />
            </nav>

            {/* Overlay que oscurece el contenido debajo del header mientras el menú está abierto */}
            <div
                className={`md:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]
                    transition-opacity duration-300
                    ${isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
                onClick={close}
                aria-hidden={!isOpen}
            />
        </>
    );
}
