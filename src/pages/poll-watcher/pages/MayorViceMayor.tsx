import PictureCard from "../components/PictureCard";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import mayor_img from "@/assets/JOEY_SALTING.jpg"
import vice_mayor_img from "@/assets/JAJIE_SALES.jpg"

export type ERResult = {
    constest_code: number | null;
    candidate_code: number | null;
    pic1_b64: string;
    pic2_b64: string;
    pic3_b64: string;
    vps_er_header: number | null;
}

const NameCountHelper = ({
    name,
    value,
    onChange,
    partylist,
}: {
    value: string | number;
    onChange: (value: string | number) => void
    name: string;
    partylist: string;
}) => {
    const [formData, setFormData] = useState<ERResult>({
        candidate_code: null,
        constest_code: null,
        pic1_b64: "",
        pic2_b64: "",
        pic3_b64: "",
        vps_er_header: null
    })

    return (
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div className="w-full flex gap-4">
                <div className="bg-gray-100 text-[#232B1F] p-1 text-base lg:text-lg flex-[2]">
                    {name} ({partylist})
                </div>
                <div className="flex-1">
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full p-1 text-xl border-2 border-gray-300 flex-1 text-right"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    );
};


const MayorViceMayor = () => {
    const navigate = useNavigate()

    const [imagesMayor, setImagesMayor] = useState<Record<number, string | null>>({});
    const [imagesVice, setImagesVice] = useState<Record<number, string | null>>({});

    const handleImageMayorCaptured = (index: number, image: string | null) => {
        setImagesMayor(prev => ({ ...prev, [index]: image }));
    };

    return (
        <div className='w-full flex flex-col gap-5 p-5'>
            <button
                onClick={() => navigate("/app/poll-watcher")}
                className="flex items-center gap-4 bg-[#D9F2D0] w-fit py-2 px-4 rounded-md hover:bg-[#275317] hover:text-white transition-all ease-in-out duration-200 delay-100"
            >
                <FaArrowLeft />
                <span className="font-semibold">Home</span>
            </button>
            <div className='w-full flex flex-col lg:flex-row gap-10 lg:gap-4'>

                <div className="flex-1 flex flex-col gap-2">
                    <div className="bg-[#D9F2D0] p-2 rounded-lg">
                        <div className="bg-[#275317] text-white font-semibold py-2 text-center rounded-lg">
                            <div className="text-lg">MAYORIAL ELECTION RETURNS</div>
                        </div>
                    </div>

                    <div className="w-full bg-[#C2F1C8] text-center font-semibold text-[#002060] py-1 rounded-lg text-balance">
                        TAKE PHOTO OF ER FOR MAYOR OF TARLAC - BAMBAN
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-4">
                        {[0, 1, 2].map(index => (
                            <div
                                className={`flex-1 border-2 rounded-xl transition-all duration-200`}
                                key={index}
                            >
                                <PictureCard
                                    onCapture={handleImageMayorCaptured}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-1 mt-4">
                        <div className="flex-1">
                            <img src={mayor_img} alt="Image of Joey Salting (NPC)" />
                        </div>
                        <div className="flex-[2] flex flex-col gap-3">
                            <div className="flex gap-4">
                                <div className="bg-[#B4E5A2] text-[#232B1F] font-semibold lg:p-5 pt-1 pl-1 text-lg lg:text-2xl flex-[2]">
                                    SALTING, JOEY (NPC)
                                </div>
                                <div className="font-semibold lg:p-3 pt-1 pr-1 text-4xl border-2 border-gray-300 flex-1 text-right">0</div>
                            </div>

                            <NameCountHelper
                                value={0}
                                onChange={(val) => console.log(val)}
                                name="FELICIANO, JON"
                                partylist="IND"
                            />
                            <NameCountHelper
                                value={0}
                                onChange={(val) => console.log(val)}
                                name="ESCOTO, RODY​"
                                partylist="KBL"
                            />
                            <NameCountHelper
                                value={0}
                                onChange={(val) => console.log(val)}
                                name="TIMBANG, ERDY​"
                                partylist="PFP"
                            />
                            <NameCountHelper
                                value={0}
                                onChange={(val) => console.log(val)}
                                name="ERIBAL, BRYAN​"
                                partylist="PDPLBN"
                            />

                            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <div className="w-full flex gap-4">
                                    <div className="bg-[#4DA62E] text-white p-1 text-lg flex-[2]">
                                        TOTAL
                                    </div>
                                    <div className="p-1 text-xl border-2 border-gray-300 bg-[#D9F2D0] flex-1 text-right">0</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="flex-1 flex flex-col gap-2">
                    <div className="bg-[#D9F2D0] p-2 rounded-lg">
                        <div className="bg-[#6da758] text-white font-semibold py-2 text-center rounded-lg">
                            <div className="text-lg">VICE MAYORIAL ELECTION RETURNS</div>
                        </div>
                    </div>

                    <div className="w-full bg-[#D9F2D0] text-center font-semibold text-[#275317] py-1 rounded-lg text-balance">
                        TAKE PHOTO OF ER FOR MAYOR OF TARLAC - BAMBAN
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
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-1 mt-4">
                        <div className="flex-1">
                            <img src={vice_mayor_img} alt="Image of Joey Salting (NPC)" />
                        </div>
                        <div className="flex-[2] flex flex-col gap-[0.6rem]">
                            <div className="flex gap-4">
                                <div className="bg-[#D9F2D0] text-[#1C1F1B] font-semibold lg:p-5 pt-1 pl-1 text-lg lg:text-2xl flex-[2]">
                                    SALES, JAJIE (NPC)
                                </div>
                                <div className="font-semibold lg:p-3 pt-1 pr-1 text-4xl border-2 border-gray-300 flex-1 text-right">0</div>
                            </div>

                            <NameCountHelper
                                value={0}
                                onChange={(val) => console.log(val)}
                                name="FELICIANO, JON"
                                partylist="IND"
                            />
                            <NameCountHelper
                                value={0}
                                onChange={(val) => console.log(val)}
                                name="ESCOTO, RODY​"
                                partylist="KBL"
                            />
                            <NameCountHelper
                                value={0}
                                onChange={(val) => console.log(val)}
                                name="TIMBANG, ERDY​"
                                partylist="PFP"
                            />

                            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <div className="w-full flex gap-4">
                                    <div className="bg-[#4DA62E] text-white p-1 text-lg flex-[2]">
                                        TOTAL
                                    </div>
                                    <div className="p-1 text-xl border-2 border-gray-300 bg-[#D9F2D0] flex-1 text-right">0</div>
                                </div>
                            </div>

                            <button className="w-full text-white font-semibold bg-[#275317] rounded text-lg py-2 cursor-pointer">Submit</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MayorViceMayor