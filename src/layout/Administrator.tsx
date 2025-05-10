import { FaUsers, FaUserCheck, FaVoteYea, FaUserClock, FaChartPie, FaUserShield } from "react-icons/fa";

const Administrator = () => {
    const cardData = [
        { title: "Total No. of Precincts", value: 10234, icon: <FaUsers size={30} />, bg: "#51A434" },
        { title: "Total No. of Voters", value: 8743, icon: <FaVoteYea size={30} />, bg: "#275316" },
        { title: "Total No. of Poll Watchers", value: 1491, icon: <FaUserClock size={30} />, bg: "#51A434" },
        { title: "Percentage of Votes Counted", value: 9800, icon: <FaUserCheck size={30} />, bg: "#275316" },
        { title: "Total Uploadeds/Submissions", value: 250, icon: <FaChartPie size={30} />, bg: "#51A434" },
        { title: "No. of Voters who Voted", value: 12, icon: <FaUserShield size={30} />, bg: "#275316" },
        { title: "No. of Ballots Casted", value: 12, icon: <FaUserShield size={30} />, bg: "#51A434" },
        { title: "percentage of Ballots Casted", value: 12, icon: <FaUserShield size={30} />, bg: "#275316" },
    ];

    const sampleResults = [
        { candidate: "Candidate A", percent: 55, votes: 5678 },
        { candidate: "Candidate B", percent: 35, votes: 4567 },
        { candidate: "Candidate C", percent: 10, votes: 2345 },
    ];

    const totalVotes = sampleResults.reduce((sum, item) => sum + item.votes, 0);
    const totalPercent = sampleResults.reduce((sum, item) => sum + item.percent, 0);

    return (
        <div className="space-y-4 md:space-y-6 p-4 md:px-20 md:py-10">
            <h1 className="text-[#275316] text-3xl font-bold">Dashboard</h1>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {cardData.map((card, index) => (
                <div
                    key={index}
                    className="rounded-xl text-white shadow-lg py-8 px-4 md:px-10 flex items-center justify-between transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: card.bg }}
                >
                    <div>
                    <div className="text-sm md:text-[16px] font-medium uppercase tracking-wide opacity-80">{card.title}</div>
                    <div className="text-3xl font-bold">{card.value}</div>
                    </div>
                    <div className="opacity-90">{card.icon}</div>
                </div>
                ))}
            </div>

            {/* Tables */}
            <div className="mt-10">
                <h1 className="my-2 text-lg md:text-2xl font-bold text-[#333]">Current Standing</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Table 1 */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xs border border-gray-300">
                        <h3 className="font-semibold mb-4 text-lg">Sample Table 1</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="bg-[#51A434] text-white">
                                <tr>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Rank</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Candidate</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Percent</th>
                                    <th className="px-4 py-3 cursor-pointer">Votes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sampleResults.map((item, index) => (
                                    <tr key={index} className=" hover:bg-[#D9F2D0]">
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{index + 1}</td>
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{item.candidate}</td>
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{item.percent || '-'}</td>
                                    <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">{item.votes}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-[#275316] text-white font-semibold">
                                        <td colSpan={2} className="px-2 py-3 border-r border-b border-gray-300 font-bold text-right">Total</td>
                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{totalPercent}%</td>
                                        <td className="px-4 py-3 border-b border-gray-300  font-semibold text-center">{totalVotes}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Table 2 */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xs border border-gray-300">
                        <h3 className="font-semibold mb-4 text-lg">Sample Table 2</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="bg-[#51A434] text-white">
                                <tr>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Rank</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Candidate</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Percent</th>
                                    <th className="px-4 py-2 cursor-pointer">Votes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sampleResults.map((item, index) => (
                                    <tr key={index} className="hover:bg-[#D9F2D0]">
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{index + 1}</td>
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{item.candidate}</td>
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{item.percent || '-'}</td>
                                    <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">{item.votes}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-[#275316] text-white font-semibold">
                                        <td colSpan={2} className="px-2 py-3 border-r border-b border-gray-300 font-bold text-right">Total</td>
                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{totalPercent}%</td>
                                        <td className="px-4 py-3 border-b border-gray-300  font-semibold text-center">{totalVotes}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Table 3 */}
            <div className="mt-10">
                <h1 className="my-2 text-lg md:text-2xl font-bold text-[#333]">Last 10 Poll Watchers `Submissions</h1>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xs border border-gray-300">
                    <h3 className="font-semibold mb-4 text-lg">Sample Table 3</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-[#51A434] text-white">
                            <tr>
                                <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Rank</th>
                                <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Candidate</th>
                                <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Percent</th>
                                <th className="px-4 py-2 cursor-pointer">Votes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sampleResults.map((item, index) => (
                                <tr key={index} className="hover:bg-[#D9F2D0]">
                                <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{index + 1}</td>
                                <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{item.candidate}</td>
                                <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{item.percent || '-'}</td>
                                <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">{item.votes}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-[#275316] text-white font-semibold">
                                    <td colSpan={2} className="px-2 py-3 border-r border-b border-gray-300 font-bold text-right">Total</td>
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">{totalPercent}%</td>
                                    <td className="px-4 py-3 border-b border-gray-300  font-semibold text-center">{totalVotes}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
                
        </div>
    );
};

export default Administrator;
