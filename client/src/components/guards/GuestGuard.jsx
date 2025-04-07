import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function GuestGuard() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
