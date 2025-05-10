import { useState } from "react";
import { NavLink } from "react-router";
import statistics from '../../assets/Icon/dashboard.png'
import map from '../../assets/Icon/map.png'
import user from '../../assets/Icon/user.png'
import roles from '../../assets/Icon/roles.png'

type Card = {
    id: number;
    title: string;
    image: string;
    path?: string; 
};

const sampleCards: Card[] = [
    { id: 1, title: "Dashboard", image: statistics, path: "/app/admin" },
    { id: 2, title: "Map", image: map, path: "/map" },
    { id: 3, title: "Users", image: "", path: "/users" },
    { id: 4, title: "Roles", image: "", path: "/roles" },
    { id: 5, title: "Election Results", image: "https://via.placeholder.com/300x200", path: "/results" },
    { id: 6, title: "Settings", image: "https://via.placeholder.com/300x200", path: "/settings" },
    { id: 7, title: "Precincts", image: "https://via.placeholder.com/300x200", path: "/precincts" },
    { id: 8, title: "Contest", image: "https://via.placeholder.com/300x200", path: "/contest" },
    { id: 9, title: "Parties", image: "https://via.placeholder.com/300x200", path: "/parties" },
    { id: 10, title: "Candidates", image: "https://via.placeholder.com/300x200", path: "/candidates" },
    { id: 11, title: "Login Logs", image: "https://via.placeholder.com/300x200", path: "/login-logs" },
    { id: 12, title: "Backup", image: "https://via.placeholder.com/300x200", path: "/backup" },
    { id: 13, title: "Restore", image: "https://via.placeholder.com/300x200", path: "/restore" },
    { id: 14, title: "My Account", image: "https://via.placeholder.com/300x200", path: "/account" },
];



const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCards = sampleCards.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="flex justify-end">
                <div className="flex justify-end md:mx-20 mb-8">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full md:w-80 p-3 rounded-lg border border-[#275316] outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full max-w-[100rem] md:mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10 mx-4 md:mx-20">
                {filteredCards.map((card) => {
                    const CardContent = (
                        <div className="bg-white rounded-xl shadow-2xs border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="w-full h-48 flex items-center justify-center">
                            <img src={card.image} alt={card.title} className="w-48 object-cover" />
                        </div>
                        <div className="p-4 bg-[#F0F8EC]">
                            <h2 className="text-lg font-semibold text-[#275316]">{card.title}</h2>
                        </div>
                        </div>
                    );

                    return card.path ? (
                        <NavLink key={card.id} to={card.path} className="no-underline">
                        {CardContent}
                        </NavLink>
                    ) : (
                        <div key={card.id}>{CardContent}</div>
                    );
                })}
                {filteredCards.length === 0 && (
                    <p className="col-span-full text-center text-[#7030A0] font-semibold">No results found.</p>
                )}
                </div>
            </div>
        </div>
    );
};

export default Home;
