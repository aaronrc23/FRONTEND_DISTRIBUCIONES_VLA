import { Modal } from '../../../../shared/ui'
import { useModal } from '../../../../shared/hooks/useModal';
import { Plus } from 'lucide-react';
import FrmAddAlmacen from '../../almacenes/components/forms/FrmAddAlmacen';

export default function MdAlmacen() {
    const mdadd = useModal("md-add-almacen");
    return (
        <div><Modal isOpen={mdadd.isOpen} onClose={() => mdadd.close()} title="Nueva Almacen" position="top" className="md:w-[500px]" icon={<Plus />} >
            <FrmAddAlmacen onClose={() => mdadd.close()} />
        </Modal></div>
    )
}
