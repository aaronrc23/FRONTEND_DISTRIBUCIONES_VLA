import TapeRoll from '@/shared/components/icons/TapeRoll'
import { Texto } from '../../../shared/ui'
import FrmLogin from '../components/forms/FrmLogin'
import HeaderLogin from '../components/login/HeaderLogin'



export default function LoginPanel() {
    return (
        <div className="relative flex h-full w-full overflow-hidden bg-[#0d1426]">

            {/* ── Panel izquierdo ── */}
            <div className="relative hidden lg:flex flex-1 flex-col justify-center p-12 overflow-hidden">

                {/* Orbes de fondo */}
                {/* <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl" /> */}

                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "linear-gradient(#10b981 1px,transparent 1px),linear-gradient(90deg,#10b981 1px,transparent 1px)", backgroundSize: "48px 48px" }}>
                </div>

                <div className="relative z-10  flex justify-center flex-col items-center">
                    {/* Logo */}
                    <div className="mb-5 flex items-center gap-3">
                        <div className="relative mb-2">
                            <div className="absolute inset-0 scale-150 rounded-2xl bg-emerald-500/15 blur-2xl" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl   ">
                                <TapeRoll color='green' size='lg'  animated={true} />
                            </div>
                        </div>

                    </div>

                    {/* Titular */}
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white">
                        Distribuciones
                        <span className="text-emerald-400 text-3xl"> VLA E.I.R.L.</span>
                    </h1>
                    <p className="mb-10 text-base leading-relaxed text-slate-500">
                        Accede a tu panel corporativo con la máxima <br /> seguridad y control de acceso.
                    </p>

                    <div className="flex gap-3 mt-2 ">
                        {["Acceso seguro", "Cifrado SSL", "2FA disponible"].map((t) => (
                            <span key={t}
                                className={`text-xs px-3 py-1 rounded-full bg-emerald-700/20 border font-medium border-emerald-400/40 text-emerald-400  "
                            `}>{t}
                            </span>
                        ))}
                    </div>
                </div>


            </div>

            {/* ── Panel derecho (formulario) ── */}
            <div className="relative flex w-full shrink-0 flex-col items-center justify-center bg-card lg:w-150 border-l border-white/5">


                <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />

                <div className="w-full px-5 max-w-xl  sm:px-15 py-12">
                    <HeaderLogin />
                    <FrmLogin />
                    <Texto variant="mutedmin" className="mt-8 block text-center text-slate-700">
                        © {new Date().getFullYear()} Panel interno • Acceso restringido
                    </Texto>
                </div>
            </div>
        </div>
    )
}