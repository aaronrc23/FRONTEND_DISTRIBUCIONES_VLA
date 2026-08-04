import { Modal } from '../../../../shared/ui'
import { useModal } from '../../../../shared/hooks/useModal';
import { Plus } from 'lucide-react';
import FrmAddAlmacen from '../../almacenes/components/forms/FrmAddAlmacen';
import FrmEditAlmacen from '../../almacenes/components/forms/FrmEditAlmacen';
import { useAlmacenStore } from '../store/useAlmacenStore';

export default function MdAlmacen() {
    const mdadd = useModal("md-add-almacen");
    const mdedit = useModal("md-editAlm");
    const { data } = useAlmacenStore();
    return (
        <div>
            <Modal isOpen={mdadd.isOpen} onClose={() => mdadd.close()} title="Nueva Almacen" position="top" className="md:w-125" icon={<Plus />} >
                <FrmAddAlmacen onClose={() => mdadd.close()} />
            </Modal>
            <Modal isOpen={mdedit.isOpen} onClose={() => mdedit.close()} title="Editar Almacen" position="top" className="md:w-125" >
                <FrmEditAlmacen onClose={() => mdedit.close()} data={data} />
            </Modal>
        </div>
    )
}
