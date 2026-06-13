import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { Drawer } from "@/shared/ui/drawer";
import { useMobileMenuStore } from "../../common/store/menuStore";
import { useCartStore } from "../../common/store/cartStore";
import { useModal } from "@/shared/hooks/useModal";
import TapeRoll from "@/shared/components/icons/TapeRoll";

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
  const items = useCartStore((state) => state.items);

  const modalCart = useModal("md-carrito");

 
  return (
    <Drawer
      open={isOpen}
      onClose={close}
      position="right"
      width="320px"
      showOverlay
      closeOnOverlayClick
      clscontent=" px-0"
      className="
        backdrop-blur-3xl
        border-l
        border-border/10
        shadow-2xl
      "
    >
      <div className="flex h-full flex-col">
        {/* HEADER */}

        {/* NAV */}
        <div className="pt-18">


          <nav className="space-y-0">
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
                  px-6
                  py-4
                  transition-all
                  duration-300

                  ${isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-accent text-foreground"
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      icon={link.icon}
                      className={`text-xl ${isActive
                        ? "text-primary-foreground"
                        : "text-primary"
                        }`}
                    />

                    <span className="flex-1  font-medium">
                      {link.name}
                    </span>

                   
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* FOOTER */}
        <div className="mt-auto px-6 py-6">
          <div className="border-t border-border/10 pt-5">
            <p className="text-center text-lg font-bold mb-4">
              Síguenos
            </p>

            <div className="flex justify-center gap-5">
              <a href="#">
                <Icon
                  icon="ri:facebook-fill"
                  className="text-2xl hover:scale-110 transition"
                />
              </a>

              <a href="#">
                <Icon
                  icon="ri:instagram-line"
                  className="text-2xl hover:scale-110 transition"
                />
              </a>

              <a href="#">
                <Icon
                  icon="ri:tiktok-fill"
                  className="text-2xl hover:scale-110 transition"
                />
              </a>

              <a href="#">
                <Icon
                  icon="ri:whatsapp-fill"
                  className="text-2xl hover:scale-110 transition"
                />
              </a>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-5">
              © {new Date().getFullYear()} VLA E.I.R.L
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}