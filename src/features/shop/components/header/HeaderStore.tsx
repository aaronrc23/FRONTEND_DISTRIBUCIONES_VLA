
import { Logo } from "./Subcomponents";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui";
import { Icon } from "@iconify-icon/react";
import { lazy, Suspense } from "react";
import { useMobileMenuStore } from "../../common/store/menuStore";
import MobileMenu from "./MobileMenu";


const NavbarBottom = lazy(() => import("../../../../shared/components/shop/header/NavbarBotom"));

export default function HeaderStore({ className }: any) {
    const navigate = useNavigate();
    const handleHome = () => navigate('/');
    const { toggle, isOpen } = useMobileMenuStore();

    return (
        <nav
            className={`sticky top-0 z-40 
                bg-shopheader border-b border-none shadow-sm
                transition-all duration-300 w-full
                p-3 ${className} `}
        >
            <div className="flex items-center lg:container px-2 lg:mx-auto justify-between h-16 w-full">
                <div>
                    <Logo onClick={handleHome} />

                </div>

                {/* Navegación + acciones */}
                <div className="flex items-center gap-4 flex-1 justify-end">

                    {/* Navbar (desktop) */}
                    <div className="">
                        <Suspense fallback={null}>
                            <NavbarBottom />
                        </Suspense>
                    </div>



                    {/* Mobile menu */}
                    <Button
                        aria-label="menu"
                        className="md:hidden bg-transparent text-white p-2"
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

            {/* Mobile menu drawer */}
            <MobileMenu />
           
        </nav>
    );
}
