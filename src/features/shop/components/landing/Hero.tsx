
import { useNavigate } from 'react-router-dom';

import Image from '../../../../shared/ui/image';
import { Texto } from '../../../../shared/ui';
import { Button } from "@ui/button";

export default function Hero() {

    const navigate = useNavigate();
    const handleProductos = () => {
        navigate('/productos');
    };
    return (
        <section
            id="inicio"
            className="relative w-full h-[50vh] sm:h-[70vh]    flex items-center justify-center overflow-hidden">

            <Image
                src="images/banner/banner-800.webp"
                srcSet="
                        /images/banner/banner-800.webp 800w,
                        /images/banner/banner-1200.webp 1200w
                    "
                sizes="100vw"
                alt="Hero"
                priority
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover"


            />

            <div className="absolute inset-0 h-full w-full bg-linear-to-r from-blue-900/40 via-blue-900/50 to-blue-900/50" />

            <div className="absolute inset-0 w-full flex flex-col items-center justify-center text-center gap-4 sm:gap-6 px-4">

                <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-full backdrop-blur-md">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                    <span className="text-orange-100 text-xs font-bold uppercase tracking-widest">
                        Distribución Segura y Puntual en Todo el Perú
                    </span>
                </div>

                <Texto className="hidden sm:block text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                    Distribuciones
                    <span className="ml-4 text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
                        VLA EIRL
                    </span>
                </Texto>

                <Texto className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                    Especialistas en cintas de empaque y materiales logísticos. Protege tus envíos con nuestra calidad superior y asegura que tu negocio nunca se detenga.
                </Texto>

                <Button onClick={handleProductos} size="lg" variant="brand">
                    Explorar Productos
                </Button>

            </div>
        </section>
    );
}
