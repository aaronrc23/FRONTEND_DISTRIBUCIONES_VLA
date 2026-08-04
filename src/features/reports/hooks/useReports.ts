import { useQuery } from "@tanstack/react-query";
import { listProductos } from "../../logistica/common/services/ProductService";
import { listInventario } from "../../warehouse/common/services/inventarioservice";
import { listDashboard } from "../../administracion/common/services/DashboardService";
import { listmovimientos } from "../../warehouse/common/services/movservice";

export const useReportProductos = () => {
  return useQuery({
    queryKey: ["reporteProductos"],
    queryFn: listProductos,
    refetchOnWindowFocus: false,
  });
};

export const useReportInventario = () => {
  return useQuery({
    queryKey: ["reporteInventario"],
    queryFn: listInventario,
    refetchOnWindowFocus: false,
  });
};

export const useReportDashboard = () => {
  return useQuery({
    queryKey: ["reporteDashboard"],
    queryFn: listDashboard,
    refetchOnWindowFocus: false,
  });
};

export const useReportMovimientos = () => {
  return useQuery({
    queryKey: ["reporteMovimientos"],
    queryFn: listmovimientos,
    refetchOnWindowFocus: false,
  });
};
