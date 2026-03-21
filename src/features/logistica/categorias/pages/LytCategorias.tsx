import { Icon } from "@iconify-icon/react";
import TablePlant from "../../../../shared/components/organisms/TablePlant";
import PlantCrud from "../../../../shared/components/templates/PlantCrud";
import { useModal } from "../../../../shared/hooks/useModal";
import { Button } from "../../../../shared/ui";
import { listarCat } from "../../common/hooks/useCrudCat";
import ColumnsCat from "../../common/utils/ColumnsCat";
import MdCategorias from "../../common/modales/MdCategorias";


export default function LytCategorias() {
    const { data } = listarCat();
    const userDrawer = useModal("md-categorias");
    return (
        <div className=" h-full w-full">
            <PlantCrud title="Categorias" header={<Button onClick={() => userDrawer.open("categorias")} variant={"success"}><Icon icon="mdi:plus" className="text-xl" />  Nueva Categoria</Button>} >
                <div className="py-4">
                    <TablePlant columns={ColumnsCat()} data={data || []} placeholder="Buscar Empleado por nombre o email " />
                </div>
                        
            </PlantCrud>
            <MdCategorias />
        </div>
    )
}
