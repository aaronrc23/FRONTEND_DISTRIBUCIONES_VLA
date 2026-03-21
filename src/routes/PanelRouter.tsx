import { Route, Routes } from 'react-router-dom'
import LoginPanel from '../features/auth/pages/LoginPanel'
import ProtectedRoutePanel from '../shared/middleware/panel/ProtectedRoutePanel'
import PlantPanel from '../shared/components/templates/PlantPanel'
import LytCategorias from '../features/logistica/categorias/pages/LytCategorias'
import LytEmpleados from '../features/administracion/empleados/pages/LytEmpleados'
import LytProductos from '../features/logistica/productos/pages/LytProductos'
import LytAlmacenes from '../features/warehouse/almacenes/page/LytAlmacenes'
import LytInventario from '../features/warehouse/Inventario/pages/LytInventario'
import Home from '../features/shop/pages/Home'


export default function PanelRouter() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPanel />} />
            <Route element={<ProtectedRoutePanel />}>
                <Route element={<PlantPanel />}>
                    {/* RUTA PRINCIPAL */}
                    <Route index element={<h1>Dashboard</h1>} />
                    <Route path="categorias" element={<LytCategorias />} />

                    {/* RUTAS HIJAS → VAN AL OUTLET */}
                    <Route path="empleados" element={<LytEmpleados />} />
                    <Route path="productos" element={<LytProductos />} />
                    <Route path="almacenes" element={<LytAlmacenes />} />
                    <Route path="inventario" element={<LytInventario />} />
                   
                    {/* <Route path="sucursales" element={<LytSucursal />} />
                    <Route path="sucursales/series" element={<LytSeries />} />
                   
                    <Route path="categorias" element={<LytCategorias />} />
                    <Route path="almacenes" element={<LytAlmacenes />} /> */}
                    {/* <Route path="categorias" element={<LytCategorias />} />
                    <Route path="productos" element={<LytProductos />} />
                    
                     */}
                </Route>
            </Route>
            <Route path="*" element={<h1>404 Panel</h1>} />
        </Routes >
    )
}
