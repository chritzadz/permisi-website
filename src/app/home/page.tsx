import React from 'react'
import Image from "next/image";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg.jpg";

const HomePage = () => {
    return (
        <>
            <div className="h-full">
                <div className="">
                    <Image
                        src={sunsetHikeBg}
                        className="w-full h-fit"
                        alt="bg-main-1"
                    ></Image>
                </div>
                <div className="flex justify-center p-15">
                    <h1 className="font-bold text-8xl">WELCOME BLA BLA BLA</h1>
                </div>
                
            </div>
        </>
    )
}

export default HomePage