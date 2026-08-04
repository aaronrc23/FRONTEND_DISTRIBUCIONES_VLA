import { v } from "@/styles/variables";
import TapeRoll from "../../../../shared/components/icons/TapeRoll";



interface LogoProps {
    onClick: () => void;
    dark?: boolean;
}

export function Logo({ onClick, dark = false }: LogoProps) {
    return (
        <a
            href="#hero"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className="flex items-center gap-2 shrink-0"
            aria-label="Ir al inicio"
        >
            {/* TapeRoll */}
            <div className="hidden sm:flex shrink-0 items-center justify-center">
                <TapeRoll animated dark={dark} />
            </div>

            {/* Logo + texto */}
            <div className="flex flex-col justify-center leading-none">
                <img
                    src={v.logo}
                    alt="Logo"
                    className="h-8 w-auto object-contain shrink-0"
                />

                <span
                    className={`text-sm font-medium ${dark
                            ? "text-shopheader-foreground"
                            : "text-white"
                        }`}
                >
                    Distribuciones
                </span>
            </div>
        </a>
    );
}
