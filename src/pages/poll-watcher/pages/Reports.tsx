import { useState } from "react";

const precinctData = [
    {
        name: "Juan Dela Cruz",
        precinct_id: "69020001",
        acm_id: "69020001",
        province: "TARLAC",
        municipality: "BAMBAN",
        brgy: "ANUPUL",
        polling_center: "ISABELA PROPER BARANGAY HALL",
        cluster_prec: "0001A, 0002A, 0003A",
        reg_voters: "685",
    },
    {
        precinct_id: "69020002",
        acm_id: "69020002",
        name: "Samantha Perez",
        province: "TARLAC",
        municipality: "BAMBAN",
        brgy: "SAN ROQUE",
        polling_center: "SAN ROQUE BARANGAY HALL",
        cluster_prec: "0004A, 0005A",
        reg_voters: "670",
    },
];

const sampleResults = [
    { position: "Mayor", candidate: "Juan Dela Cruz", percent: "91%", votes: 1234 },
    { position: "Vice Mayor", candidate: "Maria Santos", votes: 1130 },
    { position: "Councilor", candidate: "Pedro Reyes", votes: 890 },
];
const Reports = () => {
    const [selectedPrecinctId, setSelectedPrecinctId] = useState(
        precinctData[0]?.precinct_id || ""
    );

    const selectedPrecinct = precinctData.find(
        (p) => p.precinct_id === selectedPrecinctId
    );

    return (
        <div className="md:p-6 text-[#333] mx-5">
            {/* Select Input */}
            <div className="mb-6">
                <h1 className="md:text-lg mb-2 font-semibold">Select Precinct</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    <select
                        className="w-full md:col-span-2 border border-gray-300 rounded-md px-4 py-2 text-gray-500 shadow-2xs focus:outline-none"
                        value={selectedPrecinctId}
                        onChange={(e) => setSelectedPrecinctId(e.target.value)}
                    >
                        {precinctData.map((p) => (
                            <option key={p.precinct_id} value={p.precinct_id}>
                                {p.precinct_id} {p.polling_center}, BRGY. {p.brgy}, {p.municipality}, {p.province}
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
                                <p className="flex-1 p-2 border border-gray-200 rounded-md text-center font-medium">{selectedPrecinct.precinct_id}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">Name:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.name}</p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">ACM ID:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.acm_id}</p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">Province:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.province}</p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">Municipality:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.municipality}</p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">Barangay:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.brgy}</p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">Polling Center:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.polling_center}</p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">Cluster Precinct:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.cluster_prec}</p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-0">
                                    <p className="text-gray-500">Registered Voters:</p>
                                    <p className="flex-1 p-2 border border-gray-200 rounded-md text-gray-500 font-medium">{selectedPrecinct.reg_voters}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-400 italic">No precinct selected.</div>
                )}

                    {/* Voter Stats */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center border border-gray-200 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF REGISTERED VOTERS</span>
                            <span className="font-bold text-xl text-[#51A434]">685</span>
                        </div>
                        <div className="flex justify-between items-center border border-gray-200 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF VOTERS WHO VOTED</span>
                            <span className="font-bold text-xl text-[#51A434]">642</span>
                        </div>
                        <div className="flex justify-between items-center border border-gray-200 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF VALID BALLOTS CAST</span>
                            <span className="font-bold text-xl text-[#51A434]">638</span>
                        </div>
                        <div className="flex justify-between items-center border border-gray-200 hover:bg-[#D9F2D0] py-4 px-2 md:px-8 rounded-md shadow-2xs">
                            <span className="text-gray-600 font-semibold text-sm md:text-[16px]">NO. OF BALLOT DIVERTED</span>
                            <span className="font-bold text-xl text-[#51A434]">4</span>
                        </div>
                    </div>
                </div>


                {/* Result Table */}
                    <div>
                        <div className="bg-white border border-gray-300 shadow-2xs rounded-md p-4">
                            <h1 className="text-xl mb-2 font-bold text-[#275316]">RESULTS</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="w-full">
                                    <div className="mb-2 text-base font-semibold text-[#275316]">
                                        0086020 MAYOR OF TARLAC - {selectedPrecinct?.municipality}
                                    </div>
                                    <div className="overflow-x-auto shadow-md">
                                        <table className="w-full min-w-max text-sm text-left table-auto overflow-hidden">
                                            <thead className="bg-[#51A434] text-white">
                                                <tr>
                                                    <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Rank</th>
                                                    <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Candidate</th>
                                                    <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Percent</th>
                                                    <th className="px-4 py-2 cursor-pointer">Votes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sampleResults.map((item, index) => (
                                                <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                                                    <td className="px-4 py-3 border-r border-gray-500 font-semibold text-center">{index + 1}</td>
                                                    <td className="px-4 py-3 border-r border-gray-500 font-semibold">{item.candidate}</td>
                                                    <td className="px-4 py-3 border-r border-gray-500 font-semibold">{item.percent || '-'}</td>
                                                    <td className="px-4 py-3 font-semibold">{item.votes}</td>
                                                </tr>
                                                ))}
                                                <tr className="bg-[#275316] text-white font-semibold">
                                                <td className="px-4 py-2 border border-gray-600 text-right" colSpan={2}>TOTAL</td>
                                                <td className="px-4 py-3 border border-gray-600">
                                                    {sampleResults.reduce((acc, item) => acc + (parseFloat(item.percent) || 0), 0).toFixed(2)}%
                                                </td>
                                                <td className="px-4 py-3 border border-gray-600">
                                                    {sampleResults.reduce((acc, item) => acc + (parseInt(item.votes) || 0), 0)}
                                                </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="mb-2 text-base font-semibold text-[#275316]">
                                        0086020 VICE MAYOR OF TARLAC - {selectedPrecinct?.municipality}
                                    </div>
                                    <div className="overflow-x-auto shadow-md">
                                        <table className="w-full min-w-max text-sm text-left table-auto overflow-hidden">
                                        <thead className="bg-[#51A434] text-white">
                                            <tr>
                                            <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Rank</th>
                                            <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Candidate</th>
                                            <th className="px-4 py-2 border-r border-gray-500 cursor-pointer">Percent</th>
                                            <th className="px-4 py-2 cursor-pointer">Votes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleResults.map((item, index) => (
                                            <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                                                <td  className="px-4 py-3 border-r border-gray-500 font-semibold text-center">{index + 1}</td>
                                                <td  className="px-4 py-3 border-r border-gray-500 font-semibold text-center">{item.candidate}</td>
                                                <td  className="px-4 py-3 border-r border-gray-500 font-semibold text-center">{item.percent || '-'}</td>
                                                <td className="px-4 py-2 font-semibold">{item.votes}</td>
                                            </tr>
                                            ))}
                                            <tr className="bg-[#275316] text-white font-semibold">
                                            <td className="px-4 py-3 border border-gray-600 text-right" colSpan={2}>TOTAL</td>
                                            <td className="px-4 py-3 border border-gray-600">
                                                {sampleResults.reduce((acc, item) => acc + (parseFloat(item.percent) || 0), 0).toFixed(2)}%
                                            </td>
                                            <td className="px-4 py-3 border border-gray-600">
                                                {sampleResults.reduce((acc, item) => acc + (parseInt(item.votes) || 0), 0)}
                                            </td>
                                            </tr>
                                        </tbody>
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
