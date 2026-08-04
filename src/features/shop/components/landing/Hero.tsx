
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

                
                <Texto className=" text-3xl sm:text-4xl  md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Distribuciones
                    <span className="ml-4 text2 ">
                        VLA EIRL
                    </span>
                </Texto>

                <Texto className="text-sm text2 md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
                    Especialistas en cintas de empaque y materiales logísticos. Protege tus envíos con nuestra calidad superior y asegura que tu negocio nunca se detenga.
                </Texto>

                <Button onClick={handleProductos} size="lg" variant="brand" className="px-6 rounded-full">
                    Explorar Productos
                </Button>

            </div>
        </section>
    );
}
