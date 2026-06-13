import TapeRoll from "../../../../shared/components/icons/TapeRoll";



interface LogoProps {
    onClick: () => void;
}

export function Logo({ onClick }: LogoProps) {
    return (
        <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className="flex items-center gap-3 group shrink-0 select-none"
            aria-label="Ir al inicio"
        >
            <div className="hidden sm:block">
                <TapeRoll animated={true} />
            </div>


            <div className="flex flex-col leading-tight">
                <span className="text-base md:text-xl font-extrabold text-yellow-300">
                    DISTRIBUCIONES
                </span>

                <div className="flex gap-2 text-md items-center">
                    <span className=" font-bold text-yellow-50">VLA</span>
                    <span className=" font-bold text-white">E.I.R.L</span>
                </div>
            </div>
        </a>
    );
}

