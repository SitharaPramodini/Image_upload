import React, { useState, useRef } from "react";

function Home() {
    const [stream, setStream] = useState(null);
    const [image, setImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageData = canvasRef.current.toDataURL("image/png");
            setImage(imageData);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    return (
        <div className="container max-w-full pt-3 pb-14 bg-[#f4f8fb] w-full absolute rounded-t-3xl h-auto">
            <form className="mx-8 my-8">
                {/* Other input fields */}

                <div className="relative z-0 w-full mb-5 group">
                    <button type="button" onClick={openCamera} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                        Take Your Picture
                    </button>
                </div>

                {stream && (
                    <div className="relative">
                        <video ref={videoRef} autoPlay className="w-full h-auto" />
                        <button type="button" onClick={captureImage} className="mt-2 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5">
                            Capture Image
                        </button>
                    </div>
                )}

                {image && (
                    <div className="mt-4">
                        <img src={image} alt="Captured" className="w-full h-auto" />
                        <input type="hidden" name="captured_image" value={image} />
                    </div>
                )}

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                    Submit
                </button>
            </form>

            <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480} />
        </div>
    );
}

export default Home;
