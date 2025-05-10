import { Navigate, Outlet } from "react-router"
import { useTokenStore } from "@/store/useTokenStore"
import useUserStore from "@/store/useUserStore"

const ProtectedRoute = () => {
    const token = useTokenStore()?.token
    const { username, role } = useUserStore()

    const isAuthenticated = Boolean(token && username && role)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
