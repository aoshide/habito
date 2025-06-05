"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import LogoAnName from "../Components/LogoAnName";

function Navbar() {
  const { userId } = useAuth();
  const defaultColor = "#651FFF";
  const backgroundColorObject = { backgroundColor: defaultColor };

  return (
    <header className="overlay nav container">
      <div className="flex items-center justify-between w-full">
        <div className="text-center sm:text-left">
          <LogoAnName />
        </div>
        <div>
          {userId ? (
            <Link href={"/dashboard"}>
              <button
                style={backgroundColorObject}
                className="btn btn-primary hover-scale"
                type="button"
              >
                Dashboard
              </button>
            </Link>
          ) : (
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link href={"/sign-in"}>
                <button
                  style={backgroundColorObject}
                  className="btn btn-primary hover-scale"
                  type="button"
                >
                  Sign In
                </button>
              </Link>
              <Link href={"/sign-up"}>
                <button
                  className="btn btn-secondary hover-scale"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;