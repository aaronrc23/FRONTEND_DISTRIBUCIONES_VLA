import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { useMobileMenuStore } from "../../common/store/menuStore";


interface LinkItem {
  name: string;
  path: string;
  icon: string;
}

const links: LinkItem[] = [
  {
    name: "Inicio",
    path: "/",
    icon: "fluent:home-24-filled",
  },
  {
    name: "Catálogo",
    path: "/catalogo",
    icon: "material-symbols:grid-on",
  },
  {
    name: "Quienes Somos",
    path: "/nosotros",
    icon: "lucide:users",
  },
];

export default function MobileMenu() {
  const { isOpen, close } = useMobileMenuStore();

  // Tecla Escape + bloqueo de scroll mientras el menú está abierto
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    // Si la ventana crece a desktop (md+) el menú se cierra automáticamente,
    // evitando que el scroll quede bloqueado sin forma visible de cerrar.
    const mq = window.matchMedia("(min-width: 768px)");
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };
    mq.addEventListener("change", handleResize);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      mq.removeEventListener("change", handleResize);
    };
  }, [isOpen, close]);

  return (
    /* Panel dropdown de ancho completo anclado justo debajo del header (top-full) */
    <div
      className={`
        md:hidden absolute top-full left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${isOpen
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 -translate-y-3"
        }
      `}
      aria-hidden={!isOpen}
      inert={!isOpen}
      id="mobile-menu"
    >
      <div className="w-full bg-shopheader/90   shadow-2xl  overflow-hidden">
        {/* Encabezado del menú */}
        

        {/* Opciones */}
        <nav className="px-2 py-3 pb-5 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={close}
              className={({ isActive }) =>
                `
                  group flex items-center gap-4 px-4 py-3.5 rounded-xl
                  transition-all duration-200
                  ${isActive
                  ? "bg-shoprimary text-white shadow-md"
                  : "text-shopheader-foreground hover:bg-white/10 hover:text-white dark:hover:bg-blue-900 dark:hover:text-white"
                }
                `
              }
            >
              <Icon icon={link.icon} className="text-xl shrink-0" />

              <span className="flex-1 font-semibold text-sm">
                {link.name}
              </span>

              
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
