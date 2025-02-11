import React, { useRef, useState } from "react";
import Header from "./Header";
import Webcam from "react-webcam";
import { IoMdReverseCamera } from "react-icons/io";
import { FaCamera } from "react-icons/fa6";
import { TbCapture } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

function Home() {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    const openCamera = () => {
        setShowCamera(true);
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setShowCamera(false);
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        setShowCamera(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (capturedImage) {
            formData.append("photo", capturedImage);
        }

        console.log("Form submitted", Object.fromEntries(formData));
    };

    return (
        <div>
            <Header />

            <div className="container mt-[6rem] max-w-full pt-3 pb-14 bg-[#f4f8fb] w-full absolute rounded-t-3xl h-auto">
                <form className="mx-8 pt-6" onSubmit={handleSubmit}>

                    <div class="relative z-0 w-full mb-5 group">
                        <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                        </div>

                    </div>


                    {/* <div class="flex flex-row items-center">
                            <p class="absolute text-lg text-gray-500 dark:text-gray-400 top-3 -z-10 ">Take your photo</p>
                            <FaCamera />
                        </div> */}

                    <div className="text-center">
                        {capturedImage ? (
                            <div className="flex flex-row items-center gap-6">
                                <img src={capturedImage} alt="Captured" className="w-auto h-40 mt-4" />
                                <button onClick={openCamera} className="text-white bg-[#00000033] hover:bg- p-2.5 rounded-full mt-2"><IoMdReverseCamera /></button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <p class="text-sm text-gray-500 dark:text-gray-400 ">Take your photo</p>
                                <button onClick={openCamera} className="bg-[#00000033] rounded-full w-auto p-3"><FaCamera className="" /></button>
                            </div>
                        )}
                    </div>
                    {showCamera && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-transparent p-5 rounded-lg shadow-lg text-center">
                                <button onClick={() => setShowCamera(false)} className="absolute right-5 text-white bg-[#00000033] hover:bg-gray-600 p-2 rounded-full rounded-tr-none"><IoClose className="text-white" /></button>

                                <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-auto" />
                                <button onClick={capturePhoto} className="text-white bg-red-700 hover:bg-red-800 p-2.5 rounded-full mt-2"><TbCapture className="text-2xl" /></button>
                            </div>
                        </div>
                    )}

                    <button type="submit" class="mt-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
