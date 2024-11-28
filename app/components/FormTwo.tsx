"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { Minus, Plus } from 'lucide-react';
import { useRouter } from "next/navigation";
import { generateId, step2Schema, type Step2FormData } from "@/lib/validation/schema";
import InputField from "./InputField";
import { FieldErrors } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import TextAreaField from "./TextAreaField";
import { CustomCalendar } from "../components/custom-calendar";
import type { CheckoutPageProps as CheckoutData } from './types/checkout';
import { plans } from "../lib/constants" 
import { Plan } from "../lib/types" 
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Loader from "./Loader";

function FormTwo() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sendAsGift, setSendAsGift] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [parentData, setParentData] = useState<{ 
    parentName: string;
    parentEmail: string;
    parentPhone: string;
  } | null>(null);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      id: generateId(),
      children: [
        {
          id: generateId(), // Add id here

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
      scheduledDate: new Date().toString(),
      scheduledTime: randomTime(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  function randomTime(): string {
    const hour = String(Math.floor(Math.random() * (20 - 8 + 1) + 8)).padStart(2, "0");
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    return `${hour}:${minute}`;
  }

  const getCurrentUser = () => {
    try {
      const storedData = localStorage.getItem('userFormData');
      if (!storedData) {
        toast.error('Please complete step 1 first');
        router.push('/');
        return;
      }

      const userData = JSON.parse(storedData);
      setParentData(userData);
      // Remove the following lines:
      // setUserInfo(userData.childName || "");
      // setValue("children.0.name", userData.childName);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      toast.error('An unexpected error occurred');
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const displayErrors = (errors: FieldErrors<Step2FormData>) => {
        Object.entries(errors).forEach(([field, error]) => {
          if (error && 'message' in error) {
            toast.error(`${field}: ${error.message}`);
          } else if (error && typeof error === 'object') {
            displayErrors(error as FieldErrors<Step2FormData>);
          }
        });
      };
      displayErrors(errors);
    }
  }, [errors]);

// Update the addAnotherChild function
const addAnotherChild = () => {
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
};

  const calculateHoursFromNow = (date: Date, time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);
    const diffInMilliseconds = scheduledDate.getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diffInMilliseconds / (1000 * 60 * 60)));
  };

  // Update the calculatePrice function in FormTwo
const calculatePrice = (childrenCount: number, hasRecording: boolean): { price: number; planId: number; planName: string } => {
  let selectedPlan: Plan;
  
  if (childrenCount > 1) {
    // Family bundle for multiple children
    selectedPlan = plans[2]; // Santa's Family Bundle
  } else if (hasRecording) {
    // Single child with recording
    selectedPlan = plans[1]; // Includes Recording
  } else {
    // Single child without recording
    selectedPlan = plans[0]; // Talk to Santa
  }

  return {
    price: selectedPlan.price,
    planId: selectedPlan.id,
    planName: selectedPlan.name
  };
};

const validateCheckoutData = (data: CheckoutData): boolean => {
  // Required fields validation
  const requiredFields = [
    'id',
    'price',
    'planId',
    'planName',
    'parentName',
    'parentEmail',
    'parentPhone',
    'children',
    'selectedTimezone'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = data[field as keyof CheckoutData];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields);
    toast.error(`Missing required information: ${missingFields.join(', ')}`);
    return false;
  }

  // Children data validation
  if (!Array.isArray(data.children) || data.children.length === 0) {
    console.error('Invalid children data');
    toast.error('Child information is required');
    return false;
  }

  // Validate each child has required fields
  const invalidChildren = data.children.filter(child => 
    !child.name || !child.age || !child.gender || 
    !child.connections || !child.details || !child.hobbies
  );
  
  if (invalidChildren.length > 0) {
    console.error('Invalid child data:', invalidChildren);
    toast.error('Please complete all required fields for each child');
    return false;
  }

  // Scheduling validation
  if (!data.callNow) {
    if (!data.selectedSlot) {
      console.error('Missing scheduled time for non-immediate call');
      toast.error('Please select a date and time for the scheduled call');
      return false;
    }
    
    if (data.when === null || data.when === undefined) {
      console.error('Missing "when" value for scheduled call');
      toast.error('Invalid scheduling information');
      return false;
    }
  }

  return true;
};

//   // Update the onSubmit function in FormTwo
//   const onSubmit = async (data: Step2FormData) => {
//     try {
//       if (!parentData) {
//         toast.error('Parent information is missing');
//         return;
//       }
  
//       // Parse and format the date/time correctly
//       let formattedSlot = '';
//       let hoursUntil = 0;
      
//       if (isScheduled && data.scheduledDate && data.scheduledTime) {
//         const scheduledDate = new Date(data.scheduledDate);
//         const [hours, minutes] = data.scheduledTime.split(':').map(Number);
//         scheduledDate.setHours(hours, minutes);
        
//         formattedSlot = scheduledDate.toLocaleString('en-US', {
//           month: '2-digit',
//           day: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//           timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
//         });
  
//         hoursUntil = calculateHoursFromNow(scheduledDate, data.scheduledTime);
//       }
  
//       const { price, planId, planName } = calculatePrice(data.children.length, false);
  
//       const checkoutData: CheckoutData = {
//         id: data.id,
//         price,
//         planId,
//         planName,
//         hasRecording: planId === 2,
//         selectedSlot: formattedSlot || new Date().toLocaleString('en-US', {
//           month: '2-digit',
//           day: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//           timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
//         }),
//         selectedTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//         parentName: parentData.parentName,
//         parentEmail: parentData.parentEmail,
//         parentPhone: parentData.parentPhone,
//         children: data.children,
//         callNow: !isScheduled,
//         when: isScheduled ? hoursUntil : 0,
//         recipientName: data.recipientName,
//         recipientPhone: data.recipientPhone,
//       };

