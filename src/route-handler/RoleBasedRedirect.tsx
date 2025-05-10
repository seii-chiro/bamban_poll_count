import useUserStore from "@/store/useUserStore"
import { Navigate } from "react-router"

const RoleBasedRedirect = () => {
    const role = useUserStore()?.role

    switch (role) {
        case "admin":
            return <Navigate to="/admin" replace />
        case "candidate":
            return <Navigate to="/candidate" replace />
        case "leadpollwatcher":
            return <Navigate to="/lead-poll-watcher" replace />
        case "legalofficer":
            return <Navigate to="/legal-officer" replace />
        case "pollwatcher":
            return <Navigate to="/poll-watcher" replace />
        case "superadmin":
            return <Navigate to="/superadmin" replace />
        default:
            return <Navigate to="/login" replace />
    }
}

export default RoleBasedRedirect;
