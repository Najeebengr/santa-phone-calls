"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { step2Schema } from "@/lib/validation/schema";
import { z } from "zod";
import InputField from "./InputField";
import { FieldErrors } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import TextAreaField from "./TextAreaField";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Loader from "./Loader";

function FormTwo() {
  const [date, setDate] = React.useState<Date>(new Date())

  const [loading, setLoading] = useState(false);
  const [disabledSlots, setDisabledSlots] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState({ childName: '', parentEmail: '', parentNumber: '' });
  // Generate a random time between 08:00 and 20:00
  const randomTime = () => {
    const hour = String(Math.floor(Math.random() * (20 - 8 + 1) + 8)).padStart(2, "0"); // Random hour (08-20)
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, "0"); // Random minute (00-59)
    return `${hour}:${minute}`;
  };
  const router = useRouter();
  const [sendAsGift, setSendAsGift] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false); // State to toggle schedule inputs

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      children: [
        {
          name: "",
          gender: "Male",
          age: 1,
          connections: "",
          details: "",
          hobbies: "",
        },
      ],
      callType: "Immediate",
      recipientName: "",
      recipientPhone: "",
      scheduledDate: date.toString(), // Default to today's date
    scheduledTime: randomTime(), // Default to a random time
    },
  });

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });
  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/currentUser', { method: 'GET' });
      const result = await response.json();

      if (response.ok) {
        
        setUserInfo(result.user);
        console.log('user ha', result.user);
      } else {
        toast.error(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      toast.error('An unexpected error occurred');
    } finally {
    
    }
  };
  useEffect(() => {
     getCurrentUser();
  }, []);
  const fetchDisabledSlots = async (date: string) => {
    try {
      const response = await fetch("/api/checkBookedSlots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.bookedSlots.map((slot: { scheduledTime: string }) => slot.scheduledTime);
      } else {
        console.error("Failed to fetch disabled slots");
        return [];
      }
    } catch (error) {
      console.error("Error fetching disabled slots:", error);
      return [];
    }
  };
  useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      fetchDisabledSlots(formattedDate).then(setDisabledSlots);
    }
  }, [date]);
  const addAnotherChild = () => {
    if (fields.length >= 5) {
      toast.error("You can add a maximum of 5 children.");
      return;
    }
    append({
      name: "",
      gender: "Male",
      age: 1,
      connections: "",
      details: "",
      hobbies: "",
    });
  };

  useEffect(() => {
    const displayErrors = (errors: FieldErrors) => {
      Object.entries(errors).forEach(([field, error]) => {
        if (error && typeof error === "object" && "message" in error) {
          toast.error(`${field}: ${(error as { message: string }).message}`);
        } else if (typeof error === "object" && error !== null) {
          displayErrors(error as FieldErrors);
        }
      });
    };

    if (Object.keys(errors).length > 0) {
      displayErrors(errors);
    }
  }, [errors]);
  const onSubmit = async (data: z.infer<typeof step2Schema>) => {
   setLoading(true);
    try {
      const apiEndpoint = '/api/childRegister';
      const result = await fetch(apiEndpoint, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const response = await result.json();
      if (result.ok) {
        console.log("Response:", response);
        toast.success(response.message);
  
        // Use the ID directly without relying on React's state update
        
  
        // Send user data to the external API
        const ghlEndpoint =
          'https://services.leadconnectorhq.com/hooks/jyPDXTf3YpjI9G74bRCW/webhook-trigger/5ddab513-02ef-4d16-8ce3-c8d1f98b6985';
          const payload = {
            user: {
              callType: data.callType,
              scheduledDate: data.scheduledDate,
              scheduledTime: data.scheduledTime,
              recipientName: data.recipientName || null,
              recipientPhone: data.recipientPhone || null,
            },
            children: data.children.map((child) => ({
              name: child.name,
              gender: child.gender,
              age: child.age,
              connections: child.connections || null,
              details: child.details || null,
              hobbies: child.hobbies || null,
            })),
            tags: ["Santa Call", "Multiple Children"], // Include tags if necessary
          };
    
  
        const ghlResult = await fetch(ghlEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
  
        const ghlResponse = await ghlResult.json();
        if (ghlResult.ok) {
          console.log('GHL Response:', ghlResponse);
          // toast.success('Contact added successfully!');
          router.push('/checkout');
        } else {
          console.error('GHL Error Response:', ghlResponse);
          toast.error(ghlResponse.message || 'Failed to add contact to GHL');
        }
      } else {
        toast.error(response.message || "An error occurred");
        router.replace('/');
      }
    } catch (err) {
      console.error('Error during submission:', err);
      toast.error('An unexpected error occurred while sending data to GHL');
    } finally {
      setLoading(false);
    }
  };
 if(loading) return <Loader />
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
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
          {
            index === 0 ? (
              <InputField
              type="text"
              label="Child’s Name"
              disabled
              value={userInfo.childName}
              placeholder="Child's Name"
              {...register(`children.${index}.name`)}
            />
            ) : <InputField
            type="text"
            label="Child’s Name"
            placeholder="Child's Name"
            {...register(`children.${index}.name`)}
          />
          }
          
          <div className="my-2 gap-5 flex items-center justify-between">
            <div className="basis-[95%]">
              <label
                className="text-lg font-semibold font-seasons"
                style={{ textShadow: "0 0 20px #FCCC73" }}
              >
                Gender
              </label>
              <Select
                defaultValue="Male"
                onValueChange={(value) => {
                  setValue(`children.${index}.gender`, value as ("Male" | "Female")); 
                }
                }
              >
                <SelectTrigger className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#554735] text-white font-harmonia">
                  <SelectItem value="Male" className="bg-[#554735] text-white">
                    Male
                  </SelectItem>
                  <SelectItem
                    value="Female"
                    className="bg-[#554735] text-white"
                  >
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputField
              label="Age"
              type="number"
              placeholder="Age"
              {...register(`children.${index}.age`, { valueAsNumber: true })}
            />
          </div>
          <TextAreaField
            label="Family Social Connections"
            placeholder="Family Social Connections you have..."
            {...register(`children.${index}.connections`)}
          />
          <TextAreaField
            label="Holiday Specific Details"
            placeholder="Holiday wishlist items, favorite songs..."
            {...register(`children.${index}.details`)}
          />
          <TextAreaField
            label="Interests and Hobbies"
            placeholder="Interests and hobbies..."
            {...register(`children.${index}.hobbies`)}
          />
        </div>
      ))}

      <div className="dynamic py-3 flex justify-end items-center gap-3">
        <span className="bg-white rounded-md cursor-pointer" onClick={addAnotherChild}>
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              style={{ accentColor: "#00E56C" }}
              {...register("callType")}
              value="Immediate"
              id="now"
              onChange={() => setIsScheduled(false)} // Update state for immediate calls
            />
            <label htmlFor="now" className="text-white text-sm font-harmonia">
              Call in 5 minutes or scheduling
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              style={{ accentColor: "#00E56C" }}
              value="Scheduled"
              id="schedule"
              {...register("callType")}
              onChange={() => setIsScheduled(true)} // Update state for scheduled calls
            />
            <label
              htmlFor="schedule"
              className="text-white text-sm font-harmonia"
            >
              Schedule
            </label>
          </div>
        </div>

        {isScheduled && (
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* <InputField
            placeholder="Enter a date and time"
              label="Scheduled Date"
              type="date"
              
              {...register("scheduledDate")}
            /> */}
            <div className="flex w-full flex-col gap-1">
            <label
        className="text-lg font-semibold font-seasons"
        style={{ textShadow: "0 0 20px #FCCC73" }}
      >
        Scheduled Date
      </label>
      <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full bg-[#554735] border-[1px] border-[#827E4B] my-2 py-6 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none rounded-full justify-start text-left",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>{
            setDate(addDays(new Date(), parseInt(value)))
            setValue(`scheduledDate`, value);
            console.log('yeah',date)
          }
        }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
        <Calendar
  defaultMonth={date}
  mode="single"
  selected={date}
  onSelect={(day) => {
    if (day) {
      setDate(day); // Update the local `date` state
      setValue("scheduledDate", day.toString()); // Set the `scheduledDate` in form state
      console.log("Calendar Selected Date:", day); // Debugging log
    }
  }}
  disabled={(day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    return disabledSlots.includes(formattedDate); // Disable if in the disabled slots
  }}
