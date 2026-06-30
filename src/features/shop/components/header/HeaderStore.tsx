
import { Logo } from "./Subcomponents";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui";
import { Icon } from "@iconify-icon/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useMobileMenuStore } from "../../common/store/menuStore";
import MobileMenu from "./MobileMenu";


const NavbarBottom = lazy(() => import("../../../../shared/components/shop/header/NavbarBotom"));

export default function HeaderStore({ className }: any) {
    const navigate = useNavigate();
    const handleHome = () => navigate('/');
    const { toggle, isOpen } = useMobileMenuStore();
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



                        {/* Mobile menu */}
                        <Button
                            aria-label="menu"
                            className="md:hidden p-2 text-shopheader-foreground"
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
            </nav>

            {/* Mobile menu drawer - fuera del nav para evitar problemas con el overlay */}
            <MobileMenu />
        </>
    );
}
