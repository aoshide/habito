"use client";

import React from "react";
import { useRouter } from "next/navigation";

function HeroSection() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="container flex justify-center items-center min-h-[500px] py-16 overflow-hidden relative z-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-hero">
          Build the habits that <span className="text-primary">matter!</span>
        </span>
        <p className="text-subhero">
          Feeling overwhelmed? Our easy-to-use habit tracker helps you take control of your day and achieve your goals.
        </p>
        <button
          onClick={handleClick}
          className="btn btn-primary hover-scale"
          type="button"
        >
          {`Let's get started!`}
        </button>
      </div>
    </div>
  );
}

export default HeroSection;