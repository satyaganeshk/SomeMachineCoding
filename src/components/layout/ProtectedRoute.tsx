
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const currentRole = localStorage.getItem("currentRole");

    // Navigate keeps this a client-side route change instead of reloading the app.
    if (!currentRole) {
        return <Navigate to="/login" replace />;
    }

    // Outlet renders the child routes nested under this route.
    return <Outlet />;
};

export default ProtectedRoute;
