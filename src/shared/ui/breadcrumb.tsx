import { Link, useLocation, useParams } from "react-router-dom";

export default function Breadcrumb() {
    const location = useLocation();
    const params = useParams();

    const pathnames = location.pathname.split("/").filter(Boolean);

    const nameMap: Record<string, string> = {
        "": "Inicio",
        productos: "Productos",
        producto: "Producto",
    };

    return (
        <nav className="text-sm text-gray-500 mb-4">
            <ol className="flex items-center gap-2 flex-wrap">
                {/* Inicio */}
                <li>
                    <Link to="/" className="hover:text-gray-900">
                        Inicio
                    </Link>
                </li>

                {pathnames.map((segment, index) => {
                    const to = "/" + pathnames.slice(0, index + 1).join("/");
                    const isLast = index === pathnames.length - 1;

                    let name = nameMap[segment] || segment;

                    // 👇 Manejo de ruta dinámica /producto/:id
                    if (segment === params.id) {
                        name = `#${params.id}`; // luego puedes cambiarlo por nombre real
                    }

                    return (
                        <li key={to} className="flex items-center gap-2">
                            <span>/</span>

                            {isLast ? (
                                <span className="text-gray-900 font-medium">
                                    {name}
                                </span>
                            ) : (
                                <Link to={to} className="hover:text-gray-900">
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}