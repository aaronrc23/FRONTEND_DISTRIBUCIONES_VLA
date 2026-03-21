
import { Icon } from '@iconify-icon/react';
import FrmAddEmpleado from '../../empleados/components/form/FrmAddEmpleado';
import FrmEditEmpleado from '../../empleados/components/form/FrmEditEmpleado';
import FrmAddPermisos from '../../empleados/components/form/FrmAddPermisos';
import { useModal } from '../../../../shared/hooks/useModal';
import { useEmpStore } from '../store/Empstore';
import { Texto } from '../../../../shared/ui';
import { Drawer } from '../../../../shared/ui/drawer';
import DrTitle from '../../../../shared/components/atoms/DrTitle';


export default function MdEmpleados() {
    const modal = useModal("drawer-empleado");
    const modalEdit = useModal("drawer-empedit");
    const modalPermisos = useModal("dr-permisos");
    const { data } = useEmpStore();
    return (
        <div>
            <Drawer
                open={modal.isOpen}
                onClose={() => modal.close()}
                position="right"
                width="380px"
            >
                <div className='flex items-center gap-1 py-5'>
                    <Icon icon="typcn:plus" className='text-2xl' />
                    <Texto variant="message" weight={'bold'} >Nuevo Empleado</Texto>
                </div>
                <FrmAddEmpleado />
            </Drawer>
            <Drawer
                open={modalEdit.isOpen}
                onClose={() => modalEdit.close()}
                position="right"
                width="380px"
            >
                <DrTitle icon='typcn:edit' title='Editar Empleado' />
                <FrmEditEmpleado data={data ?? []} onClose={() => modalEdit.close()} />
            </Drawer>

            <Drawer
                open={modalPermisos.isOpen}
                onClose={() => modalPermisos.close()}
                position="right"
                icon='mdi:account-plus'
                title='Asignar Permisos'
                subtitle=' Selecciona los permisos por módulo'

            >

                <FrmAddPermisos datos={data ?? []} onClose={() => modalPermisos.close()} />
            </Drawer>
        </div>
    )
}
