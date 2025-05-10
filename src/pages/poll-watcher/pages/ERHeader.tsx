import { FaRegImage } from "react-icons/fa6";
import PictureCard from "../components/PictureCard";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export type ERHeader = {
    record_status_id?: null | number;
    clustered_prec: string;
    no_reg_voters: null | number;
    no_voters_voted: null | number;
    no_ballots_casted: null | number;
    no_ballots_diverted: null | number;
    pic1_b64: string;
    pic1_path?: string;
    pic2_b64: string;
    pic2_path?: string;
    pic3_b64: string;
    pic3_path?: string;
    notes?: string;
    user: null | number;
}

const ERHeader = () => {
    const navigate = useNavigate()

    const [images, setImages] = useState<Record<number, string | null>>({});
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const [formData, setFormData] = useState<ERHeader>({
        pic1_b64: "",
        pic2_b64: "",
        pic3_b64: "",
        clustered_prec: "",
        no_ballots_casted: null,
        no_ballots_diverted: null,
        no_reg_voters: null,
        no_voters_voted: null,
        user: null
    })

    console.log(formData)

    useEffect(() => {
        const stripPrefix = (data: string | null): string =>
            typeof data === "string"
                ? data.replace(/^data:image\/\w+;base64,/, "")
                : "";

        setFormData(prev => ({
            ...prev,
            pic1_b64: stripPrefix(images[0]),
            pic2_b64: stripPrefix(images[1]),
            pic3_b64: stripPrefix(images[2]),
        }));
    }, [images]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const filledEntries = Object.entries(images).filter(([_, img]) => img !== null);
        if (filledEntries.length === 1) {
            setSelectedImageIndex(Number(filledEntries[0][0]));
        }
    }, [images]);

    const handleImageCaptured = (index: number, image: string | null) => {
        setImages(prev => ({ ...prev, [index]: image }));
    };

    // Check if at least one image is available
    const hasAtLeastOneImage = Object.values(images).some(image => image !== null);

    const pollWatcherLabel = ["Name", "Precinct ID", "ACM ID", "Province", "City/Municipality", "Barangay", "Polling Center", "Clustered Precinct", "Registered Voters"]
    const sampleValue = ["Juan Dela Cruz​", "69020001", "69020001", "TARLAC", "BAMBAN", "ANUPUL", "BRGY. ANUPUL, BAMBAN, TARLAC​", "0001A, 0002A, 0003A", "685"]

    return (
        <div className='w-full flex flex-col gap-5 p-5'>
            <button
                onClick={() => navigate("/app/poll-watcher")}
                className="flex items-center gap-4 bg-[#D9F2D0] w-fit py-2 px-4 rounded-md hover:bg-[#275317] hover:text-white transition-all ease-in-out duration-200 delay-100"
            >
                <FaArrowLeft />
                <span className="font-semibold">Home</span>
            </button>
            <div className='w-full flex flex-col gap-10 lg:gap-2'>

                <div className='w-full flex flex-col lg:flex-row items-stretch gap-10 lg:gap-2'>
                    <div className='flex-[3] flex flex-col gap-1'>
                        <div className="flex flex-col rounded overflow-hidden">
                            <div className='text-white bg-[#275317] font-semibold text-xl p-2 text-center'> Precinct Details</div>
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
                        <div className="bg-[#C2F1C8] text-[#002060] p-2 text-xl font-semibold text-center rounded">
                            TAKE PHOTO OF ELECTION RETURNS HEADER
                        </div>
                    </div>

                    {/* Always display the section, but conditionally render content */}
                    <div className='flex-1 flex flex-col gap-2 rounded overflow-hidden'>
                        <div className='text-[#002060] bg-[#8ED973] font-semibold text-center text-xl rounded'>Details of ER Headers</div>
                        <div className="flex items-center justify-center bg-[#B0FFA2] h-full rounded overflow-hidden">
                            {hasAtLeastOneImage ? (
                                // Display the first available image
                                <img
                                    src={selectedImageIndex !== null && images[selectedImageIndex] ? images[selectedImageIndex]! : ''}
                                    alt="ER Header"
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                // Display placeholder icon if no images
                                <FaRegImage size={100} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-4">
                    {[0, 1, 2].map(index => (
                        <div
                            className={`flex-1 border-2 rounded-xl transition-all duration-200 ${selectedImageIndex === index ? 'border-green-400' : 'border-transparent'
                                }`}
                            key={index}
                            onClick={() => images[index] && setSelectedImageIndex(index)}
                        >
                            <PictureCard
                                onCapture={handleImageCaptured}
                                index={index}
                            />
                        </div>
                    ))}
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex flex-col gap-1 lg:flex-row lg:justify-between lg:items-center">
                            <p className="bg-[#D9F2D0] font-semibold py-2 px-4 rounded">No. of Registered Voters</p>
                            <input
                                type="number"
                                value={formData.no_reg_voters ?? ""}
                                onChange={(e) => setFormData({ ...formData, no_reg_voters: parseInt(e.target.value) || 0 })}
                                className="p-1 border-2 border-gray-300 rounded lg:min-w-20"
                            />
                        </div>
                        <div className="flex flex-col gap-1 lg:flex-row lg:justify-between lg:items-center">
                            <p className="bg-[#D9F2D0] font-semibold py-2 px-4 rounded">No. of Voters who Voted</p>
                            <input
                                type="number"
                                value={formData.no_voters_voted ?? ""}
                                onChange={(e) => setFormData({ ...formData, no_voters_voted: parseInt(e.target.value) || 0 })}
                                className="p-1 border-2 border-gray-300 rounded lg:min-w-20"
                            />
                        </div>
                        <div className="flex flex-col gap-1 lg:flex-row lg:justify-between lg:items-center">
                            <p className="bg-[#D9F2D0] font-semibold py-2 px-4 rounded">No. of Ballots Cast</p>
                            <input
                                type="number"
                                value={formData.no_ballots_casted ?? ""}
                                onChange={(e) => setFormData({ ...formData, no_ballots_casted: parseInt(e.target.value) || 0 })}
                                className="p-1 border-2 border-gray-300 rounded lg:min-w-20"
                            />
                        </div>
                        <div className="flex flex-col gap-1 lg:flex-row lg:justify-between lg:items-center">
                            <p className="bg-[#D9F2D0] font-semibold py-2 px-4 rounded">No. of Ballots Delivered</p>
                            <input
                                type="number"
                                value={formData.no_ballots_diverted ?? ""}
                                onChange={(e) => setFormData({ ...formData, no_ballots_diverted: parseInt(e.target.value) || 0 })}
                                className="p-1 border-2 border-gray-300 rounded lg:min-w-20"
                            />
                        </div>

                        <button className="text-white font-semibold bg-[#275317] rounded text-lg py-2 cursor-pointer">Submit</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ERHeader