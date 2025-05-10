import Select from "@/components/Select"
import StatusButton from "../components/StatusButton";
import StatusMark from "../components/StatusMark";
import { useNavigate } from "react-router";
import { useERHeaderStatusStore } from "@/store/useERHeaderStatusStore";
import clsx from "clsx"

const ElectionDay = () => {
    const navigate = useNavigate()
    const { erHeaderStatus, erHeaderSubmitted } = useERHeaderStatusStore()

    const pollWatcherLabel = ["Name", "Precinct ID", "ACM ID", "Province", "City/Municipality", "Barangay", "Polling Center", "Clustered Precinct", "Registered Voters"]
    const sampleValue = ["Juan Dela Cruz​", "69020001", "69020001", "TARLAC", "BAMBAN", "ANUPUL", "BRGY. ANUPUL, BAMBAN, TARLAC​", "0001A, 0002A, 0003A", "685"]

    return (
        <div className="w-full p-2 lg:p-5">
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-xl">Select Precinct</h3>
                <div>
                    <Select options={["A", "B", "C"]} />
                </div>
                <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 bg-[#D9F2D0] p-4 rounded">
                    {/* Mobile/Stacked layout */}
                    <div className="flex flex-col gap-2 lg:hidden">
                        {pollWatcherLabel.map((label, i) => (
                            <div key={i}>
                                <p className="font-semibold">{label}:</p>
                                <p>{sampleValue[i]}</p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop/Side-by-side layout */}
                    <div className="hidden lg:flex flex-1 gap-4">
                        <div className="flex-1 flex flex-col gap-2 p-2 rounded">
                            {pollWatcherLabel.map((label, i) => (
                                <p key={i} className="font-semibold">{label}:</p>
                            ))}
                        </div>
                        <div className="flex-[4] flex flex-col gap-2 p-2 rounded text-black">
                            {sampleValue.map((value, i) => (
                                <p key={i}>{value}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full flex items-center gap-1 lg:gap-4">
                            <StatusButton label="Election Result (ER) Header​" status={erHeaderStatus} onClick={() => navigate("er-header")} />
                            <StatusMark status={erHeaderStatus} />
                        </div>
                        <div className="w-full flex items-center gap-1 lg:gap-4">
                            <StatusButton label="President​" status={"disabled"} />
                            <StatusMark status="disabled" />
                        </div>
                        <div className={clsx('w-full flex items-center gap-1 lg:gap-4', erHeaderSubmitted ? '' : 'pointer-events-none cursor-not-allowed opacity-50')}>
                            <StatusButton label="Mayoral​" status={"not_submitted"} onClick={() => navigate("mayor-vice-mayor-er")} />
                            <StatusMark status="not_submitted" />
                        </div>
                        <div className="w-full flex items-center gap-1 lg:gap-4">
                            <StatusButton label="Congressional" status={"disabled"} />
                            <StatusMark status="disabled" />
                        </div>
                        <div className="w-full flex items-center gap-1 lg:gap-4">
                            <StatusButton label="Gubernatorial​​" status={"disabled"} />
                            <StatusMark status="disabled" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionDay