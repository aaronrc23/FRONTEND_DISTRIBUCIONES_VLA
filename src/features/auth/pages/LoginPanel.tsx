import { Texto } from '../../../shared/ui'
import FrmLogin from '../components/forms/FrmLogin'
import HeaderLogin from '../components/login/HeaderLogin'


export default function LoginPanel() {
    return (
        <div className="relative flex items-center justify-center h-full w-full bg-background dark:bg-[#0f172a] ">
            {/* <div className="absolute w-full h-full inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" /> */}
            <div
                className="
    absolute inset-0 w-full h-full pointer-events-none
    opacity-40
    dark:bg-[radial-gradient(#334155_1px,transparent_1px)]
    dark:bg-[length:32px_32px]
  "
            />
            <div className="w-full max-w-md text-center ">
                <div className="bg-card dark:bg-[#1e293b]/40 backdrop-blur-xl p-8 px-2 md:p-12 rounded-[2.5rem] shadow-2xl md:max-w-md w-full border border-white/5 flex flex-col items-center">
                    <HeaderLogin />
                    <FrmLogin />
                </div>
                <Texto variant="mutedmin" className="mt-6" > © {new Date().getFullYear()} Panel interno • Acceso restringido</Texto>
            </div>



        </div>
    )
}
