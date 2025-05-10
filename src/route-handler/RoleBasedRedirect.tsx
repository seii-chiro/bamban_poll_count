import { Navigate } from "react-router";
import useUserStore from "@/store/useUserStore";
import { useTokenStore } from "@/store/useTokenStore";

const RoleBasedRedirect = () => {
    const { role } = useUserStore();
    const { token } = useTokenStore();

    // If there's no token or role, redirect to login
    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }

    // Role-based redirection
    switch (role) {
        case "admin":
            return <Navigate to="/app/admin" replace />;
        case "candidate":
            return <Navigate to="/app/candidate" replace />;
        case "leadpollwatcher":
            return <Navigate to="/app/lead-poll-watcher" replace />;
        case "legalofficer":
            return <Navigate to="/app/legal-officer" replace />;
        case "poll-watcher":
            return <Navigate to="/app/poll-watcher" replace />;
        case "superadmin":
            return <Navigate to="/app/superadmin" replace />;
        default:
            return <Navigate to="/app/login" replace />;
    }
};

export default RoleBasedRedirect;
