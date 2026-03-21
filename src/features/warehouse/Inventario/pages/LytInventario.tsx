import { useModal } from '../../../../shared/hooks/useModal';
import PlantCrud from '../../../../shared/components/templates/PlantCrud';
import { Button } from '../../../../shared/ui';
import TablePlant from '../../../../shared/components/organisms/TablePlant';
import { ColumnsInventario } from '../../common/utils/ColumnsInventario';
import { useInventario } from '../../common/hooks/useCrudInventario';
import MdInventario from '../../common/modales/MdInventario';
import { Icon } from '@iconify-icon/react';

export default function LytInventario() {
    const { data } = useInventario();
    const modaladd = useModal("md-addInv")

    return (
        <div className=" h-full w-full">
            <PlantCrud title="Inventario" header={<Button className="cursor-pointer" onClick={() => modaladd.open()}><Icon icon="mdi:plus" className="text-xl" /> Registrar</Button>} >
                <div className="pt-4">
                    {data && <TablePlant columns={ColumnsInventario()} data={data || []} placeholder="Buscar producto... " />}
                </div>
            </PlantCrud>
            <MdInventario />
        </div>
    )
}
