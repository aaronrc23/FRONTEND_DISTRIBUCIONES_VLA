import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from "react";

const PanelRouter = lazy(() => import("./PanelRouter"));
const RouterStore = lazy(() => import("./RouterStore"));

export default function Rutas() {
    return (
        <Routes>
            <Route path="/*" element={<Suspense fallback={null}>
                <RouterStore />
            </Suspense>} />
            <Route path="/panel/*" element={<Suspense fallback={null}>
                <PanelRouter />
            </Suspense>} />
        </Routes>
    )
}
