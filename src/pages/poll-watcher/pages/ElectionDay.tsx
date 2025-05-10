import Select from "@/components/Select"
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

type StatusButtonProps = {
    label: string;
    status: string;
    disabled?: boolean;
    onClick?: () => void;
};

type StatusProps = {
    status: "submitted" | "not_submitted" | "disabled";
};

const StatusMark = ({ status }: StatusProps) => {
    let icon = null;
    let color = "";

    switch (status) {
        case "submitted":
            icon = <BsFillCheckCircleFill className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />;
            color = "text-green-500";
            break;
        case "not_submitted":
            icon = <MdCancel className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />;
            color = "text-red-500";
            break;
        case "disabled":
        default:
            icon = <MdCancel className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />;
            color = "text-gray-400";
            break;
    }


    return (
        <div className={`flex items-center justify-center p-2 lg:p-5 rounded-lg lg:bg-[#DCEAF7] ${color}`}>
            {icon}
        </div>
    );

};

const StatusButton = ({ label, status, disabled = false, onClick }: StatusButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        w-full flex flex-col p-2 rounded
        ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#8ED973] hover:bg-[#7bc763]'}
      `}
        >
            <span className="font-semibold text-white">{label}</span>
            <span className="text-white">{status}</span>
        </button>
    );
};

const ElectionDay = () => {
    const pollWatcherLabel = ["Name", "Precinct ID", "ACM ID", "Province", "City/Municipality", "Barangay", "Polling Center", "Clustered Precinct", "Registered Voters"]
    const sampleValue = ["Juan Dela Cruz​", "69020001", "69020001", "TARLAC", "BAMBAN", "ANUPUL", "BRGY. ANUPUL, BAMBAN, TARLAC​", "0001A, 0002A, 0003A", "685"]

    return (
        <div className="w-full p-2 lg:p-5">
            <div className="flex flex-col gap-2">
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
                                <p className="bg-gray-200">{sampleValue[i]}</p>
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
                            <StatusButton label="Election Result (ER) Header​" status={"submitted"} />
                            <StatusMark status="submitted" />
                        </div>
                        <div className="w-full flex items-center gap-1 lg:gap-4">
                            <StatusButton label="President​" status={"disabled"} />
                            <StatusMark status="disabled" />
                        </div>
                        <div className="w-full flex items-center gap-1 lg:gap-4">
                            <StatusButton label="Mayoral​" status={"not_submitted"} />
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