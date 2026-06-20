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
      icon="mdi:menu"
    >
      <div className="flex h-full flex-col">
        {/* NAV */}
        <nav className="space-y-1 px-4 pt-4">
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
                  ? "bg-blue-900 text-white shadow-md"
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

        {/* FOOTER */}
        <div className="mt-auto px-6 py-6">
          <div className="border-t border-slate-100 pt-6">
            <p className="text-center text-sm font-bold text-slate-800 mb-4">
              Síguenos
            </p>

            <div className="flex justify-center gap-5">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-all duration-200">
                <Icon icon="ri:facebook-fill" className="text-lg" />
              </a>

              <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-all duration-200">
                <Icon icon="ri:instagram-line" className="text-lg" />
              </a>

              <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-all duration-200">
                <Icon icon="ri:tiktok-fill" className="text-lg" />
              </a>

              <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-all duration-200">
                <Icon icon="ri:whatsapp-fill" className="text-lg" />
              </a>
            </div>

            <p className="text-center text-xs text-slate-400 mt-6">
              © {new Date().getFullYear()} VLA E.I.R.L
            </p>
          </div>
        </div>
      </div>
    </ShopDrawer>
  );
}