//     console.log('Checkout data being saved:', checkoutData);


//     // Validate the data before saving
//     if (!validateCheckoutData(checkoutData)) {
//       setLoading(false);
//       return;
//     }
//     // Save to localStorage for checkout
//     localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

//     toast.success("Proceeding to checkout");
//     router.push('/checkout');
//   } catch (error) {
//     console.error('Form submission error:', error);
//     toast.error('An unexpected error occurred');
//   } finally {
//     setLoading(false);
//   }
// };
const onSubmit = async (data: Step2FormData) => {
  try {
    if (!parentData) {
      toast.error('Parent information is missing');
      return;
    }
    
    setLoading(true);
    
    // Format date and time
    let formattedDateTime = '';
    let hoursUntil = 0;
    
    if (isScheduled && selectedTime) {
      try {
        let scheduledDate: Date;

        // Check if the time is in ISO format
        if (selectedTime.includes('T')) {
          // Handle ISO format (2024-11-29T10:30:00+05:00)
          scheduledDate = new Date(selectedTime);
        } else {
          // Handle custom format (10AM November 29 2024)
          const dateTimeParts = selectedTime.match(/(\d+)(AM|PM)\s+(\w+)\s+(\d+)\s+(\d+)/i);
          if (!dateTimeParts) {
            throw new Error('Invalid date/time format');
          }

          const [_, hour, meridiem, month, day, year] = dateTimeParts;
          const months = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
          };

          scheduledDate = new Date();
          scheduledDate.setFullYear(parseInt(year));
          scheduledDate.setMonth(months[month as keyof typeof months]);
          scheduledDate.setDate(parseInt(day));
          
          let hourNum = parseInt(hour);
          if (meridiem.toUpperCase() === 'PM' && hourNum !== 12) {
            hourNum += 12;
          } else if (meridiem.toUpperCase() === 'AM' && hourNum === 12) {
            hourNum = 0;
          }
          
          scheduledDate.setHours(hourNum, 0, 0, 0);
        }

        // Format the date-time string in required format
        formattedDateTime = scheduledDate.toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });

        // Calculate hours until call
        const now = new Date();
        hoursUntil = Math.max(0, Math.ceil((scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
        
        console.log('Debug - Parsed DateTime:', {
          original: selectedTime,
          parsed: scheduledDate,
          formatted: formattedDateTime,
          hoursUntil
        });
      } catch (error) {
        console.error('Error parsing date/time:', error);
        toast.error('Invalid date or time selected');
        setLoading(false);
        return;
      }
    }

    const { price, planId, planName } = calculatePrice(data.children.length, false);

    console.log('Debug - Form Data:', {
      children: data.children,
      isScheduled,
      selectedTime,
      hasRecording: planId === 2
    });

    const checkoutData: CheckoutData = {
      id: data.id,
      price,
      planId,
      planName,
      hasRecording: planId === 2,
      selectedSlot: formattedDateTime,
      selectedTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      parentName: parentData.parentName,
      parentEmail: parentData.parentEmail,
      parentPhone: parentData.parentPhone,
      children: data.children.map(child => ({
        id: child.id,
        name: child.name,       // Include name
        age: child.age,         // Include age
        gender: child.gender,
        connections: child.connections || '',
        details: child.details || '',
        hobbies: child.hobbies || '',
      })),
      callNow: !isScheduled,
      when: isScheduled ? hoursUntil : 0,
      recipientName: data.recipientName || undefined,
      recipientPhone: data.recipientPhone || undefined,
    };

// After creating checkoutData:
console.log('Debug - Checkout Data:', {
  children: checkoutData.children,
  hasRecording: checkoutData.hasRecording,
  planId: checkoutData.planId
});
    if (!validateCheckoutData(checkoutData)) {
      setLoading(false);
      return;
    }

    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    toast.success("Proceeding to checkout");
    router.push('/checkout');
  } catch (error) {
    console.error('Form submission error:', error);
    toast.error('An unexpected error occurred');
  } finally {
    setLoading(false);
  }
};

  if (loading) return <Loader />;

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
          {index === 0 ? (
            <InputField
              type="text"
              label="Child's Name"
              placeholder="Child's Name"
              {...register(`children.${index}.name`)}
            />
          ) : (
            <InputField
              type="text"
              label="Child&lsquo;s Name"
              placeholder="Child&lsquo;s Name"
              {...register(`children.${index}.name`)}
            />
          )}

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
                }}
              >
                <SelectTrigger className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#554735] text-white font-harmonia">
                  <SelectItem value="Male" className="bg-[#554735] text-white">
                    Male
                  </SelectItem>
                  <SelectItem value="Female" className="bg-[#554735] text-white">
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
              onChange={() => setIsScheduled(false)}
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
              onChange={() => setIsScheduled(true)}
            />
            <label htmlFor="schedule" className="text-white text-sm font-harmonia">
              Schedule
            </label>
          </div>
        </div>

        {isScheduled && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex w-full flex-col gap-1">
              <CustomCalendar
                onDateTimeSelect={(selectedDate, time) => {
                  setDate(selectedDate);
                  setSelectedTime(time);
                  setValue("scheduledDate", selectedDate.toString(), {
                    shouldValidate: false,
                  });
                  setValue("scheduledTime", time, {
                    shouldValidate: false,
                  });
                }}
              />
            </div>
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
            label="Recipient&lsquo;s Name"
            type="text"
            {...register("recipientName")}
            placeholder="Recipient name"
          />
          <InputField
            type="text"
            {...register("recipientPhone")}
            label="Recipient&lsquo;s Phone Number"
            placeholder="Recipient phone number"
          />
        </div>
      )}

      <button
        type="submit"
        style={{
          background: "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
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
