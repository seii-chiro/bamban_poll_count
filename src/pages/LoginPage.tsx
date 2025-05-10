import useUserStore from "@/store/useUserStore"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const LoginPage = () => {
    const navigate = useNavigate()
    const { username, role } = useUserStore()

    useEffect(() => {
        if (!username || !role) return

        switch (role) {
            case "admin":
            case "superadmin":
            case "candidate":
            case "pollwatcher":
            case "leadpollwatcher":
            case "legalofficer":
                navigate(`/app/${role}`, { replace: true })
                break
            default:
                toast.error("No valid role provided. Please contact your system admin.")
        }
    }, [username, role, navigate])

    return (
        <div>
            <button>Login</button>
        </div>
    )
}

export default LoginPage