import { NavLink } from "react-router-dom";
import { Texto } from "../../../ui";
import { Icon } from "@iconify-icon/react";
import { useCartStore } from "@/features/shop/common/store/cartStore";
import { useModal } from "@/shared/hooks/useModal";

const links = [
    { name: "Inicio", shortName: "Inicio", path: "/", icon: <Icon icon="fluent:home-24-filled" width="24" height="24" /> },
    { name: "Catálogo", shortName: "Catálogo", path: "/catalogo", icon: <Icon icon="material-symbols:grid-on" width="24" height="24" /> },
    { name: "Quienes Somos", shortName: "Nosotros", path: "/nosotros", icon: <Icon icon="lucide:users" width="24" height="24" /> },
];

export default function NavbarBottom() {
    const items = useCartStore((state) => state.items);

    const total = items.reduce(
        (acc, item) => acc + item.cantidad,
        0
    );

    const modaladd = useModal("md-carrito");


    return (
        <>
            {/* ── DESKTOP: barra horizontal superior ── */}
            <div className="hidden md:block ">

                <nav className="flex  items-center  gap-0.5 ">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === "/"}
                            className={({ isActive }) =>
                                `relative flex items-center  gap-1.5  px-4 py-1.5  text-sm font-semibold
                   transition-colors duration-150  rounded-md 
                   ${isActive
                                    ? "text-white bg-white/10 "
                                    : "text-white hover:text-shoprimary  "
                                }`
                            }
                        >

                            < div className="flex flex-col items-center gap-1" >
                                {link.name}

                            </div>

                        </NavLink>
                    ))}

                    <button className="relative flex items-center  gap-1.5  px-4 py-1.5  text-sm font-semibold
                   transition-colors duration-150  rounded-md 
                   text-white hover:text-shoprimary
                   "
                   onClick={modaladd.open}>
                        <Icon icon="lucide:shopping-cart" width="20" height="20" />
                        {total > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                {total}
                            </span>
                        )}
                    </button>

                </nav>

            </div>

            {/* ── MOBILE: barra inferior fija ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 shadow-xl drop-shadow-2xl
                      bg-card border-t border-border
                      flex justify-around items-end
                      py-4 px-2 safe-area-inset-bottom">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === "/"}
                        className="flex flex-col items-center gap-0  min-w-14"
                    >
                        {({ isActive }) => (
                            <div className={`${isActive ? "text-shoprimary" : ""} flex items-center flex-col`}>
                                {link.icon}
                                <Texto className={`${isActive ? "text-shoprimary" : ""} text-xs`}>{link.shortName}</Texto>
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav >

        </>
    );
}