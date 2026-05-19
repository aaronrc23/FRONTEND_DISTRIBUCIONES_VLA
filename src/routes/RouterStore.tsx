import { Route, Routes } from 'react-router-dom'
import Home from '../features/shop/pages/Home'
import ProductDetail from '../features/shop/components/productos/ProductDetails'
import StoreLayout from '../features/shop/components/StoreLayout'
import LytLanding from '../features/shop/components/landing/LytLanding'

export default function RouterStore() {
    return (
        <Routes>

            <Route element={<StoreLayout />}>
                <Route path="/" element={<LytLanding />} />
                <Route path="/catalogo" element={<Home />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path='/*' element={<LytLanding />} />
            </Route>
        </Routes>
    )
}
