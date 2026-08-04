import { Icon } from "@iconify-icon/react";
import { useState, useMemo } from "react";
import { Package, AlertTriangle, Warehouse, ArrowLeftRight, FileSpreadsheet, ChevronDown, CalendarDays } from "lucide-react";
import CustomTabs from "@/shared/components/molecules/CustomTabs";
import TablePlant from "@/shared/components/organisms/TablePlant";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import Loading from "@/shared/ui/loading";
import { ColumnsReporteProductos, exportProductosColumns } from "../utils/ColumnsReporteProductos";
import { ColumnsReporteInventario, exportInventarioColumns } from "../utils/ColumnsReporteInventario";
import { ColumnsReporteStockCritico, exportStockCriticoColumns } from "../utils/ColumnsReporteStockCritico";
import { ColumnsReporteMovimientos, exportMovimientosColumns } from "../utils/ColumnsReporteMovimientos";
import { exportToExcel } from "../utils/exportExcel";
import {
  useReportProductos,
  useReportInventario,
  useReportDashboard,
  useReportMovimientos,
} from "../hooks/useReports";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { cn } from "@/lib/utils";

const statsConfig = [
  { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
  { icon: Warehouse, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: ArrowLeftRight, color: "text-violet-500", bg: "bg-violet-500/10" },
];

/* ── Botón dropdown para exportar ── */
function ExportDropdown({
  onExportFiltered,
  onExportAll,
  disabled,
}: {
  onExportFiltered: () => void;
  onExportAll: () => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className="relative shrink-0" ref={ref}>
      <Button
        className="cursor-pointer w-full md:w-auto justify-center gap-2"
        variant="success"
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <FileSpreadsheet className="text-lg" />
        Exportar Excel
        <ChevronDown className={cn("text-sm transition-transform", open && "rotate-180")} />
      </Button>
      {open && (
        <div className="absolute right-0 mt-1.5 z-50 w-full min-w-[200px] rounded-xl border border-border/60 bg-card shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden">
          <button
            onClick={() => { onExportFiltered(); setOpen(false); }}
            className="w-full px-4 py-2.5 text-sm text-left hover:bg-accent/50 transition-colors flex items-center gap-2.5"
          >
            <Icon icon="mdi:filter-check" className="text-base text-primary" />
            Exportar filtrados
          </button>
          <button
            onClick={() => { onExportAll(); setOpen(false); }}
            className="w-full px-4 py-2.5 text-sm text-left hover:bg-accent/50 transition-colors flex items-center gap-2.5 border-t border-border/40"
          >
            <Icon icon="mdi:file-document-multiple" className="text-base text-muted-foreground" />
            Exportar todo
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Extraer valores únicos de un array ── */
function uniqueValues<T>(arr: T[], accessor: (item: T) => string | undefined | null): string[] {
  const set = new Set<string>();
  arr.forEach((item) => {
    const val = accessor(item);
    if (val) set.add(val);
  });
  return Array.from(set).sort();
}

/* ── Filtro Select con label ── */
function FilterSelect({
  value,
  onValueChange,
  placeholder,
  options,
}: {
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  const isActive = value !== "";
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value ?? "")}> 
      <SelectTrigger
        className={cn(
          "w-full sm:w-[175px] h-9 text-sm rounded-lg border transition-all duration-200",
          isActive
            ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/5"
            : "border-border/60 hover:border-border hover:shadow-sm"
        )}
      >
        <span className="flex items-center gap-1.5 truncate">
          {isActive && (
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          )}
          <SelectValue placeholder={placeholder} />
        </span>
      </SelectTrigger>
      <SelectContent
        side="bottom"
        align="start"
        sideOffset={4}
        className={cn(
          "rounded-xl border-border/50 shadow-xl p-1",
          "w-[var(--anchor-width)] min-w-0 max-w-[90vw]"
        )}
      >
        <SelectItem
          value=""
          className="rounded-lg text-sm text-muted-foreground data-[highlighted]:bg-accent/50 data-[highlighted]:text-foreground"
        >
          {placeholder}
        </SelectItem>
        <div className="mx-2 my-1 h-px bg-border/40" />
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="rounded-lg text-sm data-[highlighted]:bg-accent/60 data-[highlighted]:text-foreground transition-colors"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* ── Filtro de rango de fechas ── */
function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
}) {
  const hasActive = !!(dateFrom || dateTo);
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 w-full sm:w-auto">
      {/* Fecha desde */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <CalendarDays className="size-3.5 shrink-0 text-muted-foreground/60" />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className={cn(
            "flex-1 sm:w-[145px] h-12 px-2.5 py-2 text-xs rounded-lg border bg-transparent transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            dateFrom
              ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/5 text-foreground"
              : "border-border/60 hover:border-border hover:shadow-sm text-muted-foreground"
          )}
          onFocus={(e) => e.target.showPicker?.()}
        />
        {hasActive && (
          <button
            onClick={() => { onDateFromChange(""); onDateToChange(""); }}
            className="hidden sm:flex items-center justify-center size-7 rounded-lg border border-dashed border-border/50 text-muted-foreground/60 hover:text-foreground hover:border-border transition-all shrink-0"
            title="Limpiar fechas"
          >
            <Icon icon="mdi:close" className="text-sm" />
          </button>
        )}
      </div>

      {/* Separador */}
      <span className="hidden sm:inline text-xs text-muted-foreground/60 select-none text-center">→</span>
      <span className="sm:hidden text-xs text-muted-foreground/60 select-none -my-1 text-center">— hasta —</span>

      {/* Fecha hasta */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <CalendarDays className="size-3.5 shrink-0 text-muted-foreground/60 sm:hidden" />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className={cn(
            "flex-1 sm:w-[145px] h-12 px-2.5 py-2 text-sm rounded-lg border bg-transparent transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            dateTo
              ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/5 text-foreground"
              : "border-border/60 hover:border-border hover:shadow-sm text-muted-foreground"
          )}
          onFocus={(e) => e.target.showPicker?.()}
        />
      </div>

      {/* Botón limpiar mobile (al final de todo) */}
      {hasActive && (
        <button
          onClick={() => { onDateFromChange(""); onDateToChange(""); }}
          className="flex sm:hidden items-center justify-center gap-1.5 w-full py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 border border-dashed border-border/50"
        >
          <Icon icon="mdi:close-circle-outline" className="text-sm" />
          Limpiar fechas
        </button>
      )}
    </div>
  );
}

export default function LytReport() {
  const [activeTab, setActiveTab] = useState("productos");

  /* ── Filtros por sección ── */
  // Productos
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroEstadoProducto, setFiltroEstadoProducto] = useState("");

  // Inventario
  const [filtroEstadoInv, setFiltroEstadoInv] = useState("");

  // Movimientos
  const [filtroTipoMov, setFiltroTipoMov] = useState("");
  const [filtroAlmacenMov, setFiltroAlmacenMov] = useState("");
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");

  const { data: productosData, isLoading: loadingProductos } = useReportProductos();
  const { data: inventarioData, isLoading: loadingInventario } = useReportInventario();
  const { data: dashboardData, isLoading: loadingDashboard } = useReportDashboard();
  const { data: movimientosData, isLoading: loadingMovimientos } = useReportMovimientos();

  const productos = Array.isArray(productosData) ? productosData : productosData?.data ?? [];
  const inventario = Array.isArray(inventarioData) ? inventarioData : inventarioData?.data ?? [];
  const movimientos = Array.isArray(movimientosData) ? movimientosData : movimientosData?.data ?? [];
  const productosCriticos = dashboardData?.data?.productos_criticos ?? [];
  const resumen = dashboardData?.data?.resumen;

  /* ── Valores únicos para filtros ── */
  const categorias = useMemo(() => uniqueValues(productos, (p: any) => p.categoria?.name), [productos]);
  const marcas = useMemo(() => uniqueValues(productos, (p: any) => p.marca?.name), [productos]);
  const tiposMov = useMemo(() => uniqueValues(movimientos, (m :any) => m.tipo), [movimientos]);
  const almacenesMov = useMemo(
    () => uniqueValues(movimientos, (m: any) => m.inventario?.almacen?.nombre || m.almacen_nombre),
    [movimientos]
  );

  /* ── Datos filtrados ── */
  const productosFiltrados = useMemo(() => {
    let filtered = [...productos];
    if (filtroCategoria) filtered = filtered.filter((p) => p.categoria?.name === filtroCategoria);
    if (filtroMarca) filtered = filtered.filter((p) => p.marca?.name === filtroMarca);
    if (filtroEstadoProducto === "activo") filtered = filtered.filter((p) => p.activo === true);
    if (filtroEstadoProducto === "inactivo") filtered = filtered.filter((p) => p.activo === false);
    return filtered;
  }, [productos, filtroCategoria, filtroMarca, filtroEstadoProducto]);

  const inventarioFiltrado = useMemo(() => {
    let filtered = [...inventario];
    if (filtroEstadoInv === "critico") filtered = filtered.filter((i) => i.stock_total <= i.min_stock);
    if (filtroEstadoInv === "normal") filtered = filtered.filter((i) => i.stock_total > i.min_stock);
    return filtered;
  }, [inventario, filtroEstadoInv]);

  const movimientosFiltrados = useMemo(() => {
    let filtered = [...movimientos];
    if (filtroTipoMov) filtered = filtered.filter((m) => m.tipo === filtroTipoMov);
    if (filtroAlmacenMov) {
      filtered = filtered.filter(
        (m) =>
          (m.inventario?.almacen?.nombre || m.almacen_nombre) === filtroAlmacenMov
      );
    }
    if (filtroFechaDesde || filtroFechaHasta) {
      filtered = filtered.filter((m) => {
        const fecha = new Date(m.created_at);
        const desde = filtroFechaDesde ? new Date(filtroFechaDesde) : null;
        const hasta = filtroFechaHasta ? new Date(filtroFechaHasta + "T23:59:59") : null;
        if (desde && fecha < desde) return false;
        if (hasta && fecha > hasta) return false;
        return true;
      });
    }
    return filtered;
  }, [movimientos, filtroTipoMov, filtroAlmacenMov, filtroFechaDesde, filtroFechaHasta]);

  const stats = [
    { label: "Total Productos", value: resumen?.total_productos ?? productos.length },
    { label: "Stock Crítico", value: resumen?.stock_bajo ?? productosCriticos.length },
    { label: "Almacenes", value: resumen?.numero_almacenes ?? "—" },
    { label: "Mov. Hoy", value: resumen?.movimientos_hoy ?? 0 },
  ];

  /* ── Exportar ── */
  const getCurrentFilteredData = () => {
    switch (activeTab) {
      case "productos": return productosFiltrados;
      case "inventario": return inventarioFiltrado;
      case "stock-critico": return productosCriticos;
      case "movimientos": return movimientosFiltrados;
      default: return [];
    }
  };

  const getCurrentAllData = () => {
    switch (activeTab) {
      case "productos": return productos;
      case "inventario": return inventario;
      case "stock-critico": return productosCriticos;
      case "movimientos": return movimientos;
      default: return [];
    }
  };

  const getCurrentExportColumns = () => {
    switch (activeTab) {
      case "productos": return exportProductosColumns;
      case "inventario": return exportInventarioColumns;
      case "stock-critico": return exportStockCriticoColumns;
      case "movimientos": return exportMovimientosColumns;
      default: return [];
    }
  };

  const handleExportFiltered = () => {
    const data = getCurrentFilteredData();
    const cols = getCurrentExportColumns();
    if (data.length === 0) return;
    exportToExcel(data, cols, `Reporte_${activeTab}_filtrado`);
  };

  const handleExportAll = () => {
    const data = getCurrentAllData();
    const cols = getCurrentExportColumns();
    if (data.length === 0) return;
    exportToExcel(data, cols, `Reporte_${activeTab}_completo`);
  };

  /* ── Verifica si hay filtros activos en la sección actual ── */
  const hasActiveFilters = () => {
    switch (activeTab) {
      case "productos":
        return !!(filtroCategoria || filtroMarca || filtroEstadoProducto);
      case "inventario":
        return !!filtroEstadoInv;
      case "movimientos":
        return !!(filtroTipoMov || filtroAlmacenMov || filtroFechaDesde || filtroFechaHasta);
      default:
        return false;
    }
  };

  /* ── Limpia todos los filtros de la sección actual ── */
  const clearFilters = () => {
    switch (activeTab) {
      case "productos":
        setFiltroCategoria("");
        setFiltroMarca("");
        setFiltroEstadoProducto("");
        break;
      case "inventario":
        setFiltroEstadoInv("");
        break;
      case "movimientos":
        setFiltroTipoMov("");
        setFiltroAlmacenMov("");
        setFiltroFechaDesde("");
        setFiltroFechaHasta("");
        break;
    }
  };

  /* ── Render filters bar ── */
  const renderFilters = () => {
    const filtersContent = () => {
      switch (activeTab) {
        case "productos":
          return (
            <>
              {categorias.length > 0 && (
                <FilterSelect
                  value={filtroCategoria}
                  onValueChange={setFiltroCategoria}
                  placeholder="Todas las categorías"
                  options={categorias.map((c) => ({ value: c, label: c }))}
                />
              )}
              {marcas.length > 0 && (
                <FilterSelect
                  value={filtroMarca}
                  onValueChange={setFiltroMarca}
                  placeholder="Todas las marcas"
                  options={marcas.map((m) => ({ value: m, label: m }))}
                />
              )}
              <FilterSelect
                value={filtroEstadoProducto}
                onValueChange={setFiltroEstadoProducto}
                placeholder="Todos los estados"
                options={[
                  { value: "activo", label: "Activo" },
                  { value: "inactivo", label: "Inactivo" },
                ]}
              />
            </>
          );

        case "inventario":
          return (
            <FilterSelect
              value={filtroEstadoInv}
              onValueChange={setFiltroEstadoInv}
              placeholder="Todos los estados"
              options={[
                { value: "critico", label: "Stock Crítico" },
                { value: "normal", label: "En Stock" },
              ]}
            />
          );

        case "movimientos":
          return (
            <>
              <DateRangeFilter
                dateFrom={filtroFechaDesde}
                dateTo={filtroFechaHasta}
                onDateFromChange={setFiltroFechaDesde}
                onDateToChange={setFiltroFechaHasta}
              />
              {tiposMov.length > 0 && (
                <FilterSelect
                  value={filtroTipoMov}
                  onValueChange={setFiltroTipoMov}
                  placeholder="Todos los tipos"
                  options={tiposMov.map((t) => ({ value: t, label: t }))}
                />
              )}
              {almacenesMov.length > 0 && (
                <FilterSelect
                  value={filtroAlmacenMov}
                  onValueChange={setFiltroAlmacenMov}
                  placeholder="Todos los almacenes"
                  options={almacenesMov.map((a) => ({ value: a, label: a }))}
                />
              )}
            </>
          );

        default:
          return null;
      }
    };

    // Stock crítico no tiene filtros
    if (activeTab === "stock-critico") return null;

    return (
      <div className="space-y-2 mb-3">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 w-full">
          {filtersContent()}
        </div>
        {/* Botón limpiar */}
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 border border-dashed border-border/50 hover:border-border"
          >
            <Icon icon="mdi:close-circle-outline" className="text-sm shrink-0" />
            <span>Limpiar todos los filtros</span>
          </button>
        )}
      </div>
    );
  };

  const renderTable = (
    columns: any,
    data: any[],
    placeholder: string,
    isLoading: boolean
  ) => {
    if (isLoading) return <div className="flex justify-center py-16"><Loading /></div>;
    if (!data?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Icon icon="mdi:file-document-outline" className="text-5xl mb-3 opacity-20" />
          <p className="text-sm font-medium">No hay datos disponibles</p>
        </div>
      );
    }
    return <TablePlant columns={columns} data={data} placeholder={placeholder} withCard={false} />;
  };

  const tabs = [
    {
      value: "productos",
      label: "📦 Productos",
      content: (
        <>
          {renderFilters()}
          {renderTable(
            ColumnsReporteProductos(),
            productosFiltrados,
            "Buscar producto por nombre o SKU...",
            loadingProductos
          )}
        </>
      ),
    },
    {
      value: "inventario",
      label: "📊 Inventario",
      content: (
        <>
          {renderFilters()}
          {renderTable(
            ColumnsReporteInventario(),
            inventarioFiltrado,
            "Buscar producto en inventario...",
            loadingInventario
          )}
        </>
      ),
    },
    {
      value: "stock-critico",
      label: "⚠️ Stock Crítico",
      content: renderTable(
        ColumnsReporteStockCritico(),
        productosCriticos,
        "Buscar producto crítico...",
        loadingDashboard
      ),
    },
    {
      value: "movimientos",
      label: "🔄 Movimientos",
      content: (
        <>
          {renderFilters()}
          {renderTable(
            ColumnsReporteMovimientos(),
            movimientosFiltrados,
            "Buscar movimiento...",
            loadingMovimientos
          )}
        </>
      ),
    },
  ];

  return (
    <div className="h-full w-full space-y-4 pb-6 px-3 md:px-4">
      {/* ── Header ── */}
      <div className="flex flex-col text-center md:text-start gap-3 md:flex-row md:items-center md:justify-between pt-1">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Reportes
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Visualiza, filtra y exporta información de tus productos, inventario y movimientos.
          </p>
        </div>
        <ExportDropdown
          onExportFiltered={handleExportFiltered}
          onExportAll={handleExportAll}
          disabled={
            (activeTab === "productos" && productos.length === 0) ||
            (activeTab === "inventario" && inventario.length === 0) ||
            (activeTab === "stock-critico" && productosCriticos.length === 0) ||
            (activeTab === "movimientos" && movimientos.length === 0)
          }
        />
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {stats.map((stat, i) => {
          const IconComp = statsConfig[i].icon;
          return (
            <Card
              key={i}
              className="p-2.5 md:p-4 bg-card border-border/40 shadow-lg hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-2.5 md:gap-3">
                <div className={`rounded-lg p-1.5 md:p-2 ${statsConfig[i].bg}`}>
                  <IconComp size={14} className={`md:w-4 md:h-4 ${statsConfig[i].color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-muted-foreground/70 uppercase tracking-wider truncate">
                    {stat.label}
                  </p>
                  <p className="text-base md:text-xl font-bold text-foreground leading-tight mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ── Tabs + Table ── */}
      <Card className="dark:border-none md:dark:bg-card dark:bg-transparent lg:shadow-sm overflow-visible">
        <div className="p-1.5 sm:p-3 md:p-4">
          <CustomTabs
            defaultValue="productos"
            variants="bordered"
            onValueChange={(value) => setActiveTab(value)}
            tabs={tabs}
          />
        </div>
      </Card>
    </div>
  );
}
