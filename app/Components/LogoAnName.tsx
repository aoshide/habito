import React from "react";
import Image from "next/image";
import { defaultColor } from "@/colors";

function LogoAnName() {
  return (
    <div className="flex gap-2 items-center sm:justify-start justify-center">
      <span className="text-2xl font-light flex items-center gap-2 ">
        {/* The Icon */}
        <div
          style={{ backgroundColor: defaultColor.default }}
          className="p-2 rounded-md"
        >
          <Image
            src="/favicon.ico"
            alt="App Icon"
            width={34}
            height={34}
            priority
          />
        </div>
        {/* The Name of the app */}
        <span
          style={{ color: defaultColor.default }}
          className="font-bold text-mainColor"
        >
          Adat
        </span>
        <span className="font-light"> Tracker</span>
      </span>
    </div>
  );
}

export default LogoAnName;
