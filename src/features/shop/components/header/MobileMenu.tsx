import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import ShopDrawer from "@/shared/ui/shopdrawer";
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
    icon: "material-symbols:grid-view-rounded",
  },
  {
    name: "Nosotros",
    path: "/nosotros",
    icon: "lucide:users",
  },
];

export default function MobileMenu() {
  const { isOpen, close } = useMobileMenuStore();

  return (
    <ShopDrawer
      open={isOpen}
      onClose={close}
      title="Menú"

    >
      <nav className="space-y-1 px-4 py-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={close}
            className={({ isActive }) =>
              `
                flex items-center
                gap-4
                px-4
                py-3.5
                rounded-xl
                transition-all
                duration-200
                ${isActive
                  ? "bg-shoprimary text-white shadow-md"
                  : "text-slate-700 hover:bg-blue-50 hover:text-blue-900"
                }
              `
            }
          >
            <Icon
              icon={link.icon}
              className="text-xl"
            />

            <span className="flex-1 font-semibold text-sm">
              {link.name}
            </span>

            <Icon
              icon="mdi:chevron-right"
              className="text-slate-300 text-lg"
            />
          </NavLink>
        ))}
      </nav>
    </ShopDrawer>
  );
}
