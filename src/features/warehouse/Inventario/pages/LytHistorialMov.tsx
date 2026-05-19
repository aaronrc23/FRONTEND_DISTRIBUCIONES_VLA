import TablePlant from '@/shared/components/organisms/TablePlant'
import PlantCrud from '@/shared/components/templates/PlantCrud'
import { useHistorialMovimientos } from '../../common/hooks/useCrudMov'
import ColumnsHistorial from '../../common/utils/ColumnsHistorial';


export default function LytHistorialMov() {
    const { data } = useHistorialMovimientos();
    return (
        <div className=" h-full w-full">
            <PlantCrud title="Historial de Movimientos" header={
                < div className="flex gap-2">
                </div>} >

                <div className="pt-4">
                    {data && (
                        <TablePlant
                            columns={ColumnsHistorial()}
                            data={data || []}
                            placeholder="Buscar producto... "
                        />
                    )}
                </div>
            </PlantCrud>


        </div>
    )
}
