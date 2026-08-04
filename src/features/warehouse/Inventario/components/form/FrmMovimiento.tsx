
import { FrSelect2 } from '@/shared/components/atoms/FR/FrSelect2';
import { Button, Texto } from '@/shared/ui'
import { useForm, type Resolver } from 'react-hook-form'
import Searchplant from '../plantillas/Searchplant';
import { SearchProductos } from '@/features/warehouse/common/services/referencialeservice';
import { FrTextarea } from '@/shared/components/atoms/FR/FrTextarea';
import {  TipoEntradaForm, TipoEntradaLabels } from '@/features/warehouse/common/utils/EnumTipoEntrada';
import { useAlmacen } from '@/features/warehouse/common/hooks/useCrudAlmacen';
import { movFormSchema, type MovFormValues } from '@/features/warehouse/common/validation/MovSchema';
import { showConfirmation } from '@/shared/hooks/useSwalert';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCrudInventario } from '@/features/warehouse/common/hooks/useCrudInventario';

export default function FrmMovimiento({ onClose }: { onClose: () => void }) {
  const forms = useForm<MovFormValues>({
    resolver: zodResolver(movFormSchema) as unknown as Resolver<MovFormValues>,
    defaultValues: {
      tipo: TipoEntradaForm.ENTRADA,
      
    },
  });

  const { data } = useAlmacen();
  const { movInv } = useCrudInventario({ forms, onClose });

  const tipoMovimiento = forms.watch("tipo");

  const onSubmit = async (data: MovFormValues) => {

    const confirm = await showConfirmation("Confirmar", "¿Estas seguro de registrar el movimiento?");
    if (!confirm) return;
    movInv.mutate(data);

  };
  const isTransferencia = tipoMovimiento === TipoEntradaForm.TRANSFERENCIA;

  const TextAlmacen =
    tipoMovimiento === TipoEntradaForm.SALIDA ||
      tipoMovimiento === TipoEntradaForm.VENTA
      ? "Almacén Origen *"
      : "Almacén Destino *";

  return (
    <div className='flex flex-col gap-4 w-full sm:min-w-lg'>
      <Texto className='font-bold text-xl tracking-tight text-center pb-2'>
        Registrar Movimiento
      </Texto>

      <form
        className='flex flex-col gap-4'
        onSubmit={forms.handleSubmit(onSubmit)}
      >
        <FrSelect2
          label="Tipo de Movimiento *"
          placeholder="Seleccione un tipo"
          name="tipo"
          control={forms.control}
          options={Object.values(TipoEntradaForm).map((item) => ({
            value: item,
            label: TipoEntradaLabels[item],
          })) || []}
        />

        {isTransferencia ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

            <FrSelect2
              label="Almacén Origen *"
              placeholder="Seleccione origen"
              name="almacen_origen_id"
              control={forms.control}
              options={
                data?.map((item: any) => ({
                  value: item.id.toString(),
                  label: item.nombre,
                })) || []
              }
            />

            <FrSelect2
              label="Almacén Destino *"
              placeholder="Seleccione destino"
              name="almacen_destino_id"
              control={forms.control}
              options={
                data?.map((item: any) => ({
                  value: item.id.toString(),
                  label: item.nombre,
                })) || []
              }
            />

          </div>
        ) : (
          <FrSelect2
            label={TextAlmacen}
            placeholder="Seleccione un almacén"
            name="almacen_id"
            control={forms.control}
            options={
              data?.map((item: any) => ({
                value: item.id.toString(),
                label: item.nombre,
              })) || []
            }
          />
        )}

        <Searchplant
          forms={forms}
          SearchProductos={SearchProductos}
          cantidad="cantidad"
          name="product_id" />

        <FrTextarea
          name="observaciones"
          label="Observaciones"
          control={forms.control}
        />

        <div>
          <Button
            type="submit"
            variant="indigo"
            className='w-full cursor-pointer'
          >
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
}
