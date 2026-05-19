import { Icon } from '@iconify-icon/react';
import { Texto } from '../../../../shared/ui'
import { useCategoryShop } from '../../common/hooks/useConsultas';
import Image from '@/shared/ui/image';
import EmptyState from '@/shared/components/shop/landing/EmptyState';
import Loading from '@/shared/ui/loading';


export default function NuestrosProductos() {
    const { data, isLoading, isError } = useCategoryShop();

    if (isLoading) {
        return (
            <section className="py-16 px-6 text-center">
                <Loading mensaje="Cargando productos..."  />
            </section>
        );
    }

    if (!data || data.length === 0) {
        return (
            <section className="py-16 px-6 bg-white">
                <EmptyState
                    icon="mdi:package-variant-remove"
                    title="No hay productos disponibles"
                    description="Pronto agregaremos nuevos productos para ti 🚀"
                />
            </section>
        );
    }

    return (
        <section className="py-16 px-6 bg-white ">
            <div className='flex flex-col justify-center items-center mb-10 gap-2'>
                <Texto className="text-3xl sm:text-4xl font-bold text-blue-900 text-center">
                    Nuestros Productos
                </Texto>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">

                {data.map((cat: any, index: number) => (
                    <article key={index} className="group relative rounded-sm shadow-sm overflow-hidden">

                        <div className="relative aspect-auto sm:aspect-square">
                            {cat.imagen ? (
                                <>
                                    <Image
                                        src={cat.imagen}
                                        alt={cat.categoria}
                                        priority={true}
                                        className="transition-transform duration-500 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-blue-500/20" />
                                </>
                            ) : (
                                <div className="w-full h-50 sm:h-full flex items-center justify-center bg-gray-100">
                                    <Icon icon="material-symbols:grid-on" className="text-4xl text-gray-400" />
                                </div>
                            )}
                        </div>

                        <div className="p-4 absolute inset-0 flex flex-col items-center justify-end">
                            <h3 className={`font-semibold ${cat.imagen ? "text-white" : "text-shopforeground"}`}>
                                {cat.categoria}
                            </h3>
                        </div>

                    </article>
                ))}

            </div>
        </section>
    );
}