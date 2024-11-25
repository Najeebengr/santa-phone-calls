import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

function Form_Two() {
  return (
    <div
      style={{
        background:
          "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
        border: "3px solid #D9C999CC",
        boxShadow: "0px 0px 40px 0px #00000080 inset",
      }}
      className="xl:w-[55vw] rounded-lg py-5 px-5 lg:[73vw] mx-auto"
    >
      <form action="" className="text-white">
        <div>
          <label
            style={{ textShadow: "0 0 20px #FCCC73" }}
            htmlFor=""
            className=" text-lg font-semibold font-seasons"
          >
            Child’s Name
          </label>
          <input
            type="text"
            placeholder="Child's Name"
            className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
          />
        </div>
        <div className="my-2 gap-5 flex items-center justify-between">
          <div className="basis-[95%]">
            <label
              style={{ textShadow: "0 0 20px #FCCC73" }}
              htmlFor=""
              className=" text-lg font-semibold font-seasons"
            >
              Gender
            </label>
            <Select>
              <SelectTrigger className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full  h-full rounded-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent className="bg-[#554735] text-white font-harmonia">
                <SelectItem className="bg-[#554735] text-white" value="Male">
                  Male
                </SelectItem>
                <SelectItem className="bg-[#554735] text-white" value="Female">
                  Female
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              style={{ textShadow: "0 0 20px #FCCC73" }}
              htmlFor=""
              className=" text-lg font-semibold font-seasons"
            >
              Age
            </label>
            <input
              type="number"
              placeholder="Age"
              className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form_Two;
