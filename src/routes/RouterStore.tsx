import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../features/shop/pages/Home'
import ProductDetail from '../features/shop/components/productos/ProductDetails'
import StoreLayout from '../features/shop/components/StoreLayout'

export default function RouterStore() {
    return (
        <Routes>
            <Route element={<StoreLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
            </Route>
        </Routes>
    )
}
