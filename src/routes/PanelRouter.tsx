import { Route, Routes } from 'react-router-dom'
import ProtectedRoutePanel from '../shared/middleware/panel/ProtectedRoutePanel'
import { lazy, Suspense } from "react";
import LytMarcas from '@/features/logistica/marcas/pages/LytMarcas';
import LytDashboard from '@/features/administracion/dashboard/pages/LytDashboard';
import LytHistorialMov from '@/features/warehouse/Inventario/pages/LytHistorialMov';
import LytReport from '@/features/reports/page/LytReport';

const LoginPanel = lazy(() => import('../features/auth/pages/LoginPanel'));
const LytCategorias = lazy(() => import('../features/logistica/categorias/pages/LytCategorias'));
const LytEmpleados = lazy(() => import('../features/administracion/empleados/pages/LytEmpleados'));
const LytProductos = lazy(() => import('../features/logistica/productos/pages/LytProductos'));
const LytAlmacenes = lazy(() => import('../features/warehouse/almacenes/page/LytAlmacenes'));
const LytInventario = lazy(() => import('../features/warehouse/Inventario/pages/LytInventario'));
const LytAddProductos = lazy(() => import('../features/logistica/productos/pages/LytAddProductos'));
const LytProfile = lazy(() => import('../features/administracion/perfil/pages/LytProfile'));
const PlantPanel = lazy(() => import('../shared/components/templates/PlantPanel'));
const LytBanners = lazy(() => import('@/features/shop/banners/pages/LytBanners'));
const LytFooterConfig = lazy(() => import('@/features/shop/footer/pages/LytFooterConfig'));
const LytEmpresa = lazy(() => import('@/features/administracion/empresa/pages/LytEmpresa'));

export default function PanelRouter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/login" element={<LoginPanel />} />
                <Route element={<ProtectedRoutePanel />}>
                    <Route element={<PlantPanel />}>
                        {/* RUTA PRINCIPAL */}
                        <Route index element={<LytDashboard />} />
                        <Route path="dashboard" element={<LytDashboard />} />
                        <Route path="categorias" element={<LytCategorias />} />

                        {/* RUTAS HIJAS → VAN AL OUTLET */}
                        <Route path="empleados" element={<LytEmpleados />} />
                        <Route path="productos" element={<LytProductos />} />
                        <Route path="add-productos" element={<LytAddProductos />} />
                        <Route path="almacenes" element={<LytAlmacenes />} />
                        <Route path="historial_movimientos" element={<LytHistorialMov />} />
                        <Route path="inventario" element={<LytInventario />} />
                        <Route path="marcas" element={<LytMarcas />} />
                        <Route path="perfil" element={<LytProfile />} />
                        <Route path="reportes" element={<LytReport />} />
                        <Route path="banners" element={<LytBanners />} />
                        <Route path="footer" element={<LytFooterConfig />} />
                        <Route path="empresa" element={<LytEmpresa />} />

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
        </Suspense>
    )
}
