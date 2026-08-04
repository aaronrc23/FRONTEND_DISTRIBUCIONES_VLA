import { useQuery } from "@tanstack/react-query"
import { listDashboard } from "../services/DashboardService"


export const listDash = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: listDashboard,
        refetchOnWindowFocus: false,
    })
}