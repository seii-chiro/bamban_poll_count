import { useTokenStore } from "@/store/useTokenStore";
import useUserStore, { type Role } from "@/store/useUserStore"
import { BASE_URL } from "@/utils/url";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { FiEye, FiEyeOff } from "react-icons/fi";
import alert_logo from "@/assets/logo.png"

async function loginUser(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/api/user/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data?.detail ||
            data?.non_field_errors?.[0] ||
            'Login failed';
        throw new Error(errorMsg);
    }

    localStorage.setItem('token', data.token);
    return data;
}

async function getMe(token: string) {
    const response = await fetch(`${BASE_URL}/api/user/me/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    const userData = await response.json();
    return userData;
}

const LoginPage = () => {
    const navigate = useNavigate()
    const { email, role, setUser } = useUserStore()
    const setToken = useTokenStore()?.setToken
    const [showPassword, setShowPassword] = useState(false)
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    })
    // Add a flag to prevent navigation loop
    const [hasRedirected, setHasRedirected] = useState(false)

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ email, password }: { email: string; password: string }) => loginUser(email, password),
        onSuccess: async (data) => {
            setToken(data.token);
            const res = await getMe(data.token);

            // Get the first group as the role (if it exists)
            const role = res.groups?.[0] ?? null;

            setUser({
                id: res.id,
                email: res.email,
                firstName: res.first_name,
                lastName: res.last_name,
                role: role as Role,
            });

            if (role) toast.success(`Welcome ${res.first_name || res.email}!`);
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        loginMutation.mutate({
            email: userCredentials.email,
            password: userCredentials.password
        });
    };

    const handleInputChange = (e: { target: { id: string; value: string; }; }) => {
        const { id, value } = e.target;
        setUserCredentials(prev => ({
            ...prev,
            [id === 'user-id' ? 'email' : 'password']: value
        }));
    };

    useEffect(() => {
        // Only navigate if we have both username and role, and haven't redirected yet
        if (!email || !role || hasRedirected) return;

        switch (role) {
            case "admin":
            case "superadmin":
            case "candidate":
            case "poll-watcher":
            case "leadpollwatcher":
            case "legalofficer":
                setHasRedirected(true);
                navigate(`/app/${role}`, { replace: true });
                break;
            default:
                toast.error("No valid role provided. Please contact your system admin.");
        }
    }, [email, role, navigate, hasRedirected]);

    return (
        <div className="min-h-screen flex items-center justify-center p-2 lg:p-4 bg-gray-50 transition-all ease-in-out duration-200">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
                <div className="flex justify-center mb-6">
                    {/* Placeholder for logo */}
                    <div className="w-32 h-32  md:w-48 md:h-48 flex items-center justify-center">
                        <img src={alert_logo} alt="Tambuli Alert Logo" className="w-full transition-all ease-in-out duration-200" />
                    </div>
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Login to your account</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="user-id" className="block text-sm font-medium text-gray-700 text-balance">
                            User ID (Precinct No/Email Address)<span className="text-red-600">*</span>
                        </label>
                        <input
                            id="user-id"
                            type="text"
                            value={userCredentials.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#275317]"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password<span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={userCredentials.password}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#275317]"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ?
                                    <FiEye className="w-5 h-5" /> :
                                    <FiEyeOff className="w-5 h-5" />
                                }
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#275317] text-white py-2 px-4 rounded-md hover:bg-[#304229] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage