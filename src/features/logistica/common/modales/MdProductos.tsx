import { useModal } from '../../../../shared/hooks/useModal';
import { useProductStore } from '../store/useProductStore';
import { Drawer } from '../../../../shared/ui/drawer';
import FrmaddProductos from '../../productos/components/forms/FrmaddProductos';
import FrmEditProductos from '../../productos/components/forms/FrmEditProductos';

export default function MdProductos() {
    const modal = useModal("md-productos");
    const modaledit = useModal("md-edit-producto");
    const { data } = useProductStore();
    return (
        <div><Drawer
            open={modal.isOpen}
            onClose={() => modal.close()}
            title="Nuevo Producto"
            icon="flat-color-icons:plus"
        >
            <FrmaddProductos onClose={() => modal.close()} />
        </Drawer>
            <Drawer
                title='Editar Producto'
                open={modaledit.isOpen}
                onClose={() => modaledit.close()}>
                <FrmEditProductos onClose={() => modaledit.close()} data={data} />
            </Drawer>
        </div>
    )
}

