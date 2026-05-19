import Image from "../../../../shared/ui/image";
import { v } from "../../../../styles/variables";


export default function Distribudores() {
    return (
        <div className="bg-white flex justify-center flex-col items-center gap-6 py-16">
            <h2 id="feature-title" className="text-3xl sm:text-4xl font-black text-red-500 leading-tight mb-5">
                Distribudores directos 
            </h2>
            <Image src={v.iconpegafan} alt="logos"  />
        </div>
    )
}
