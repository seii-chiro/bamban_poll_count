import { getCandidate, getDashboardSummary, getPrecinct } from "@/pages/admin/queries";
import { useTokenStore } from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Reports = () => {
    const token = useTokenStore()?.token;

    const { data: precinct } = useQuery({
        queryKey: ["precinct"],
        queryFn: () => getPrecinct(token ?? ''),
        enabled: !!token,
    });

    const { data: dashboardSummary } = useQuery({
        queryKey: ["dashboard-summary"],
        queryFn: () => getDashboardSummary(token ?? ''),
        enabled: !!token,
    });

    const { data: candidate } = useQuery({
        queryKey: ["candidate"],
        queryFn: () => getCandidate(token ?? ''),
        enabled: !!token,
    });

    const [selectedPrecinctId, setSelectedPrecinctId] = useState<string>("");

    useEffect(() => {
        if (precinct && precinct.length > 0) {
            setSelectedPrecinctId(String(precinct[0]?.id)); // Convert to string
        } else {
            setSelectedPrecinctId(""); // clear selection if no precincts
        }
    }, [precinct]);


const selectedPrecinct = precinct?.find((p) => String(p.id) === selectedPrecinctId);

    return (
        <div className="md:p-6 text-[#333] mx-5">
            {/* Select Input */}
            <div className="mb-6">
                <h1 className="md:text-lg mb-2 font-semibold">Select Precinct</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    <select
                        className="w-full md:col-span-2 border border-gray-300 rounded-md px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 max-w-full"
                        value={selectedPrecinctId}
                        onChange={(e) => setSelectedPrecinctId(e.target.value)}
                    >
                        <option value="">Select Precinct</option>
                        {precinct?.map((p) => (
                        <option
                            key={p.id}
                            value={p.id}
                            className="truncate"
                            title={`${p.clustered_prec} ${p.pollplace} ${p.brgy_name ? `BRGY. ${p.brgy_name},` : ''}${p.mun_name ? `${p.mun_name},` : ''}${p.prv_name}`}
                            >
                            {`${p.clustered_prec} ${p.pollplace} ${p.brgy_name ? `BRGY. ${p.brgy_name},` : ''}${p.mun_name ? `${p.mun_name},` : ''}${p.prv_name}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 items-start">
                {/* Precinct Details and Voter Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Precinct Details */}
                    {selectedPrecinct ? (
                        <div className="border border-gray-300 p-4 rounded-md shadow-2xs bg-white text-sm space-y-2">
                            <div>
                                <div className="flex flex-col ml-auto justify-end w-32 md:w-56 gap-1 md:gap-0">
                                    <p className="text-gray-500">Precinct ID:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-center md:text-[16px] font-medium">{selectedPrecinct.clustered_prec}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">Poll Watcher:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium"></p>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">ACM ID:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium">{selectedPrecinct.acm_id}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">Province:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium">{selectedPrecinct.prv_name}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">Municipality:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium">{selectedPrecinct.mun_name}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">Barangay:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium">{selectedPrecinct.brgy_name}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">Polling Center:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium">{selectedPrecinct.pollplace}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">Cluster Precinct:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium">{selectedPrecinct.clustered_prec}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-0">
                                        <p className="text-gray-500">Registered Voters:</p>
                                        <p className="flex-1 p-2 border border-gray-200 rounded-md md:text-[16px] text-gray-500 font-medium">{selectedPrecinct.registered_voters}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-400 italic">No precinct selected.</div>
                    )}

                    {/* Voter Stats */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center border border-gray-300 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF REGISTERED VOTERS</span>
                            <span className="font-bold text-xl text-[#51A434]">
                                {(selectedPrecinct?.registered_voters || 0).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-center border border-gray-300 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF VOTERS WHO VOTED</span>
                            <span className="font-bold text-xl text-[#51A434]">
                                {(dashboardSummary?.total_no_voters_voted || 0).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-center border border-gray-300 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF VALID BALLOTS CAST</span>
                            <span className="font-bold text-xl text-[#51A434]">
                                {(dashboardSummary?.total_no_ballots_casted || 0).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-center border border-gray-300 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF BALLOT DIVERTED</span>
                            <span className="font-bold text-xl text-[#51A434]">
                                {(dashboardSummary?.total_no_ballots_diverted || 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>


                {/* Result Table */}
                <div>
                    <div className="bg-white border border-gray-300 shadow-2xs rounded-md py-4 px-4 md:p-py-6 md:px-10">
                        <h1 className="text-xl mb-2 font-bold text-[#275316]">RESULTS</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="w-full">
                                <div className="mb-2 text-base font-semibold text-[#275316]">
                                    00869020 MAYOR OF TARLAC - BAMBAN
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-max text-sm text-left table-auto overflow-hidden">
                                    <thead className="bg-[#51A434] text-white">
                                        <tr>
                                        <th className="px-4 py-2 border-r border-gray-500">Rank</th>
                                        <th className="px-4 py-2 border-r border-gray-500">Candidate</th>
                                        <th className="px-4 py-2 border-r border-gray-500">Percent</th>
                                        <th className="px-4 py-2">Votes</th>
                                        </tr>
                                    </thead>
                                        {candidate?.filter(item => item.contest_code.toString().padStart(8, '0') === "00869020")
                                            ?.length ? (
                                                candidate
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
                            <div className="w-full">
                                <div className="mb-2 text-base font-semibold text-[#275316]">
                                    00969020 VICE-MAYOR OF TARLAC - BAMBAN
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-max text-sm text-left table-auto overflow-hidden">
                                        <thead className="bg-[#51A434] text-white">
                                            <tr>
                                                <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Rank</th>
                                                <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Candidate</th>
                                                <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Percent</th>
                                                <th className="px-4 py-2 cursor-pointer">Votes</th>
                                            </tr>
                                        </thead>
                                            {candidate?.filter(item => item.contest_code.toString().padStart(8, '0') === "00969020")
                                                ?.length ? (
                                                    candidate
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
                </div>
            </div>
        </div>
    );
};

export default Reports;
