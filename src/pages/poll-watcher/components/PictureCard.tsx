import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import { FaRegImage } from "react-icons/fa6";

type OnCapture = (index: number, image: string) => void;

type Props = {
    index: number;
    onCapture: OnCapture;
}

const PictureCard = ({ index, onCapture }: Props) => {
    const webcamRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const handleCapture = () => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
            if (screenshot) {
                setCapturedImage(screenshot);
                setIsCameraOpen(false);
                onCapture(index, screenshot); // <-- Notify parent
            }
        }
    };

    const toggleCamera = () => {
        // Camera icon always opens camera in fullscreen
        setIsCameraOpen(true);
        setIsImageFullscreen(false); // Ensure image fullscreen is off
    };

    const toggleImageFullscreen = () => {
        // Only toggle fullscreen for the image, not the camera
        if (!isCameraOpen && capturedImage) {
            setIsImageFullscreen(prev => !prev);
        }
    };

    return (
        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100 shadow-md">
            {/* Normal View - Captured Image or Placeholder */}
            {!isImageFullscreen && (
                <>
                    {capturedImage ? (
                        <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-black bg-[#B0FFA2]">
                            <FaRegImage size={50} />
                        </div>
                    )}

                    {/* Camera Icon (Bottom left) */}
                    <button
                        className="absolute bottom-2 left-2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition cursor-pointer"
                        onClick={toggleCamera}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                            <circle cx="12" cy="13" r="3" />
                        </svg>
                    </button>

                    {/* Fullscreen Icon (Bottom right) - Only active when image exists */}
                    <button
                        className={`absolute bottom-2 right-2 bg-white rounded-full p-2 shadow transition ${capturedImage ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={toggleImageFullscreen}
                        disabled={!capturedImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                    </button>
                </>
            )}

            {/* Image Fullscreen Modal */}
            <AnimatePresence>
                {isImageFullscreen && capturedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                    >
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            onClick={() => setIsImageFullscreen(false)}
                            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Camera Fullscreen Modal */}
            <AnimatePresence>
                {isCameraOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                    >
                        <div className="relative w-full h-full">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-contain"
                                videoConstraints={{
                                    facingMode: "environment",
                                }}
                            />
                            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                                <button
                                    onClick={handleCapture}
                                    className="bg-white p-4 rounded-full shadow-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PictureCard;