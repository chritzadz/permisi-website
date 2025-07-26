import React from "react";
import Image from "next/image";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg.jpg";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Roboto_Slab, Inter } from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: "700",
});

const fontInter = Inter({
  subsets: ["latin"],
});

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <section className="bg-gradient-to-b from-red-50 to-white py-30">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-3 text-gray-800 ${fontInter.className}`}>
              Welcome to
            </h1>
            <h2
              className={`text-6xl md:text-8xl font-bold text-red-700 mb-6 ${robotoSlab.className}`}
            >
              PERMISI HK
            </h2>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
