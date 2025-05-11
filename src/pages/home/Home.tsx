import { useState } from "react";
import { NavLink } from "react-router";
import AdminSidebar from "../admin/components/AdminSidebar";
import statistics from '../../assets/Icon/dashboard.png';
import map from '../../assets/Icon/map.png';
import user from '../../assets/Icon/user.png';
import employee from '../../assets/Icon/employee.png';
import setting from '../../assets/Icon/settings.png';
import { FaBars } from "react-icons/fa";
import LogoutConfirmModal from "../poll-watcher/components/LogoutConfirm";
import { useTokenStore } from "@/store/useTokenStore";
import useUserStore from "@/store/useUserStore";

type Card = {
    id: number;
    title: string;
    image: string;
    path?: string;
};

const sampleCards: Card[] = [
    { id: 1, title: "Dashboard", image: statistics, path: "/app/admin" },
    { id: 2, title: "Map", image: map, path: "" },
    { id: 3, title: "Users", image: user, path: "" },
    { id: 4, title: "Roles", image: employee, path: "" },
    { id: 5, title: "Election Results", image: "", path: "" },
    { id: 6, title: "Settings", image: setting, path: "" },
    { id: 7, title: "Precincts", image: "https://via.placeholder.com/300x200", path: "" },
    { id: 8, title: "Contest", image: "https://via.placeholder.com/300x200", path: "" },
    { id: 9, title: "Parties", image: "https://via.placeholder.com/300x200", path: "" },
    { id: 10, title: "Candidates", image: "https://via.placeholder.com/300x200", path: "" },
    { id: 11, title: "Login Logs", image: "https://via.placeholder.com/300x200", path: "" },
    { id: 12, title: "Backup", image: "https://via.placeholder.com/300x200", path: "" },
    { id: 13, title: "Restore", image: "https://via.placeholder.com/300x200", path: "" },
    { id: 14, title: "My Account", image: "https://via.placeholder.com/300x200", path: "" },
];

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const clearToken = useTokenStore()?.resetToken;
    const clearUser = useUserStore()?.clearUser;
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCards = sampleCards.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    const logout = () => {
        clearToken()
        clearUser()
    }
    return (
        <div className="flex min-h-screen">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed top-4 left-4 z-50 text-white bg-[#275316] p-2 rounded-md shadow"
                >
                <FaBars size={20} />
            </button>
            {/* Sidebar */}
            <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
                <div className="p-4 md:p-8">
                    <div className="flex justify-end">
                        <div className="flex justify-end md:mx-20 mb-8">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full md:w-80 p-3 rounded-lg border border-[#275316] focus:ring focus:ring-[#4e8638] outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-full max-w-7xl md:mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10 mx-4 md:mx-20">
                            {filteredCards.map((card) => {
                                const CardContent = (
                                <div className="bg-white rounded-xl shadow-2xs border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-full h-36 flex items-center justify-center">
                                    <img src={card.image} alt={card.title} className="w-36 p-4 object-cover" />
                                    </div>
                                    <div className="px-4 py-2 bg-[#F0F8EC]">
                                    <h2 className="text-center font-semibold text-[#275316]">{card.title}</h2>
                                    </div>
                                </div>
                                );

                                return card.path ? (
                                    <NavLink
                                        key={card.id}
                                        to={card.path}
                                        className="no-underline hover:shadow-lg transition-shadow duration-300"
                                    >
                                        {CardContent}
                                    </NavLink>
                                ) : (
                                    <div
                                        key={card.id}
                                        className="opacity-50 cursor-not-allowed"
                                        title="No link available"
                                    >
                                        {CardContent}
                                    </div>
                                );
                            })}

                            {filteredCards.length === 0 && (
                                <p className="col-span-full text-center text-[#7030A0] font-semibold">No results found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <LogoutConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={logout}
            />
        </div>
    );
};

export default Home;
