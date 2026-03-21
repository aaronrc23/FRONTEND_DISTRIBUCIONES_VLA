
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStoreSession } from "../../../features/auth/store/useAuthStoreSession";

const ProtectedRoutePanel: React.FC = () => {
    const isAuth = useAuthStoreSession((s) => s.isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/panel/login" />;
};

export default ProtectedRoutePanel;