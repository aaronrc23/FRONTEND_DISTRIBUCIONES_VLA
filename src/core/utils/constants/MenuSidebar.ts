export const menusid = [
    {
        label: "Panel de Control",
        icon: "material-symbols:dashboard-rounded",
        path: "/panel/dashboard",
    },

    {
        label: "Logística",
        icon: "solar:box-linear",
        children: [
            { label: "Productos", path: "/panel/productos" },
            { label: "Categorías", path: "/panel/categorias" },
            { label: "Almacenes", path: "/panel/almacenes" },
            { label: "Marcas", path: "/panel/marcas" },
        ],
    },
    {
        label: "Inventario",
        icon: "mdi:form",
        path: "/panel/inventario",
    },
    {
        label: "Historial de Movimientos",
        icon: "mdi:history",
        path: "/panel/historial_movimientos",
    },
    {
        label: "Administracion",
        icon: "tabler:settings",
        children: [
            { label: "Empleados", path: "/panel/empleados" },
        ],
    },


]
