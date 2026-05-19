import { useModal } from "@/shared/hooks/useModal";
import { Modal } from "@/shared/ui";
import FrmAddMarcas from "../../marcas/components/forms/FrmAddMarcas";
import { useMarcasStore } from "../store/useMarcarstore";
import FrmEditMarcas from "../../marcas/components/forms/FrmEditMarcas";
import { Plus } from "lucide-react";


export default function MdMarcas() {
    const modal = useModal("md-marcas-add");
    const modalEdit = useModal("md-marcas-edit");
    const { info } = useMarcasStore();
    return (
        <div>
            <Modal isOpen={modal.isOpen} onClose={() => modal.close()} title="Nueva Marca" position="top" className="md:w-125" icon={<Plus />}  >
                <FrmAddMarcas />
            </Modal>
            <Modal isOpen={modalEdit.isOpen} onClose={() => modalEdit.close()} title="Editar Marca" position="top" className="md:w-125" icon={<Plus />}  >
                <FrmEditMarcas info={info ?? {}} onClose={() => modalEdit.close()} />
            </Modal>
        </div>
    )
}