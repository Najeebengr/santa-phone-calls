'use client'

import React from "react";
import Image from "next/image";
import FormTwo from "./FormTwo";

function InfoFormWrapper() {
 
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
     <FormTwo />
      
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
