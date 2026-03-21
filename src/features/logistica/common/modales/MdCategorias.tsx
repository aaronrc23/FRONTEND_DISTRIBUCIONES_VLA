
import { useCatStore } from '../store/useCatStore';
import { Plus } from 'lucide-react';

import { useModal } from '../../../../shared/hooks/useModal';
import FrmAddCategorias from '../../categorias/components/forms/FrmAddCategorias';
import FrmEditCategorias from '../../categorias/components/forms/FrmEditCategoria';
import { Modal } from '../../../../shared/ui';

export default function MdCategorias() {
    const modal = useModal("md-categorias");
    const modalEdit = useModal("md-cat-edit");
    const { info } = useCatStore();
    return (
        <div>
            <Modal isOpen={modal.isOpen} onClose={() => modal.close()} title="Nueva Categoria" position="top" className="md:w-[500px]" icon={<Plus />} preventCloseOnOverlay={true} >
                <FrmAddCategorias />
            </Modal>
            <Modal isOpen={modalEdit.isOpen} onClose={() => modalEdit.close()} title="Editar Categoria" position="top" className="md:w-[500px]" icon={<Plus />} preventCloseOnOverlay={true} >
                <FrmEditCategorias info={info ?? {}} />
            </Modal>
        </div>
    )
}