/>
        </div>
      </PopoverContent>
    </Popover>
            </div>
            <InputField
            placeholder="Enter time"
              label="Scheduled Time"
              type="time"
              {...register("scheduledTime")}
            />
          </div>
        )}

        <div className="flex items-center gap-3 py-3">
          <input
            type="checkbox"
            name=""
            checked={sendAsGift}
            onChange={(e) => setSendAsGift(e.target.checked)}
            className="h-5 w-6 accent-white"
            id=""
          />
          <label
            htmlFor=""
            style={{ textShadow: "0 0 20px #FCCC73" }}
            className="text-lg font-semibold font-seasons"
          >
            Send as a Gift Box
          </label>
        </div>
      </div>

      {sendAsGift && (
        <div className="my-2 gap-5 flex flex-col md:flex-row items-center justify-between">
          <InputField
            label="Recipient’s Name"
            type="text"
            {...register("recipientName")}
            placeholder="Recipient name"
          />
        
          <InputField
            type="text"
            {...register("recipientPhone")}
            label="Recipient’s Phone Number"
            placeholder="Recipient phone number"
          />
        </div>
      )}

      <button
        type="submit"
        style={{
          background:
            "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
          border: "3px solid #a5494d ",
          boxShadow: "0px 0px 40px 0px #D9C99966",
        }}
        className="w-fit mx-auto relative z-10 font-seasons text-base md:text-xl my-12 flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full"
      >
        Continue to Checkout <FaArrowRight />
      </button>
    </form>
  );
}

export default FormTwo;