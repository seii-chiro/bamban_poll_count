import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

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

export default StatusMark