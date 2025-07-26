import React from 'react'
import Image from "next/image";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg.jpg";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
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
            <Footer />
        </>
    )
}

export default HomePage