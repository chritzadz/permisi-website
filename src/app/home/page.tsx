import React from "react";
import Image from "next/image";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg.jpg";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Roboto_Slab, Inter } from "next/font/google";
import Typewriter from "@/components/text-animation/typewritter";

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
        <section className="bg-gradient-to-b from-red-50 to-white py-30">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
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
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
