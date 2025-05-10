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

const Report = () => {
    const [selectedPrecinctId, setSelectedPrecinctId] = useState(
        precinctData[0]?.precinct_id || ""
    );

    const selectedPrecinct = precinctData.find(
        (p) => p.precinct_id === selectedPrecinctId
    );

    return (
        <div className="md:p-6 text-[#333] md:border md:border-gray-200 md:rounded-md md:shadow-sm m-5">
            {/* Select Input */}
            <div className="mb-6">
                <h1 className="text-lg mb-2 font-semibold">Select Precinct</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <select
                        className="w-full md:col-span-2 border border-gray-300 rounded-md px-4 py-2 text-gray-500 shadow-sm focus:outline-none"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Precinct Details and Voter Stats */}
                <div className="md:col-span-2 space-y-4">
                {/* Precinct Details */}
                {selectedPrecinct ? (
                    <div className="border border-gray-300 p-4 rounded-md shadow bg-white text-sm space-y-2">
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Name:</strong><p className="flex-1">{selectedPrecinct.name}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Precinct ID:</strong><p className="flex-1">{selectedPrecinct.precinct_id}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">ACM ID:</strong><p className="flex-1">{selectedPrecinct.acm_id}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Province:</strong><p className="flex-1">{selectedPrecinct.province}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Municipality:</strong><p className="flex-1">{selectedPrecinct.municipality}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Barangay:</strong><p className="flex-1">{selectedPrecinct.brgy}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Polling Center:</strong><p className="flex-1">{selectedPrecinct.polling_center}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Cluster Precinct:</strong><p className="flex-1">{selectedPrecinct.cluster_prec}</p></div>
                    <div className="flex gap-2 md:gap-0"><strong className="md:w-52">Registered Voters:</strong><p className="flex-1">{selectedPrecinct.reg_voters}</p></div>
                    </div>
                ) : (
                    <div className="text-gray-400 italic">No precinct selected.</div>
                )}

                {/* Voter Stats */}
                <div className="border border-gray-300 p-4 rounded-md shadow bg-white text-sm space-y-2">
                    <div className="flex justify-between">
                        <span>NO. OF REGISTERED VOTERS</span>
                        <span className="font-semibold">685</span>
                    </div>
                    <div className="flex justify-between">
                        <span>NO. OF VOTERS WHO VOTED</span>
                        <span className="font-semibold">642</span>
                    </div>
                    <div className="flex justify-between">
                        <span>NO. OF VALID BALLOTS CAST</span>
                        <span className="font-semibold">638</span>
                    </div>
                    <div className="flex justify-between">
                        <span>NO. OF BALLOT DIVERTED</span>
                        <span className="font-semibold">4</span>
                    </div>
                </div>
                </div>


                {/* Result Table */}
                    <div className="md:col-span-1">
                        <div className="bg-white border border-gray-300 shadow rounded-md p-4">
                            <h1 className="text-xl mb-2 font-bold text-[#275316]">RESULTS</h1>
                            <div className="w-full mt-4 md:mt-8">
                                <div className="mb-2">
                                    <div>
                                        0086020 MAYOR OF TARLAC - {selectedPrecinct?.municipality}
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-max text-sm text-left table-auto">
                                        <thead className="bg-gray-100">
                                            <tr className="text-white bg-[#51A434] hover:bg-gray-200 hover:text-[#333]">
                                            <th className="px-2 py-1 border border-gray-600  cursor-pointer">Rank</th>
                                            <th className="px-2 py-1 border border-gray-600 cursor-pointer">Candidate</th>
                                            <th className="px-2 py-1 border border-gray-600 cursor-pointer">Percent</th>
                                            <th className="px-2 py-1 border border-gray-600 cursor-pointer ">Votes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleResults.map((item, index) => (
                                            <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                                                <td className="px-2 py-1 border border-gray-600">{index + 1}</td>
                                                <td className="px-2 py-1 border border-gray-600">{item.candidate}</td>
                                                <td className="px-2 py-1 border border-gray-600">{item.percent || '-'}</td>
                                                <td className="px-2 py-1 border border-gray-600">{item.votes}</td>
                                            </tr>
                                            ))}
                                            <tr className="bg-[#275316] text-white font-semibold">
                                            <td className="px-2 py-1 border border-gray-600 text-center" colSpan={2}>TOTAL</td>
                                            <td className="px-2 py-1 border border-gray-600">
                                                {sampleResults.reduce((acc, item) => acc + (parseFloat(item.percent) || 0), 0).toFixed(2)}%
                                            </td>
                                            <td className="px-2 py-1 border border-gray-600">
                                                {sampleResults.reduce((acc, item) => acc + (parseInt(item.votes) || 0), 0)}
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-full mt-4 md:mt-8">
                                <div className="mb-2">
                                    <div>
                                        0086020 VICE MAYOR OF TARLAC - {selectedPrecinct?.municipality}
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-max text-sm text-left table-auto">
                                        <thead className="bg-gray-100">
                                            <tr className="text-white bg-[#51A434] hover:bg-gray-200 hover:text-[#333]">
                                            <th className="px-2 py-1 border border-gray-600  cursor-pointer">Rank</th>
                                            <th className="px-2 py-1 border border-gray-600 cursor-pointer">Candidate</th>
                                            <th className="px-2 py-1 border border-gray-600 cursor-pointer">Percent</th>
                                            <th className="px-2 py-1 border border-gray-600 cursor-pointer ">Votes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleResults.map((item, index) => (
                                            <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                                                <td className="px-2 py-1 border border-gray-600">{index + 1}</td>
                                                <td className="px-2 py-1 border border-gray-600">{item.candidate}</td>
                                                <td className="px-2 py-1 border border-gray-600">{item.percent || '-'}</td>
                                                <td className="px-2 py-1 border border-gray-600">{item.votes}</td>
                                            </tr>
                                            ))}
                                            <tr className="bg-[#275316] text-white font-semibold">
                                            <td className="px-2 py-1 border border-gray-600 text-center" colSpan={2}>TOTAL</td>
                                            <td className="px-2 py-1 border border-gray-600">
                                                {sampleResults.reduce((acc, item) => acc + (parseFloat(item.percent) || 0), 0).toFixed(2)}%
                                            </td>
                                            <td className="px-2 py-1 border border-gray-600">
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
    );
};

export default Report;
