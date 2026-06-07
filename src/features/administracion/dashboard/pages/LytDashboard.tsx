
import {
    Package,
    Warehouse,
    AlertTriangle,
    ArrowLeftRight,
} from "lucide-react";
import { Button, Card, Texto } from "@/shared/ui";
import Tablemin from "@/shared/components/organisms/Tablemin";
import ColumnsMovInv from "../../common/utils/ColumnsMovInv";
import { listDash } from "../../common/hooks/useViewDashboard";



export default function LytDashboard() {

    const { data } = listDash();
    const movimientos = data?.data.movimientos_semana || [];
    const resumen = data?.data.resumen;
    const productosCriticos = data?.data.productos_criticos || [];
    const stats = [
        {
            title: "Total Productos",
            value: resumen?.total_productos || 0,
            icon: Package,
        },
        {
            title: "Stock Bajo",
            value: resumen?.stock_bajo || 0,
            icon: AlertTriangle,
        },
        {
            title: "Almacenes",
            value: resumen?.numero_almacenes || 0,
            icon: Warehouse,
        },
        {
            title: "Movimientos Hoy",
            value: resumen?.movimientos_hoy || 0,
            icon: ArrowLeftRight,
        },
    ];

    return (
        <div className="min-h-screen bg-background p-4 text-foreground transition-colors duration-300 ">


            <div className="relative  space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Texto className="text-3xl font-semibold tracking-tight md:text-4xl">
                            Dashboard Inventario
                        </Texto>
                        <Texto className="mt-1 text-sm text-secondary-foreground ">
                            Control general del sistema de Distribuciones VLA.
                        </Texto>
                    </div>


                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <Card
                                key={index}
                                className="group overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-shadow-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {item.title}
                                        </p>

                                        <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                                            {item.value}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon size={22} />
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
                    {/* Left */}
                    <div className="space-y-6">
                        {/* Overview */}


                        {/* Table */}
                        <Card className="rounded-3xl border border-border/50  p-6  shadow-2xl shadow-black/5 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <Texto className="text-lg font-semibold ">
                                        Últimos Movimientos
                                    </Texto>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Entradas y salidas recientes.
                                    </p>
                                </div>

                                <Button variant="indigo">
                                    Ver todos
                                </Button>
                            </div>
                            <Tablemin columns={ColumnsMovInv()} data={movimientos || []} responsiveMode="scroll" />
                        </Card>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        {/* Critical stock */}
                        <Card className="p-6  ">
                            <div className="flex items-center justify-between">
                                <div>
                                     <Texto className="text-lg font-semibold ">
                                        Stock Crítico
                                    </Texto>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Productos por debajo del mínimo.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-error-20 text-texterror-20 p-3">
                                    <AlertTriangle size={20} />
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                {productosCriticos.map((item: any) => {
                                    // const porcentaje = Math.min(
                                    //     (item.stock_actual / item.stock_minimo) * 100,
                                    //     100
                                    // );

                                    return (
                                        <div
                                            key={item.inventario_id}
                                            className="group rounded-3xl border border-border/60 bg-accent/30 p-4 transition-all duration-300 hover:border-red-300 hover:shadow-lg"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">


                                                        <div className="min-w-0">
                                                            <h3 className="truncate text-sm font-semibold text-foreground">
                                                                {item.producto?.nombre}
                                                            </h3>

                                                            <p className="mt-1 text-xs font-medium text-muted-foreground">
                                                                {item.almacen?.nombre}
                                                            </p>
                                                        </div>
                                                    </div>



                                                </div>

                                                <div className="flex flex-col items-end">
                                                    <span className="rounded-full bg-destructive/20 px-3 py-1 text-xs font-semibold text-destructive">
                                                        {item.stock_actual} und.
                                                    </span>


                                                    <div className="rounded-xl mt-2 text-destructive flex items-center justify-center gap-1">
                                                        <AlertTriangle size={12} />
                                                        <Texto className="font-bold text-xs text-destructive">Stock crítico</Texto>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>




                    </div>
                </div>
            </div >
        </div >
    );
}
