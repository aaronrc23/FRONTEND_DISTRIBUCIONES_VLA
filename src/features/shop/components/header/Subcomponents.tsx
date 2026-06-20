import TapeRoll from "../../../../shared/components/icons/TapeRoll";



interface LogoProps {
    onClick: () => void;
    dark?: boolean;
}

export function Logo({ onClick, dark = false }: LogoProps) {
    return (
        <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className="flex items-center gap-3 group shrink-0 select-none"
            aria-label="Ir al inicio"
        >
            <div className="hidden sm:block">
                <TapeRoll animated={true} dark={dark} />
            </div>


            <div className="flex flex-col leading-tight">
                <span className={`font-bold  text-xl  ${dark ? "text-shopheader-foreground" : "text-yellow-300"}`}>
                    DISTRIBUCCIONES
                </span>

                <div className="flex gap-2 font-bold text-xl items-center leading-tight">
                    <span className={` ${dark ? "text-[#F18F01]" : "text-yellow-50"}`}>VLA</span>
                    <span className={` ${dark ? "text-shopheader-foreground " : "text-white"}`}>E.I.R.L</span>
                </div>
            </div>
        </a>
    );
}

