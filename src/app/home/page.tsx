import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Roboto_Slab, Inter } from "next/font/google";
import Typewriter from "@/components/text-animation/typewritter";
import ppiOlympic from "../../../public/assets/ppi-olym.png";
import indoFest from "../../../public/assets/indo-fest.png";
import hikingPermisi from "../../../public/assets/hiking-permisi.png";
import welcomingFeshman from "../../../public/assets/welcoming-freshman.png";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: "700",
});

const fontInter = Inter({
  subsets: ["latin"],
});

const styles = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  .bounce-letter {
    display: inline-block;
    animation: bounce 1.5s ease infinite;
  }
`;

const HomePage = () => {
  const permisiText = "PERMISI";

  const animatedLetters = permisiText.split("").map((letter, index) => (
    <span
      key={index}
      className="bounce-letter"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
            {/* Headings */}
            <Typewriter
              text={["Hi there!", "Welcome to"]}
              speed={100}
              className={`text-4xl md:text-6xl font-bold mb-3 text-gray-800 ${fontInter.className}`}
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={"_"}
            />
            <style>{styles}</style>
            <h2
              className={`text-6xl md:text-8xl font-bold text-red-700 mb-6 ${robotoSlab.className}`}
            >
              {animatedLetters}
            </h2>
            <p
              className={`text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto ${robotoSlab.className}`}
            >
              Indonesian Students Association in City University of Hong Kong
            </p>

            {/* Photo Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <div className="relative aspect-video w-full h-auto min-h-[200px]">
                <Image
                  src={ppiOlympic}
                  alt="Group activity"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative aspect-video w-full h-auto min-h-[200px]">
                <Image
                  src={indoFest}
                  alt="Group activity"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative aspect-video w-full h-auto min-h-[200px]">
                <Image
                  src={welcomingFeshman}
                  alt="Group activity"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative aspect-video w-full h-auto min-h-[200px]">
                <Image
                  src={hikingPermisi}
                  alt="Group activity"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PERMISI description */}
        <section className="py-20 bg-white"></section>

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
