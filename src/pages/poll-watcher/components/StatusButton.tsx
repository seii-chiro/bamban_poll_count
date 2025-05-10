type StatusButtonProps = {
    label: string;
    status: string;
    disabled?: boolean;
    onClick?: () => void;
};

const humanizeStatus = (status: string) => {
    switch (status) {
        case "submitted":
            return "Submitted";
        case "not_submitted":
            return "Not Submitted";
        case "disabled":
            return "Disabled";
        default:
            return status;
    }
};

const StatusButton = ({ label, status, onClick }: StatusButtonProps) => {
    const isDisabled = status === "disabled";

    let bgColor = "";
    let statusColor = "";

    switch (status) {
        case "submitted":
            bgColor = "bg-[#8ED973] hover:bg-[#7bc763]";
            statusColor = "text-white";
            break;
        case "not_submitted":
            bgColor = "bg-[#275317]";
            statusColor = "text-[#FFD54F]";
            break;
        case "disabled":
            bgColor = "bg-gray-300";
            statusColor = "text-gray-600 opacity-60";
            break;
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`w-full flex flex-col p-2 rounded transition-all ${bgColor} ${isDisabled ? 'cursor-not-allowed' : ''}`}
        >
            <span className="font-semibold text-white">{label}</span>
            <span className={`text-sm ${statusColor}`}>{humanizeStatus(status)}</span>
        </button>
    );
};

export default StatusButton