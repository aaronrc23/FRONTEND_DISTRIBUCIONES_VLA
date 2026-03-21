import { Icon } from "@iconify-icon/react";
import TablePlant from "../../../../shared/components/organisms/TablePlant";
import PlantCrud from "../../../../shared/components/templates/PlantCrud";
import { useModal } from "../../../../shared/hooks/useModal";
import { Button } from "../../../../shared/ui";
import { useAlmacen } from "../../common/hooks/useCrudAlmacen";
import MdAlmacen from "../../common/modales/MdAlmacen";
import ColumnsAlmacen from "../../common/utils/ColumnsAlmacen";

export default function LytAlmacenes() {
    const { data } = useAlmacen();
    const mdadd = useModal("md-add-almacen");
    return (

        <div className=" h-full w-full">
            <PlantCrud title="Almacenes" header={<Button variant="primary" onClick={() => mdadd.open("empleado")}><Icon icon="mdi:plus" className="text-xl" />  Nuevo Almacen</Button>} >
                <div className="py-4">
                    <TablePlant columns={ColumnsAlmacen()} data={data || []} placeholder="Buscar empleado ... " filtrosctn={true} />
                </div>
            </PlantCrud>

            <MdAlmacen />
        </div >
    )
}
