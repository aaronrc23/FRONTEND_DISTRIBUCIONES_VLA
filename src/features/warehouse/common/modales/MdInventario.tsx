import CustomTabs from '../../../../shared/components/molecules/CustomTabs';
import { useModal } from '../../../../shared/hooks/useModal';
import { Modal } from '../../../../shared/ui';
import FrmInventario from '../../Inventario/components/form/FrmInventario';

export default function MdInventario() {
    const modaladd = useModal("md-addInv")
    const tabs = [
        {
            value: "general",
            label: "Ingreso",
            content: <FrmInventario onClose={modaladd.close} mode="Entrada" />
        },
        {
            value: "usuarios",
            label: "Salida",
            content: <FrmInventario onClose={modaladd.close} mode="Salida" />
        }
    ];

    return (
        <div>
            <Modal
                isOpen={modaladd.isOpen}
                onClose={modaladd.close}
                position="top"
                className="pt-6"
            >
                <CustomTabs tabs={tabs} defaultValue="general" className="w-auto" />

            </Modal>
        </div>
    )
}
