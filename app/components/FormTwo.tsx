"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  generateId,
  step2Schema,
  type Step2FormData,
} from "@/lib/validation/schema";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { CustomCalendar } from "../components/custom-calendar";
import { plans } from "../lib/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Loader from "./Loader";
import { Checkbox } from "@/components/ui/checkbox";

interface UserInfo {
  parentName: string;
  parentEmail: string;
  parentNumber: string;
}

interface FormTwoProps {
  userInfo?: UserInfo;
}

interface ParentData {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

interface CheckoutData {
  totalAmount: number;
  id: string;
  price: number;
  planId: number;
  packageName: string;
  planName: string;
  hasRecording: boolean;
  selectedSlot: string;
  selectedTimezone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  children: {
    id: string;
    name: string;
    age: number;
    gender: "Male" | "Female";
    connections: string;
    details: string;
    hobbies: string;
  }[];
  callNow: boolean;
  when: number;
  recipientName: string;
  recipientPhone: string;
}

const parseCustomDateFormat = (dateString: string): Date => {
  const dateTimeParts = dateString.match(
    /(\d+)(AM|PM)\s+(\w+)\s+(\d+)\s+(\d+)/i,
  );
  if (!dateTimeParts) throw new Error("Invalid date/time format");

  const [, hour, meridiem, month, day, year] = dateTimeParts;
  const months: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const date = new Date();
  date.setFullYear(parseInt(year));
  date.setMonth(months[month]);
  date.setDate(parseInt(day));

  let hourNum = parseInt(hour);
  if (meridiem.toUpperCase() === "PM" && hourNum !== 12) hourNum += 12;
  else if (meridiem.toUpperCase() === "AM" && hourNum === 12) hourNum = 0;

  date.setHours(hourNum, 0, 0, 0);
  return date;
};

function FormTwo({ userInfo }: FormTwoProps) {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sendAsGift, setSendAsGift] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parentData, setParentData] = useState<ParentData | null>(null);

  const formId = useMemo(() => crypto.randomUUID(), []);

  const defaultValues = useMemo(
    () => ({
      id: formId,
      children: [
        {
          id: crypto.randomUUID(),
          name: "",
          gender: "Male" as const,
          age: 1,
          connections: "",
          details: "",
          hobbies: "",
        },
      ],
      callType: "Immediate" as const,
      recipientName: "",
      recipientPhone: "",
      scheduledDate: "",
      scheduledTime: "",
    }),
    [formId],
  );

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const formatDateTime = useCallback((selectedTime: string) => {
    try {
      const scheduledDate = selectedTime.includes("T")
        ? new Date(selectedTime)
        : parseCustomDateFormat(selectedTime);

      const formattedDateTime = scheduledDate.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      const hoursUntil = Math.max(
        0,
        Math.ceil(
          (scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60),
        ),
      );

      return { formattedDateTime, hoursUntil };
    } catch (error) {
      console.error("Date formatting error:", error);
      return { formattedDateTime: "", hoursUntil: 0 };
    }
  }, []);

  // Replace the existing calculatePrice function with this:
  const calculatePrice = useCallback(() => {
    // Always use plan[1] as the default package
    const plan = plans[1];
    return {
      price: plan.price,
      planId: plan.id,
      planName: plan.name,
    };
  }, []);

  const addAnotherChild = useCallback(() => {
    if (fields.length >= 5) {
      toast.error("You can add a maximum of 5 children.");
      return;
    }
    append({
      id: generateId(),
      name: "",
      gender: "Male",
      age: 1,
      connections: "",
      details: "",
      hobbies: "",
    });
  }, [fields.length, append]);

  useEffect(() => {
    async function fetchParentData() {
      if (userInfo) {
        setParentData({
          parentName: userInfo.parentName,
          parentEmail: userInfo.parentEmail,
          parentPhone: userInfo.parentNumber,
        });
      } else if (typeof window !== "undefined") {
        try {
          const storedData = await Promise.resolve(
            localStorage.getItem("userFormData"),
          );
          if (!storedData) throw new Error("Missing Step 1 Data");

          setParentData(JSON.parse(storedData));
        } catch (error) {
          console.error("Error loading user data:", error);
          toast.error("Please complete step 1 first");
          router.push("/");
        }
      }
    }

    fetchParentData();
  }, [userInfo, router]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, error]) => {
        if (error?.message) toast.error(`${field}: ${error.message}`);
      });
    }
  }, [errors]);

  const onSubmit = async (data: Step2FormData) => {
    setIsLoading(true);
    try {
      if (!parentData) {
        toast.error("Parent information is missing");
        return;
      }

      const { formattedDateTime, hoursUntil } =
        isScheduled && selectedTime
          ? formatDateTime(selectedTime)
          : { formattedDateTime: "", hoursUntil: 0 };

      const { price, planId, planName } = calculatePrice();

      const checkoutData: CheckoutData = {
        totalAmount: price,
        id: data.id,
        price,
        planId,
        packageName: planName,
        planName,
        hasRecording: planId === 2,
        selectedSlot: formattedDateTime,
        selectedTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        parentName: parentData.parentName,
        parentEmail: parentData.parentEmail,
        parentPhone: parentData.parentPhone,
        children: data.children.map(
          ({ id, name, age, gender, connections, details, hobbies }) => ({
            id,
            name,
            age,
            gender,
            connections: connections || "",
            details: details || "",
            hobbies: hobbies || "",
          }),
        ),
        callNow: !isScheduled,
        when: isScheduled ? hoursUntil : 0,
        recipientName: data.recipientName || "",
        recipientPhone: data.recipientPhone || "",
      };

      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      await router.replace("/confirmation");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-white font-seasons placeholder:font-seasons"
    >
      {fields.map((child, index) => (
        <div
          key={child.id}
          className="child-section border-b-2 border-[#827E4B] mb-5 pb-5"
        >
          {index >= 1 && (
            <div className="flex justify-between">
              <p
                className="text-lg font-semibold font-seasons mb-2"
                style={{ textShadow: "0 0 20px #FCCC73" }}
              >
                Child <span className="font-harmonia">{index + 1}</span>
              </p>
              <div className="dynamic py-3 flex justify-end items-center gap-3">
                <span
                  className="bg-white rounded-md cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <Minus className="text-black" />
                </span>
                <p
                  className="text-white text-lg font-harmonia cursor-pointer"
                  onClick={() => remove(index)}
                >
                  Remove Child
                </p>
              </div>
            </div>
          )}

          <InputField
            type="text"
            label={`Child${String.fromCharCode(8217)}s Name`}
            extraStyles="placeholder:font-seasons"
            placeholder={`Child${String.fromCharCode(8217)}s Name`}
            {...register(`children.${index}.name`)}
          />

          <div className="my-2 gap-5">
            <div className="flex justify-between mb-2">
              <label
                className="text-lg font-semibold font-seasons"
                style={{ textShadow: "0 0 20px #FCCC73" }}
              >
                Gender
              </label>
              <label
                className="text-lg font-semibold font-seasons mr-[30px]"
                style={{ textShadow: "0 0 20px #FCCC73" }}
              >
                Age
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="basis-[95%]">
                <RadioGroup
                  defaultValue="Male"
                  className="flex flex-row items-center gap-6 px-4"
                  onValueChange={(value) => {
                    setValue(
                      `children.${index}.gender`,
                      value as "Male" | "Female",
                    );
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <RadioGroupItem
                      value="Male"
                      id={`male-${index}`}
                      className="w-4 h-4 border-2 border-white bg-white bg-opacity-0 rounded-full data-[state=checked]:bg-white"
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
                      className="w-4 h-4 border-2 border-white bg-white bg-opacity-0 rounded-full data-[state=checked]:bg-white"
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
              <Select
                defaultValue="5"
                onValueChange={(value) => {
                  setValue(`children.${index}.age`, parseInt(value), {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger className="w-[121px] h-[48px] bg-[#554735] border-[#827E4B] rounded-[100px] text-white font-harmonia text-[18px]">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent className="bg-[#554735] border-[#827E4B] text-white">
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((age) => (
                    <SelectItem
                      key={age}
                      value={age.toString()}
                      className="font-harmonia hover:bg-[#827E4B] focus:bg-[#827E4B]"
                    >
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TextAreaField
            label="Family Social Connections"
            placeholder="Tell us about your family and friends! Share your siblings' names and ages, who your best friends are, and any pets you have in your family. What kind of activities do you enjoy doing together?"
            {...register(`children.${index}.connections`)}
          />

          <TextAreaField
            label="Holiday Specific Details"
            placeholder="Share your favorite holiday memories! What's your go-to Christmas movie or song? Do you have any special family traditions, like baking cookies together or decorating the tree?"
            {...register(`children.${index}.details`)}
          />

          <TextAreaField
            label="Interests and Hobbies"
            placeholder="What makes you unique? Tell us about your favorite activities, from sports to arts and crafts. What subjects do you love at school? Share your favorite foods, colors, animals, and special places you enjoy visiting!"
            {...register(`children.${index}.hobbies`)}
          />
        </div>
      ))}

      <div className="dynamic py-3 flex justify-end items-center gap-3">
        <span
          className="bg-white rounded-md cursor-pointer"
          onClick={addAnotherChild}
        >
          <Plus className="text-black" />
        </span>
        <p
          className="text-white text-lg font-harmonia cursor-pointer"
          onClick={addAnotherChild}
        >
          Add another Child
        </p>
      </div>

      {/* Scheduling Section */}
      <div>
        <p
          className="text-lg font-semibold pb-2 font-seasons"
          style={{ textShadow: "0 0 20px #FCCC73" }}
        >
          Schedule a Call
        </p>
        <RadioGroup
          defaultValue="Immediate"
          className="flex flex-row items-center gap-6"
          onValueChange={(value: "Immediate" | "Scheduled") => {
            setIsScheduled(value === "Scheduled");
            setValue("callType", value);
          }}
        >
          <div className="flex items-center gap-1.5">
            <RadioGroupItem
              value="Immediate"
              id="now"
              className="w-4 h-4 border-2 border-white bg-white bg-opacity-0 rounded-full data-[state=checked]:bg-white"
            />
            <Label
              htmlFor="now"
              className="font-harmonia text-white text-[14px] leading-[17px] font-normal"
            >
              Call in 5 minutes
            </Label>
          </div>
          <div className="flex items-center gap-1.5">
            <RadioGroupItem
              value="Scheduled"
              id="schedule"
              className="w-4 h-4 border-2 border-white bg-white bg-opacity-0 rounded-full data-[state=checked]:bg-white"
            />
            <Label
              htmlFor="schedule"
              className="font-harmonia text-white text-[14px] leading-[17px] font-normal"
            >
              Schedule
            </Label>
          </div>
        </RadioGroup>
        {isScheduled && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex w-full flex-col gap-1">
              <CustomCalendar
                onDateTimeSelect={(_, time) => {
                  console.log("Calendar selected time:", time);
                  setSelectedTime(time);
                  setValue("scheduledTime", time, {
                    shouldValidate: false,
                  });
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 py-3">
          <Checkbox
            checked={sendAsGift}
            onCheckedChange={(checked) => setSendAsGift(checked as boolean)}
            className="h-5 w-5 border-2 border-white data-[state=checked]:bg-[#00E66C] data-[state=checked]:border-white"
          />
          <label
            style={{ textShadow: "0 0 20px #FCCC73" }}
            className="text-lg font-semibold font-seasons cursor-pointer"
          >
            Send as a Gift Box
          </label>
        </div>

        {sendAsGift && (
          <div className="my-2 gap-5 flex flex-col md:flex-row items-center justify-between">
            <InputField
              label="Recipient's Name"
              type="text"
              {...register("recipientName")}
              placeholder="Recipient name"
            />
            <InputField
              type="text"
              {...register("recipientPhone")}
              label="Recipient's Phone Number"
              placeholder="Recipient phone number"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          background:
            "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
          border: "3px solid #a5494d",
          boxShadow: "0px 0px 40px 0px #D9C99966",
        }}
        className="w-fit mx-auto relative z-10 font-seasons text-base md:text-xl my-12 flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[0.99] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {!isLoading ? (
          <>
            Continue to Checkout
            <FaArrowRight />
          </>
        ) : (
          "Processing..."
        )}
      </button>
    </form>
  );
}

export default FormTwo;
