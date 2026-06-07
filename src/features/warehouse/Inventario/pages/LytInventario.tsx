import { useModal } from '../../../../shared/hooks/useModal';
import PlantCrud from '../../../../shared/components/templates/PlantCrud';
import { Button } from '../../../../shared/ui';
import TablePlant from '../../../../shared/components/organisms/TablePlant';
import { ColumnsInventario, ColumnsVisible } from '../../common/utils/ColumnsInventario';
import { useInventario } from '../../common/hooks/useCrudInventario';
import MdInventario from '../../common/modales/MdInventario';
import { Icon } from '@iconify-icon/react';
import UpCircleOutlinedIcon from '@iconify-react/ant-design/up-circle-outlined';
import ExpandendInventario from '../../common/utils/ExpandendInventario';

export default function LytInventario() {
    const { data } = useInventario();
    const modaladd = useModal("md-addInv")
    const modalmov = useModal("md-movInv")

    return (
        <div className=" h-full w-full">
            <PlantCrud title="Inventario" header={
                < div className="flex gap-2">

                    <Button className="cursor-pointer" onClick={() => modaladd.open()}><UpCircleOutlinedIcon className="text-xl" />Registrar</Button>
                    <Button className="cursor-pointer" onClick={() => modalmov.open()}><Icon icon="mdi:plus" className="text-xl" />Movimiento </Button>
                </div>} >

                <div className="pt-4 px-4">
                    {data && <TablePlant columns={ColumnsInventario()} data={data || []} placeholder="Buscar producto... "
                        mobileVisibleColumns={ColumnsVisible}
                        renderExpandedRow={(row) => (
                            <ExpandendInventario row={row} />
                        )} />}
                </div>
            </PlantCrud>
            <MdInventario />
        </div >
    )
}
