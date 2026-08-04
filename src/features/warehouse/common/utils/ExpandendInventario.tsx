import { Badge, Card, Texto } from '@/shared/ui'
import { Icon } from '@iconify-icon/react'


export default function ExpandendInventario({ row }: any) {
    return (
        <div className="p-4 pl-6 bg-card  border-t border-border  w-full gap-4">
            <div className="flex gap-4">

                {row.almacenes?.map((item: any) => (
                    <Card
                        key={item.inventario_id}
                        className=" rounded-xl  p-4 flex gap-6 items-center justify-between"
                    >
                        <div className="space-y-1">
                            <div className='flex gap-2 justify-center items-center'>
                                <div className='bg-secondary/90 text-secondary-foreground rounded-lg w-7 h-7 flex justify-center items-center'>
                                    <Icon icon="mdi:warehouse" className="text-base" />
                                </div>

                                <Texto className="font-medium">
                                    {item.almacen}
                                </Texto>
                            </div>


                            <Badge
                                visual="flat"
                                size="sm"
                                color={
                                    item.tipo === "FISICO"
                                        ? "info"
                                        : "warning"
                                }
                            >
                                {item.tipo}
                            </Badge>
                        </div>

                        <div className="text-right">
                            <Texto className="text-sm text-muted-foreground">
                                Stock
                            </Texto>

                            <Texto className="font-bold text-lg">
                                {item.stock}
                            </Texto>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
