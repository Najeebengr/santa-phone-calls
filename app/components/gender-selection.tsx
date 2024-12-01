'use client'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function GenderSelection({ index, setValue }: { index: number, setValue: (path: string, value: "Male" | "Female") => void }) {
  return (
    <div className="my-2 gap-5 flex items-center justify-between">
      <div className="basis-[95%]">
        <label
          className="text-lg font-semibold font-seasons"
          style={{ textShadow: "0 0 20px #FCCC73" }}
        >
          Gender
        </label>
        <RadioGroup
          defaultValue="Male"
          className="flex flex-row items-center gap-6 mt-2 px-4"
          onValueChange={(value) => {
            setValue(
              `children.${index}.gender`,
              value as "Male" | "Female"
            );
          }}
        >
          <div className="flex items-center gap-1.5">
            <RadioGroupItem
              value="Male"
              id={`male-${index}`}
              className="w-[17px] h-[17px] border-[#827E4B] bg-white data-[state=checked]:bg-[#00E66C]"
            />
            <Label
              htmlFor={`male-${index}`}
              className="font-harmonia text-white text-[14px] leading-[17px] font-normal"
            >
              Male
            </Label>
          </div>
          <div className="flex items-center gap-1.5">
            <RadioGroupItem
              value="Female"
              id={`female-${index}`}
              className="w-[17px] h-[17px] border-[#827E4B] bg-white data-[state=checked]:bg-[#00E66C]"
            />
            <Label
              htmlFor={`female-${index}`}
              className="font-harmonia text-white text-[14px] leading-[17px] font-normal"
            >
              Female
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

