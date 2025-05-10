import PictureCard from "../components/PictureCard";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import mayor_img from "@/assets/JOEY_SALTING.jpg"
import vice_mayor_img from "@/assets/JAJIE_SALES.png"
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCandidates, postERResult } from "../queries";
import { useERHeaderStatusStore } from "@/store/useERHeaderStatusStore";
import NameCountHelper from "../components/NameCountHelper";
import { toast } from "sonner";

export type ERResult = {
    contest_code: number | null;
    candidate_code: number | null;
    pic1_b64: string;
    pic2_b64: string;
    pic3_b64: string;
    vps_er_header: number | null;
    no_votes: number | null;
}

const MayorViceMayor = () => {
    const navigate = useNavigate()
    const vpsErHeader = useERHeaderStatusStore()?.vpsErHeader
    const [selectedMayor, setSelectedMayor] = useState<number | null>(null);
    const [selectedViceMayor, setSelectedViceMayor] = useState<number | null>(null);

    // Add state to track vote counts
    const [mayorVotes, setMayorVotes] = useState({});
    const [viceVotes, setViceVotes] = useState({});

    const [formDataMayor, setFormDataMayor] = useState<ERResult>({
        candidate_code: null,
        contest_code: null,
        pic1_b64: "",
        pic2_b64: "",
        pic3_b64: "",
        vps_er_header: null,
        no_votes: null,
    })

    const [formDataVice, setFormDataVice] = useState<ERResult>({
        candidate_code: null,
        contest_code: null,
        pic1_b64: "",
        pic2_b64: "",
        pic3_b64: "",
        vps_er_header: null,
        no_votes: null,
    })

    const [imagesMayor, setImagesMayor] = useState<Record<number, string | null>>({});
    const [imagesVice, setImagesVice] = useState<Record<number, string | null>>({});

    // Handle vote input changes for Mayor
    const handleMayorVoteChange = (candidateCode: number, value: string) => {
        const newMayorVotes = Object.keys(mayorVotes).reduce((acc, key) => {
            acc[+key] = '0'; // Reset other votes to 0
            return acc;
        }, {} as Record<number, string>);

        if (value !== '' && parseInt(value, 10) > 0) {
            newMayorVotes[candidateCode] = value;
            setSelectedMayor(candidateCode);
        } else {
            setSelectedMayor(null);
        }
        setMayorVotes(newMayorVotes);
    };

    // Handle vote input changes for Vice Mayor
    const handleViceVoteChange = (candidateCode: number, value: string) => {
        const newViceVotes = Object.keys(viceVotes).reduce((acc, key) => {
            acc[+key] = '0'; // Reset other votes to 0
            return acc;
        }, {} as Record<number, string>);

        if (value !== '' && parseInt(value, 10) > 0) {
            newViceVotes[candidateCode] = value;
            setSelectedViceMayor(candidateCode);
        } else {
            setSelectedViceMayor(null);
        }
        setViceVotes(newViceVotes);
    };

    const handleImageMayorCaptured = (index: number, image: string | null) => {
        setImagesMayor(prev => ({ ...prev, [index]: image }));
    };

    const handleImageViceCaptured = (index: number, image: string | null) => {
        setImagesVice(prev => ({ ...prev, [index]: image }));
    };

    // Calculate totals
    const calculateMayorTotal = () => {
        return Object.values(mayorVotes).reduce((sum: number, vote) => sum + (Number(vote) || 0), 0);
    };

    const calculateViceTotal = () => {
        return Object.values(viceVotes).reduce((sum: number, vote) => sum + (Number(vote) || 0), 0);
    };

    const { data: candidates } = useQuery({
        queryKey: ['candidate', ['mayor-vice-mayor']],
        queryFn: () => getCandidates()
    })

    useEffect(() => {
        const stripPrefix = (data: string | null): string =>
            typeof data === "string"
                ? data.replace(/^data:image\/\w+;base64,/, "")
                : "";

        setFormDataMayor(prev => ({
            ...prev,
            pic1_b64: stripPrefix(imagesMayor[0]),
            pic2_b64: stripPrefix(imagesMayor[1]),
            pic3_b64: stripPrefix(imagesMayor[2]),
        }));
    }, [imagesMayor]);

    useEffect(() => {
        const stripPrefix = (data: string | null): string =>
            typeof data === "string"
                ? data.replace(/^data:image\/\w+;base64,/, "")
                : "";

        setFormDataVice(prev => ({
            ...prev,
            pic1_b64: stripPrefix(imagesVice[0]),
            pic2_b64: stripPrefix(imagesVice[1]),
            pic3_b64: stripPrefix(imagesVice[2]),
        }));
    }, [imagesVice]);

    useEffect(() => {
        setFormDataMayor(prev => ({
            ...prev,
            vps_er_header: vpsErHeader
        }))
        setFormDataVice(prev => ({
            ...prev,
            vps_er_header: vpsErHeader
        }))
    }, [vpsErHeader])

    useEffect(() => {
        if (!selectedMayor) {
            return;
        }

        const chosenMayor = candidates?.find(
            candidate => candidate?.candidate_code === String(selectedMayor)
        );

        if (!chosenMayor) {
            return;
        }

        const no_votes = mayorVotes[selectedMayor] || '0';

        setFormDataMayor((prev) => ({
            ...prev,
            candidate_code: Number(chosenMayor.candidate_code) || null,
            contest_code: Number(chosenMayor.contest_code) || null,
            no_votes: Number(no_votes) || null,
        }));
    }, [candidates, selectedMayor, mayorVotes]);

    useEffect(() => {
        if (!selectedViceMayor) {
            return;
        }

        const chosenVice = candidates?.find(
            candidate => candidate?.candidate_code === String(selectedViceMayor)
        );

        if (!chosenVice) {
            return;
        }

        const no_votes = viceVotes[selectedViceMayor] || '0';

        setFormDataVice((prev) => ({
            ...prev,
            candidate_code: Number(chosenVice.candidate_code) || null,
            contest_code: Number(chosenVice.contest_code) || null,
            no_votes: Number(no_votes) || null,
        }));
    }, [candidates, selectedViceMayor, viceVotes]);

    const submitMutation = useMutation({
        mutationKey: ['submit', 'er-header'],
        mutationFn: ({ formdata }: { formdata: ERResult }) => postERResult(formdata),
        onSuccess: () => {
            toast.success("Submitted!")
        },
        onError: (err) => toast.error(err.message)
    })

    const handleSubmit = () => {
        submitMutation.mutate({ formdata: formDataMayor })
        submitMutation.mutate({ formdata: formDataVice })
    }

    console.log(viceVotes)
    console.log(formDataVice)

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
                            {candidates
                                ?.filter((c) => c.contest_code.startsWith("0086"))
                                .map((candidate) =>
                                    candidate.candidate_name.toUpperCase().includes("SALTING, JOEY") ? (
                                        <div key={candidate.id} className="flex gap-4">
                                            <div className="bg-[#B4E5A2] text-[#232B1F] font-semibold lg:p-5 pt-1 pl-1 text-lg lg:text-2xl flex-[2]">
                                                SALTING, JOEY (NPC)
                                            </div>
                                            <input
                                                type="number"
                                                min="0"
                                                value={mayorVotes[candidate.candidate_code] || ""}
                                                onChange={(e) => handleMayorVoteChange(+candidate.candidate_code, e.target.value)}
                                                className="font-semibold text-xl lg:text-4xl text-right border-2 border-gray-300 bg-white pt-1 pr-1 w-24 lg:w-52 px-2 rounded-none focus:outline-none"
                                            />
                                        </div>
                                    ) : (
                                        <NameCountHelper
                                            key={candidate.id}
                                            value={mayorVotes[candidate.candidate_code] || ""}
                                            onChange={(e) => handleMayorVoteChange(+candidate.candidate_code, e.target.value)}
                                            name={candidate.candidate_name}
                                        />
                                    )
                                )}

                            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <div className="w-full flex gap-4">
                                    <div className="bg-[#4DA62E] text-white p-1 text-lg flex-[2]">
                                        TOTAL
                                    </div>
                                    <div className="p-1 text-xl border-2 border-gray-300 bg-[#D9F2D0] flex-1 text-right">{calculateMayorTotal()}</div>
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
                        TAKE PHOTO OF ER FOR VICE MAYOR OF TARLAC - BAMBAN
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-4">
                        {[0, 1, 2].map(index => (
                            <div
                                className={`flex-1 border-2 rounded-xl transition-all duration-200`}
                                key={index}
                            >
                                <PictureCard
                                    onCapture={handleImageViceCaptured}
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
                            {candidates
                                ?.filter((c) => c.contest_code.startsWith("0096"))
                                .map((candidate) =>
                                    candidate.candidate_name.toUpperCase().includes("SALES, JAJIE") ? (
                                        <div key={candidate.id} className="flex gap-4">
                                            <div className="bg-[#B4E5A2] text-[#232B1F] font-semibold lg:p-5 pt-1 pl-1 text-lg lg:text-2xl flex-[2]">
                                                SALES, JAJIE (NPC)
                                            </div>
                                            <input
                                                type="number"
                                                min="0"
                                                value={viceVotes[candidate.candidate_code] || ""}
                                                onChange={(e) => handleViceVoteChange(+candidate.candidate_code, e.target.value)}
                                                className="font-semibold text-xl lg:text-4xl text-right border-2 border-gray-300 bg-white pt-1 pr-1 w-24 lg:w-52 px-2 rounded-none focus:outline-none"
                                            />
                                        </div>
                                    ) : (
                                        <NameCountHelper
                                            key={candidate.id}
                                            value={viceVotes[candidate.candidate_code] || ""}
                                            onChange={(e) => handleViceVoteChange(+candidate.candidate_code, e.target.value)}
                                            name={candidate.candidate_name}
                                        />
                                    )
                                )}

                            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <div className="w-full flex gap-4">
                                    <div className="bg-[#4DA62E] text-white p-1 text-lg flex-[2]">
                                        TOTAL
                                    </div>
                                    <div className="p-1 text-xl border-2 border-gray-300 bg-[#D9F2D0] flex-1 text-right">{calculateViceTotal()}</div>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full text-white font-semibold bg-[#275317] rounded text-lg py-2 cursor-pointer">
                                Submit
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MayorViceMayor