import { FaRegImage } from "react-icons/fa6";

const ERHeader = () => {
    const pollWatcherLabel = ["Name", "Precinct ID", "ACM ID", "Province", "City/Municipality", "Barangay", "Polling Center", "Clustered Precinct", "Registered Voters"]
    const sampleValue = ["Juan Dela Cruz​", "69020001", "69020001", "TARLAC", "BAMBAN", "ANUPUL", "BRGY. ANUPUL, BAMBAN, TARLAC​", "0001A, 0002A, 0003A", "685"]

    return (
        <div className='w-full'>
            <div className='w-full'>

                <div className='w-full flex gap-2'>
                    <div className='flex-[3]'>
                        <div>
                            <div className='text-white bg-[#275317] font-semibold'> Precinct Details ​</div>
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
                        </div>
                        <div className="bg-[#C2F1C8] text-[#002060] font-semibold text-center"> TAKE PHOTO OF ELECTION RETURNS HEADER </div>
                    </div>
                    <div className='flex-1'>
                        <div className='text-[#002060] bg-[#8ED973] font-semibold text-center'>Details of ER Headers​</div>
                        <div className="flex items-center justify-center">
                            <FaRegImage />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ERHeader