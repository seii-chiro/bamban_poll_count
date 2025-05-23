import AdminSidebar from "@/pages/admin/components/AdminSidebar";
import { getCandidate, getDashboardSummary, getPollWatcher, getResult } from "@/pages/admin/queries";
import LogoutConfirmModal from "@/pages/poll-watcher/components/LogoutConfirm";
import { useTokenStore } from "@/store/useTokenStore";
import useUserStore from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaUsers, FaUserCheck, FaVoteYea, FaUserClock, FaChartPie, FaUserShield, FaBars } from "react-icons/fa";

const Administrator = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const clearToken = useTokenStore()?.resetToken;
    const clearUser = useUserStore()?.clearUser;
    const token = useTokenStore()?.token;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

    const { data: results } = useQuery({
        queryKey: ["results"],
        queryFn: () => getResult(token ?? ''),
        enabled: !!token,
    });

    const { data: pollwatcher } = useQuery({
        queryKey: ["poll-watcher"],
        queryFn: () => getPollWatcher(token ?? ''),
        enabled: !!token,
    });

    const getVotesByCandidateName = (name: string): number => {
        const result = results?.find(
            (res) => res.candidate_name === name
        );
        return result?.number_voters || 0;
    };

    const contestCode = "00869020";
    const filteredCandidates = candidates?.filter(
        item => item.contest_code.toString().padStart(8, '0') === contestCode
    );

    const totalVotes = filteredCandidates?.reduce((sum, candidate) => {
        const votes = getVotesByCandidateName(candidate.candidate_name);
        return sum + votes;
    }, 0) || 0;

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
        { title: "Total No. of Precincts", value: dashboardSummary?.total_precincts.toLocaleString() || "0", icon: <FaUsers size={30} />, bg: "#51A434" },
        { title: "Total No. of Voters", value: totalVoters.toLocaleString() || "0", icon: <FaVoteYea size={30} />, bg: "#275316" },
        {
        title: "Total No. of Poll Watchers", value: dashboardSummary?.total_poll_watchers.toLocaleString() || "0",
        icon: <FaUserClock size={30} />,
        bg: "#51A434",
        },
        { title: "Percentage of Votes Counted", value: `${votesPercentage}%`, icon: <FaUserCheck size={30} />, bg: "#275316" },
        { title: "Total Uploadeds / Submissions", value: dashboardSummary?.total_poll_watchers.toLocaleString() || "0", icon: <FaChartPie size={30} />, bg: "#51A434" },// note: replace with the total submission
        { title: "No. of Voters who Voted", value: dashboardSummary?.total_no_voters_voted.toLocaleString() || "0", icon: <FaUserShield size={30} />, bg: "#275316" },
        { title: "No. of Ballots Casted", value: ballotsCasted.toLocaleString() || "0", icon: <FaUserShield size={30} />, bg: "#51A434" },
        { title: "Percentage of Ballots Casted", value: `${percentage}%`, icon: <FaUserShield size={30} />, bg: "#275316" },
    ];

    const logout = () => {
        clearToken()
        clearUser()
    }

    return (
    <div className="flex">
        <button
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="fixed top-4 left-4 z-50 text-white bg-[#275316] p-2 rounded-md shadow"
            >
            <FaBars size={20} />
        </button>

        {/* Sidebar */}
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <div className={`flex-1 p-4 md:px-20 md:py-10 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
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
                    className="rounded-xl w-full text-white shadow-lg py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-10 flex items-center justify-between transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: card.bg }}
                    >
                    <div>
                        <div className="text-sm font-medium uppercase tracking-wide opacity-80">{card.title}</div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold">{card.value}</div>
                    </div>
                    <div className="opacity-90 text-xl sm:text-2xl md:text-3xl">{card.icon}</div>
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
                                    {candidates?.filter(item => item.contest_code.toString().padStart(8, '0') === "00869020")?.length ? (
                                        [...candidates]
                                        .filter(item => item.contest_code.toString().padStart(8, '0') === "00869020")
                                        .sort((a, b) => getVotesByCandidateName(b.candidate_name) - getVotesByCandidateName(a.candidate_name)) // Sorting by vote count, descending
                                        .map((item, index) => {
                                            const votes = getVotesByCandidateName(item.candidate_name); // Get votes for candidate
                                            const percent = totalVotes ? ((votes / totalVotes) * 100).toFixed(2) : "0.00"; // Calculate percentage for the candidate
                                            return (
                                                <tr key={index} className="hover:bg-[#D9F2D0]">
                                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                        {item.candidate_name}
                                                    </td>
                                                    <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">
                                                        {percent}%
                                                    </td>
                                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                        {votes.toLocaleString()}
                                                    </td>
                                                </tr>
                                            );
                                        })
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
                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                            {totalVotes && totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(2) : "0.00"}%
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">
                                            {totalVotes.toLocaleString()}
                                        </td>
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
                                <tbody>
                                    {candidates?.filter(item => item.contest_code.toString().padStart(8, '0') === "00969020")
                                        ?.length ? (
                                            [...candidates]
                                            .filter(item => item.contest_code.toString().padStart(8, '0') === "00969020")
                                            .sort((a, b) => getVotesByCandidateName(b.candidate_name) - getVotesByCandidateName(a.candidate_name))
                                            .map((item, index) => {
                                                const votes = getVotesByCandidateName(item.candidate_name); // Get votes for candidate
                                                const percent = totalVotes ? ((votes / totalVotes) * 100).toFixed(2) : "0.00"; // Calculate percentage for the candidate
                                                return (
                                                    <tr key={index} className="hover:bg-[#D9F2D0]">
                                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                            {item.candidate_name}
                                                        </td>
                                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                            {percent}%
                                                        </td>
                                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                            {votes.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center text-gray-500 py-4">
                                                    No candidates available for Vice-Mayor of Tarlac.
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-[#275316] text-white font-semibold">
                                        <td colSpan={2} className="px-2 py-3 border-r border-b border-gray-300 font-bold text-right">Total</td>
                                        <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                            {totalVotes && totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(2) : "0.00"}%
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-300 font-semibold text-center">
                                            {totalVotes.toLocaleString()}
                                        </td>
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
                                        {
                                            pollwatcher?.filter(item =>
                                            item.groups?.includes("poll-watcher") &&
                                            item.clustered_prec
                                            )?.length ? (
                                            [...pollwatcher]
                                                .filter(item =>
                                                item.groups?.includes("poll-watcher") &&
                                                item.clustered_prec_precincts[0]?.clustered_prec
                                                )
                                                .sort((a, b) =>
                                                getVotesByCandidateName(b.clustered_prec_precincts[0]?.clustered_prec) -
                                                getVotesByCandidateName(a.clustered_prec_precincts[0]?.clustered_prec)
                                                )
                                                .map((item, index) => (
                                                <tr key={index} className="hover:bg-[#D9F2D0]">
                                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                    {index + 1}
                                                    </td>
                                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                    {item.first_name || item.last_name
                                                        ? `${item.first_name} ${item.last_name}`
                                                        : "Unnamed Watcher"}
                                                    </td>
                                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                    {item.clustered_prec_precincts[0]?.clustered_prec}
                                                    </td>
                                                    <td className="px-4 py-3 border-r border-b border-gray-300 font-semibold text-center">
                                                    {getVotesByCandidateName(item.clustered_prec_precincts[0]?.clustered_prec).toLocaleString()}
                                                    </td>
                                                </tr>
                                                ))
                                            ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center text-gray-500 py-4">
                                                No available Poll Watcher's Submission.
                                                </td>
                                            </tr>
                                            )
                                        }
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
            </div>
            
        </div>
        
    );
};

export default Administrator;
