import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import { useAuth } from "../contexts/AuthContext";
import NotFound from "../pages/NotFound";
import { PaymentProvider } from "../contexts/PaymentContext";

export const routes = {
    HOME: "/home",
    LOGIN: "/login",
    NOT_FOUND: "/404"
}

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (localStorage.getItem("user")) {
        return children;
    }
    return isAuthenticated ? children : <Navigate to={routes.LOGIN} />;
};

const PublicRoute = ({ children }) => {
    if (localStorage.getItem("user")) {
        return <Navigate to={routes.HOME} replace />;
    }
    return children;
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={routes.HOME} replace />} />
                <Route path={routes.LOGIN} element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
                />
                <Route path={routes.NOT_FOUND} element={<NotFound />} />
                <Route
                    path={routes.HOME}
                    element={
                        <PrivateRoute>
                            <PaymentProvider>
                                <Home />
                            </PaymentProvider>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to={routes.NOT_FOUND} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;