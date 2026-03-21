import { Route, Routes } from 'react-router-dom'
import PanelRouter from './PanelRouter'

export default function Rutas() {
    return (
        <Routes>
            {/* <Route path="/*" element={<RouterStore />} /> */}
            <Route path="/panel/*" element={<PanelRouter />} />
        </Routes>
    )
}
