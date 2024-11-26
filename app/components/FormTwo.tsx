"use client";
import React, { useState, useEffect} from "react";
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
import TextAreaField from "./TextAreaField";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function FormTwo() {
  const router = useRouter();
  const [sendAsGift, setSendAsGift] = useState(false);
  // Initialize form with Zod schema
  const {
    register,
    control,
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
    },
  });
  console.log(errors)

  // Field array for dynamic child entries
  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  // Add another child with a maximum limit of 5
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

  // Display errors in toast
  useEffect(() => {
    const displayErrors = (errors: FieldErrors) => {
      Object.entries(errors).forEach(([field, error]) => {
        if (error && typeof error === "object" && "message" in error) {
          // Show toast for each error message
          toast.error(`${field}: ${(error as { message: string }).message}`);
        } else if (typeof error === "object" && error !== null) {
          // Recursively handle nested errors
          displayErrors(error as FieldErrors);
        }
      });
    };

    if (Object.keys(errors).length > 0) {
      displayErrors(errors); // Call only if errors exist
    }
  }, [errors]);

  // Submit handler with API call to GHL
  const onSubmit = async (data: z.infer<typeof step2Schema>) => {
    try {
      const apiEndpoint =
        "https://services.leadconnectorhq.com/hooks/jyPDXTf3YpjI9G74bRCW/webhook-trigger/48f8b837-7d75-43db-aace-7898714ff597";

      const payload = {
        children: data.children,
        callType: data.callType,
        recipientName: data.recipientName,
        recipientPhone: data.recipientPhone,
        tags: ["Santa Call", "Multiple Children"], // Example tags
      };

      const result = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const response = await result.json();

      if (result.ok) {
        console.log("GHL Response:", response);
        toast.success("Data submitted successfully!");
        router.push("/checkout"); // Redirect to the next step
      } else {
        console.error("GHL Error Response:", response);
        toast.error(response.message || "Failed to submit data to GHL.");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      toast.error("An unexpected error occurred.");
    }
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      {/* Render children fields dynamically */}
      {fields.map((child, index) => (
        <div
          key={child.id}
          className="child-section border-b-2 border-[#827E4B] mb-5 pb-5"
        >
            { index >= 1 &&
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
      onClick={() => remove(index)} // Remove the child at this index
    >
      <Minus className="text-black" />
    </span>
    <p
      className="text-white text-lg font-harmonia cursor-pointer"
      onClick={() => remove(index)} // Add another child
    >
      Remove Child
    </p>
  </div>
</div>
}
          

          {/* Child Information */}
          <InputField
            type="text"
            label="Child’s Name"
            placeholder="Child's Name"
            {...register(`children.${index}.name`)}
          />
          <div className="my-2 gap-5 flex items-center justify-between">
            <div className="basis-[95%]">
              <label
                className="text-lg font-semibold font-seasons"
                style={{ textShadow: "0 0 20px #FCCC73" }}
              >
                Gender
              </label>
              <Select defaultValue="Male"
                onValueChange={(value) =>
                  handleSubmit((values) => {
                    values.children[index].gender = value as "Male" | "Female";
                  })
                }
              >
                <SelectTrigger className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#554735] text-white font-harmonia">
                  <SelectItem  value="Male" className="bg-[#554735] text-white">
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

      {/* Add Another Child Button */}
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              style={{ accentColor: "#00E56C" }}
              {...register("callType")}
              value="Immediate"
              id="now"
            />
            <label htmlFor="now" className="text-white text-sm font-harmonia">
              Call in 5 minutes or scheduling
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              style={{ accentColor: "#00E56C" }}
              value='Scheduled'
              id="schedule"
              {...register("callType")}
            />
            <label
              htmlFor="schedule"
              className="text-white text-sm font-harmonia"
            >
              Schedule
            </label>
          </div>
        </div>

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
          <InputField label="Recipient’s Name" type="text" {...register("recipientName")}  placeholder="Recipient name" />
          <InputField 
          type="text"
           {...register("recipientPhone")}
            label="Recipient’s Phone Number"
            placeholder="Recipient phone number"
          />
        </div>
      )}
      {/* Submit Button */}
      <button
        type="submit"
        style={{
          background:
            "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
          border: "3px solid #a5494d ",
          boxShadow: "0px 0px 40px 0px #D9C99966",
        }}
        className="w-fit mx-auto font-seasons text-xl my-12 flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full"
      >
        Continue to Checkout <FaArrowRight />
      </button>
    </form>
  );
}

export default FormTwo;
