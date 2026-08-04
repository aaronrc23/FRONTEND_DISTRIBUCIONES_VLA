import { useModal } from '../../../../shared/hooks/useModal';
import { Modal } from '../../../../shared/ui';
import FrmInventario from '../../Inventario/components/form/FrmInventario';
import FrmMovimiento from '../../Inventario/components/form/FrmMovimiento';

export default function MdInventario() {
    const modaladd = useModal("md-addInv")
    const modalmov = useModal("md-movInv")


    return (
        <div>
            <Modal
                isOpen={modaladd.isOpen}
                onClose={modaladd.close}
                position="top"
                className="pt-6 "

            >
                <FrmInventario onClose={modaladd.close} />

            </Modal>
            <Modal isOpen={modalmov.isOpen} onClose={modalmov.close} position="top" className="pt-6 ">
                <FrmMovimiento onClose={modalmov.close} />
            </Modal>
        </div>
    )
}
