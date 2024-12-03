"use client";

import React from "react";
import Image from "next/image";
import FormTwo from "./FormTwo";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
function InfoFormWrapper({
  userInfo,
}: {
  userInfo: { parentName: string; parentEmail: string; parentNumber: string };
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
        border: "3px solid #D9C999CC",
        boxShadow: "0px 0px 40px 0px #00000080 inset",
      }}
      className="xl:w-[55vw] lg:w-[73vw] relative rounded-lg py-5 px-8 mx-auto mb-20"
    >
      <Link href={"/"}>
        <button
          style={{
            background:
              "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
            border: "3px solid #a5494d ",
            boxShadow: "0px 0px 40px 0px #D9C99966",
          }}
          className="w-fit relative z-10 font-seasons text-base md:text-xl mt-2 mb-6 flex justify-start items-center gap-2 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[0.99] active:scale-[0.97] "
        >
          <FaArrowLeft />
          Back to Step 1
        </button>
      </Link>
      <FormTwo userInfo={userInfo} />

      <div className="relative">
        <Image
          src="/corner_left.png"
          width={170}
          height={130}
          alt="corner"
          className="absolute bottom-0 left-0 transform -translate-x-[18.5%] translate-y-[13.5%]"
        />
        <Image
          src="/corner_right.png"
          width={170}
          height={130}
          alt="corner"
          className="absolute bottom-0 right-0 transform translate-x-[18.5%] translate-y-[13.5%]"
        />
      </div>
    </div>
  );
}

export default InfoFormWrapper;
