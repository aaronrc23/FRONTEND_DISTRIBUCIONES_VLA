import { Route, Routes } from 'react-router-dom'
import PanelRouter from './PanelRouter'
import RouterStore from './RouterStore'

export default function Rutas() {
    return (
        <Routes>
            <Route path="/*" element={<RouterStore />} />
            <Route path="/panel/*" element={<PanelRouter />} />
        </Routes>
    )
}
