import { useModal } from '../../../../shared/hooks/useModal';
import PlantCrud from '../../../../shared/components/templates/PlantCrud';
import TablePlant from '../../../../shared/components/organisms/TablePlant';
import { Button } from '../../../../shared/ui';
import { Icon } from '@iconify-icon/react';
import { ListEmpleador } from '../../common/hooks/useCrudEmpleados';
import ColumnsEmpleado from '../utils/ColumnsEmpleado';
import MdEmpleados from '../../common/modales/MdEmpleados';

export default function LytEmpleados() {

    const { data } = ListEmpleador();
    const userDrawer = useModal("drawer-empleado");
    return (
        <div className=" h-full w-full">
            <PlantCrud title="Empleados" header={<Button variant="primary" onClick={() => userDrawer.open("empleado")}><Icon icon="mdi:plus" className="text-xl" />  Nuevo Empleado</Button>} >
                <div className="py-4">
                    <TablePlant columns={ColumnsEmpleado()} data={data || []} placeholder="Buscar empleado ... " filtrosctn={true} />
                </div>
            </PlantCrud>
            <MdEmpleados />
        </div>
    )
}
