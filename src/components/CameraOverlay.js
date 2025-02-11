import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import Webcam from "react-webcam";
import { IoClose } from "react-icons/io5";
import { TbCapture } from "react-icons/tb";

function CameraOverlay({ setShowCamera, capturePhoto, webcamRef }) {
    const canvasRef = useRef(null);
    const [isFaceAligned, setIsFaceAligned] = useState(false);

    useEffect(() => {
        const runFaceDetection = async () => {
            const model = await blazeface.load();
            const detectFace = async () => {
                if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                    const video = webcamRef.current.video;
                    const videoWidth = video.videoWidth;
                    const videoHeight = video.videoHeight;

                    // Set canvas size
                    const canvas = canvasRef.current;
                    canvas.width = videoWidth;
                    canvas.height = videoHeight;
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, videoWidth, videoHeight);

                    // Detect face
                    const predictions = await model.estimateFaces(video, false);
                    if (predictions.length > 0) {
                        const { topLeft, bottomRight } = predictions[0];
                        const [x1, y1] = topLeft;
                        const [x2, y2] = bottomRight;

                        // Face dimensions
                        const faceWidth = x2 - x1;
                        const faceHeight = y2 - y1;
                        const faceCenterX = x1 + faceWidth / 2;
                        const faceCenterY = y1 + faceHeight / 2;

                        // Guide box dimensions
                        const guideBoxX = videoWidth * 0.3;
                        const guideBoxY = videoHeight * 0.2;
                        const guideBoxWidth = videoWidth * 0.4;
                        const guideBoxHeight = videoHeight * 0.5;

                        // Check if face is inside guide box
                        const isCentered =
                            faceCenterX > guideBoxX &&
                            faceCenterX < guideBoxX + guideBoxWidth &&
                            faceCenterY > guideBoxY &&
                            faceCenterY < guideBoxY + guideBoxHeight;

                        setIsFaceAligned(isCentered);

                        // Draw Guide Box
                        ctx.strokeStyle = isCentered ? "green" : "red";
                        ctx.lineWidth = 4;
                        ctx.strokeRect(guideBoxX, guideBoxY, guideBoxWidth, guideBoxHeight);
                    } else {
                        setIsFaceAligned(false);
                    }
                    requestAnimationFrame(detectFace);
                }
            };
            detectFace();
        };
        runFaceDetection();
    }, [webcamRef]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-transparent p-5 rounded-lg shadow-lg text-center">
                {/* Close Button */}
                <button
                    onClick={() => setShowCamera(false)}
                    className="absolute right-5 text-white bg-[#00000033] hover:bg-gray-600 p-2 rounded-full"
                >
                    <IoClose className="text-white" />
                </button>

                {/* Camera & Guide Box */}
                <div className="relative w-[300px] h-[400px] flex items-center justify-center">
                    <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-full rounded-lg" />
                    <canvas ref={canvasRef} className="absolute w-full h-full" />
                    {!isFaceAligned && (
                        <p className="absolute bottom-0 text-red-500 bg-white p-2 rounded">Make sure your face is centered</p>
                    )}
                </div>

                {/* Capture Button */}
                <button
                    onClick={capturePhoto}
                    className={`text-white p-2.5 rounded-full mt-2 ${
                        isFaceAligned ? "bg-red-700 hover:bg-red-800" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!isFaceAligned}
                >
                    <TbCapture className="text-2xl" />
                </button>
            </div>
        </div>
    );
}

export default CameraOverlay;
