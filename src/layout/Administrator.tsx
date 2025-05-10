import { FaUsers, FaUserCheck, FaVoteYea, FaUserClock, FaChartPie, FaUserShield } from "react-icons/fa";

const Administrator = () => {
      const cardData = [
    { title: "Total Voters", value: 10234, icon: <FaUsers size={28} />, bg: "#51A434" },
    { title: "Voted", value: 8743, icon: <FaVoteYea size={28} />, bg: "#275316" },
    { title: "Not Voted", value: 1491, icon: <FaUserClock size={28} />, bg: "#51A434" },
    { title: "Verified", value: 9800, icon: <FaUserCheck size={28} />, bg: "#275316" },
    { title: "Results Pending", value: 250, icon: <FaChartPie size={28} />, bg: "#51A434" },
    { title: "Admins", value: 12, icon: <FaUserShield size={28} />, bg: "#275316" },
  ];

  const sampleResults = [
    { candidate: "Candidate A", percent: "55", votes: "5678" },
    { candidate: "Candidate B", percent: "35", votes: "4567" },
    { candidate: "Candidate C", percent: "10", votes: "2345" },
  ];

  return (
    <div className="space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="rounded-xl text-white shadow-lg p-4 flex items-center justify-between transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: card.bg }}
          >
            <div>
              <div className="text-sm uppercase tracking-wide opacity-80">{card.title}</div>
              <div className="text-2xl font-bold">{card.value}</div>
            </div>
            <div className="opacity-90">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {/* Table 1 */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4 text-lg">Sample Table 1</h3>
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-[#51A434] text-white">
              <tr>
                <th className="px-2 py-1">Rank</th>
                <th className="px-2 py-1">Candidate</th>
                <th className="px-2 py-1">Percent</th>
                <th className="px-2 py-1">Votes</th>
              </tr>
            </thead>
            <tbody>
              {sampleResults.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">{item.candidate}</td>
                  <td className="px-2 py-1">{item.percent || '-'}</td>
                  <td className="px-2 py-1">{item.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 2 */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4 text-lg">Sample Table 2</h3>
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-[#51A434] text-white">
              <tr>
                <th className="px-2 py-1">Rank</th>
                <th className="px-2 py-1">Candidate</th>
                <th className="px-2 py-1">Percent</th>
                <th className="px-2 py-1">Votes</th>
              </tr>
            </thead>
            <tbody>
              {sampleResults.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">{item.candidate}</td>
                  <td className="px-2 py-1">{item.percent || '-'}</td>
                  <td className="px-2 py-1">{item.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 3 */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4 text-lg">Sample Table 3</h3>
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-[#51A434] text-white">
              <tr>
                <th className="px-2 py-1">Rank</th>
                <th className="px-2 py-1">Candidate</th>
                <th className="px-2 py-1">Percent</th>
                <th className="px-2 py-1">Votes</th>
              </tr>
            </thead>
            <tbody>
              {sampleResults.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">{item.candidate}</td>
                  <td className="px-2 py-1">{item.percent || '-'}</td>
                  <td className="px-2 py-1">{item.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 4 */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4 text-lg">Sample Table 4</h3>
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-[#51A434] text-white">
              <tr>
                <th className="px-2 py-1">Rank</th>
                <th className="px-2 py-1">Candidate</th>
                <th className="px-2 py-1">Percent</th>
                <th className="px-2 py-1">Votes</th>
              </tr>
            </thead>
            <tbody>
              {sampleResults.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[#D9F2D0]">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">{item.candidate}</td>
                  <td className="px-2 py-1">{item.percent || '-'}</td>
                  <td className="px-2 py-1">{item.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
