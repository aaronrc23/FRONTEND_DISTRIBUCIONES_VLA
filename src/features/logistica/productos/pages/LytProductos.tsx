
import { listarProd } from '../../common/hooks/useCrudProd';
import PlantCrud from '../../../../shared/components/templates/PlantCrud';
import { Button } from '../../../../shared/ui';
import TablePlant from '../../../../shared/components/organisms/TablePlant';
import ColumnsProd from '../../categorias/utils/ColumnsProd';
import MdProductos from '../../common/modales/MdProductos';
import { Icon } from '@iconify-icon/react';
import { useNavigate } from 'react-router-dom';

export default function LytProductos() {
    // const userDrawer = useModal("md-productos");
    const navigate = useNavigate();
    const { data } = listarProd();
    return (
        <div className=" h-full w-full">
            <PlantCrud title="Productos" header={<Button onClick={() => navigate("/panel/add-productos")} className="cursor-pointer" variant={"success"}><Icon icon="mdi:plus" className="text-xl" />  Nuevo Producto</Button>} >
                <div className="py-4">
                    <TablePlant columns={ColumnsProd()} data={data || []} placeholder="Buscar Producto por nombre o codigo " />
                </div>
            </PlantCrud>
            <MdProductos />
        </div>
    )
}
