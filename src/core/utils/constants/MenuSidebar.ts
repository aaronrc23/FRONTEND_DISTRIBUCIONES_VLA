export const menusid = [
    {
        label: "Panel de Control",
        icon: "material-symbols:dashboard-rounded",
        path: "/dashboard",
    },
  
    {
        label: "Logística",
        icon: "solar:box-linear",
        children: [
            { label: "Productos", path: "/panel/productos" },
            { label: "Categorías", path: "/panel/categorias" },
            { label: "Almacenes", path: "/panel/almacenes" }
        ],
    },
    {
        label: "Inventario",
        icon: "solar:box-linear",
        path: "/panel/inventario",
    },
    {
        label: "Administracion",
        icon: "tabler:settings",
        children: [
            { label: "Empleados", path: "/panel/empleados" },
        ],
    },


]
