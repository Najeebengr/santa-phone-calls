import React from 'react';
import InputField from './InputField';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ChildInfoSection: React.FC = () => {
  return (
    <>
      <InputField label="Child’s Name" placeholder="Child's Name" />
      <div className="my-2 gap-5 flex items-center justify-between">
        <div className="basis-[95%]">
          <label
            className="text-lg font-semibold font-seasons"
            style={{ textShadow: "0 0 20px #FCCC73" }}
          >
            Gender
          </label>
          <Select>
            <SelectTrigger className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent className="bg-[#554735] text-white font-harmonia">
              <SelectItem value="Male" className="bg-[#554735] text-white">Male</SelectItem>
              <SelectItem value="Female" className="bg-[#554735] text-white">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <InputField label="Age" placeholder="Age" type="number" />
      </div>
    </>
  );
};

export default ChildInfoSection;