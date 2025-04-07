import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function UserGuard() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
