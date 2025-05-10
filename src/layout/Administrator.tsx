import { getCandidate, getDashboardSummary } from "@/pages/admin/queries";
import LogoutConfirmModal from "@/pages/poll-watcher/components/LogoutConfirm";
import { useTokenStore } from "@/store/useTokenStore";
import useUserStore from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaUsers, FaUserCheck, FaVoteYea, FaUserClock, FaChartPie, FaUserShield } from "react-icons/fa";

const Administrator = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const clearToken = useTokenStore()?.resetToken
    const clearUser = useUserStore()?.clearUser
    const token = useTokenStore()?.token;
    
    const { data: dashboardSummary, isLoading: erLoading, isError: erError } = useQuery({
        queryKey: ["dashboard-summary"],
        queryFn: () => getDashboardSummary(token ?? ''),
        enabled: !!token,
    });

    const { data: candidates } = useQuery({
        queryKey: ["candidates"],
        queryFn: () => getCandidate(token ?? ''),
        enabled: !!token,
    });

    if (erLoading) return <div>Loading dashboard...</div>;
    if (erError) return <div>Error loading dashboard.</div>;

    const ballotsCasted = dashboardSummary?.total_no_ballots_casted || 0;    
    const votersVoted = (dashboardSummary?.total_no_voters_voted) || 0; 
    
    const totalVoters = dashboardSummary?.total_voters ?? 0;

    const percentage = totalVoters > 0
    ? ((ballotsCasted / totalVoters) * 100).toFixed(2)
    : "0.00";

    const votesPercentage = totalVoters > 0
    ? ((votersVoted / totalVoters) * 100).toFixed(2)
    : "0.00";


    const cardData = [
        { title: "Total No. of Precincts", value: dashboardSummary?.total_precincts || 0, icon: <FaUsers size={30} />, bg: "#51A434" },
        { title: "Total No. of Voters", value: totalVoters || 0, icon: <FaVoteYea size={30} />, bg: "#275316" },
        {
        title: "Total No. of Poll Watchers", value: dashboardSummary?.total_poll_watchers || 0,
        icon: <FaUserClock size={30} />,
        bg: "#51A434",
        },
        { title: "Percentage of Votes Counted", value: `${votesPercentage}%`, icon: <FaUserCheck size={30} />, bg: "#275316" },
        { title: "Total Uploadeds/Submissions", value: dashboardSummary?.total_poll_watchers || 0, icon: <FaChartPie size={30} />, bg: "#51A434" },// note: replace with the total submission
        { title: "No. of Voters who Voted", value: dashboardSummary?.total_no_voters_voted || 0, icon: <FaUserShield size={30} />, bg: "#275316" },
        { title: "No. of Ballots Casted", value: ballotsCasted, icon: <FaUserShield size={30} />, bg: "#51A434" },
        { title: "Percentage of Ballots Casted", value: `${percentage}%`, icon: <FaUserShield size={30} />, bg: "#275316" },
    ];

    const sampleResults = [
        { candidate: "Candidate A", percent: 55, votes: 5678 },
        { candidate: "Candidate B", percent: 35, votes: 4567 },
        { candidate: "Candidate C", percent: 10, votes: 2345 },
    ];

    const logout = () => {
        clearToken()
        clearUser()
    }

    return (
        <div className="space-y-4 md:space-y-6 p-4 md:px-20 md:py-10">
            <div className="flex justify-between items-center">
                <h1 className="text-[#275316] text-3xl font-bold">Dashboard</h1>
                <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#275316] font-semibold hover:bg-[#51A434] text-white px-4 py-2 rounded"
                >
                    Log out
                </button>

                <LogoutConfirmModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={logout}
                />
            </div>
            
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
                    <div className="bg-white p-4 md:p-8 rounded-lg shadow-2xs border border-gray-300">
                        <h3 className="font-semibold mb-4 text-lg text-[#275316]">00869020 MAYOR OF TARLAC - BAMBAN</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="bg-[#51A434] text-white">
                                <tr className="text-center">
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Rank</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Candidate Name</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Percent</th>
                                    <th className="px-4 py-3 cursor-pointer">Votes</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {candidates?.filter(item => item.contest_code.toString().padStart(8, '0') === "00869020")
                                    ?.length ? (
                                        candidates
                                        .filter(item => item.contest_code.toString().padStart(8, '0') === "00869020")
                                        .map((item, index) => (
                                            <tr key={index} className="hover:bg-[#D9F2D0]">
                                            <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                {item.candidate_name}
                                            </td>
                                            <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                -
                                            </td>
                                            <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">
                                                -
                                            </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                        <td colSpan={4} className="text-center text-gray-500 py-4">
                                            No candidates available for Mayor of Tarlac.
                                        </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-[#275316] text-white font-semibold">
                                        <td colSpan={2} className="px-2 py-3 border-r border-b border-gray-300 font-bold text-right">Total</td>
                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">-</td>
                                        <td className="px-4 py-3 border-b border-gray-300  font-semibold text-center">-</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Table 2 */}
                    <div className="bg-white p-4 md:p-8 rounded-lg shadow-2xs border border-gray-300">
                        <h3 className="font-semibold mb-4 text-lg text-[#275316]">00969020 VICE-MAYOR OF TARLAC - BAMBAN</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="bg-[#51A434] text-white">
                                <tr className="text-center">
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Rank</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Candidate Name</th>
                                    <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Percent</th>
                                    <th className="px-4 py-2 cursor-pointer">Votes</th>
                                </tr>
                                </thead>
                                {candidates?.filter(item => item.contest_code.toString().padStart(8, '0') === "00969020")
                                    ?.length ? (
                                        candidates
                                        .filter(item => item.contest_code.toString().padStart(8, '0') === "00969020")
                                        .map((item, index) => (
                                            <tr key={index} className="hover:bg-[#D9F2D0]">
                                            <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                {item.candidate_name}
                                            </td>
                                            <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                -
                                            </td>
                                            <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">
                                                -
                                            </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                        <td colSpan={4} className="text-center text-gray-500 py-4">
                                            No candidates available for Vice-Mayor of Tarlac.
                                        </td>
                                        </tr>
                                    )}
                                <tfoot>
                                    <tr className="bg-[#275316] text-white font-semibold">
                                        <td colSpan={2} className="px-2 py-3 border-r border-b border-gray-300 font-bold text-right">Total</td>
                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">-</td>
                                        <td className="px-4 py-3 border-b border-gray-300  font-semibold text-center">-</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Table 3 */}
            <div className="mt-10">
                <h1 className="my-2 text-lg md:text-2xl font-bold text-[#333]">Last 10 Poll Watchers' Submissions</h1>
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-2xs border border-gray-300">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-[#51A434] text-white">
                            <tr className="text-center">
                                <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Timestamp</th>
                                <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Poll Watcher</th>
                                <th className="px-4 py-3 border-r border-gray-100 cursor-pointer">Precinct</th>
                                <th className="px-4 py-2 cursor-pointer">Total Votes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sampleResults.map((item, index) => (
                                <tr key={index} className="hover:bg-[#D9F2D0]">
                                <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">-</td>
                                <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">-</td>
                                <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">-</td>
                                <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">-</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-[#275316] text-white font-semibold">
                                    <td colSpan={2} className="px-2 py-3 border-r border-b border-gray-300 font-bold text-right">Total</td>
                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">-</td>
                                    <td className="px-4 py-3 border-b border-gray-300  font-semibold text-center">-</td>
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
