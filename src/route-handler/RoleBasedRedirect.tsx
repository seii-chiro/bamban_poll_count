import { Navigate } from "react-router"

const RoleBasedRedirect = () => {
    const role = "Administrator"

    switch (role) {
        case "Administrator":
            return <Navigate to="/admin" replace />
        case "Candidate":
            return <Navigate to="/candidate" replace />
        case "LeadPollWatcher":
            return <Navigate to="/lead-poll-watcher" replace />
        case "LegalOfficer":
            return <Navigate to="/legal-officer" replace />
        case "PollWatcher":
            return <Navigate to="/poll-watcher" replace />
        case "SuperAdministrator":
            return <Navigate to="/superadmin" replace />
        default:
            return <Navigate to="/login" replace />
    }
}

export default RoleBasedRedirect;
