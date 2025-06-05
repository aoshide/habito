'use client';

import HeroSection from "./mainPageComponents/HeroSection";
import Navbar from "./mainPageComponents/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="page-container relative">
      {/* Фоновые блобы */}
      <div className="blob-background blob-background-lg top-[-100px] left-[-100px] animate-blob1 stagger-1"></div>
      <div className="blob-background blob-background-md bottom-[-150px] right-[-150px] animate-blob2 stagger-2"></div>
      <div className="blob-background blob-background-sm top-[100px] left-[100px] animate-blob3 stagger-3"></div>
      <div className="blob-background blob-background-md top-[200px] right-[50px] animate-blob4 stagger-4"></div>
      {/* Сверкающие линии */}
      <div className="sparkle-line w-[200px] top-[10%] left-[5%] rotate-45"></div>
      <div className="sparkle-line w-[150px] bottom-[15%] right-[10%] rotate-[-30deg]"></div>
      <div className="sparkle-line w-[180px] top-[50%] left-[20%] rotate-90"></div>
      <div className="sparkle-line w-[120px] top-[30%] right-[5%] rotate-15"></div>
      <Navbar />
      <HeroSection />
      <div className="flex w-full justify-center mt-20 relative z-10">
        <Image
          src="/app.jpg"
          alt="dashboard"
          width={900}
          height={400}
          className="shadow-custom aspect-auto sm:w-full w-[398px] rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />
      </div>
    </div>
  );
}