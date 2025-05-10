import { Navigate, Outlet } from "react-router"
import { useTokenStore } from "@/store/useTokenStore"
import useUserStore from "@/store/useUserStore"
import { type ReactNode } from "react"

type ProtectedRouteProps = {
    allowedRoles?: string[]
    children?: ReactNode
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    const token = useTokenStore()?.token
    const { username, role } = useUserStore()

    const isAuthenticated = Boolean(token && username && role)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(role ?? "")) {
        return <Navigate to="/app" replace />
    }

    return children ?? <Outlet />
}

export default ProtectedRoute
