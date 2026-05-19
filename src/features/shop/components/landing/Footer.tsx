
export default function Footer() {
    return (
        <footer className="w-full bg-white py-4 flex justify-center items-center">
            {/* Sección principal */}
            {/* <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

  
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="text-slate-700 w-6 h-6" />
                        <h2 className="text-xl font-bold text-foreground/90 tracking-wide">Distribuciones Vla</h2>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">E.I.R.L</span>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Tu tienda de confianza con los mejores productos al mejor precio. Calidad garantizada en cada compra.
                    </p>

                    <div className="flex gap-3 mt-2">
                        <a href="#" className="bg-slate-300 hover:bg-slate-400 text-slate-700 p-2 rounded-full transition-colors">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" className="bg-slate-300 hover:bg-slate-400 text-slate-700 p-2 rounded-full transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="bg-slate-300 hover:bg-slate-400 text-slate-700 p-2 rounded-full transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>

    
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">Tienda</h3>
                    <div className="w-8 h-0.5 bg-slate-400" />
                    <ul className="flex flex-col gap-2 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Todos los productos</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Ofertas del día</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Nuevos ingresos</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Más vendidos</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Categorías</a></li>
                    </ul>
                </div>

          
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">Ayuda</h3>
                    <div className="w-8 h-0.5 bg-slate-400" />
                    <ul className="flex flex-col gap-2 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Cómo comprar</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Seguimiento de pedido</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Devoluciones</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Preguntas frecuentes</a></li>
                        <li><a href="#" className="hover:text-slate-900 hover:underline transition-colors">Términos y condiciones</a></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">Contacto</h3>
                    <div className="w-8 h-0.5 bg-slate-400" />
                    <ul className="flex flex-col gap-3 text-sm text-slate-500">
                        <li className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                            <span>Av. Principal 123, Lima, Perú</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4 shrink-0 text-slate-500" />
                            <a href="tel:+51999999999" className="hover:text-slate-900 transition-colors">+51 999 999 999</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 shrink-0 text-slate-500" />
                            <a href="mailto:contacto@vla.com" className="hover:text-slate-900 transition-colors">contacto@vla.com</a>
                        </li>
                    </ul>
                </div>

            </div> */}

            {/* Barra inferior */}
            <div className=" pb-20 md:pb-2">
                <div className="w-full justify-center items-center gap-2 flex flex-col text-xs sm:text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Distribuciones Vla E.I.R.L. Todos los derechos reservados.</p>

                </div>
            </div>

        </footer>
    );
}
