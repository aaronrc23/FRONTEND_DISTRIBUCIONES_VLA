import TablePlant from "@/shared/components/organisms/TablePlant";
import PlantCrud from "@/shared/components/templates/PlantCrud";
import { Button } from "@/shared/ui";
import ColumnsMarcas from "../../common/utils/ColumnsMarcs";
import { uselistarMarcas } from "../../common/hooks/useCrudMarcas";
import { Icon } from "@iconify-icon/react";
import { useModal } from "@/shared/hooks/useModal";
import MdMarcas from "../../common/modales/MdMarcas";

export default function LytMarcas() {
    const { data } = uselistarMarcas();
    const modaladd = useModal("md-marcas-add");
    return (
        <div className=" h-full w-full">
            <PlantCrud title="Marcas" header={<Button className="cursor-pointer" onClick={() => modaladd.open()}><Icon icon="mdi:plus" className="text-xl" /> Registrar</Button>} >
                <div className="pt-4">
                    <TablePlant columns={ColumnsMarcas()} data={data || []} placeholder="Buscar Marcas... " />
                </div>
            </PlantCrud>
            <MdMarcas />

        </div>
    )
}
