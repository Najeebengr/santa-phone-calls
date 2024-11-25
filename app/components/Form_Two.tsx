'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Form_Two() {
  const router = useRouter()
  return (
    <div
      style={{
        background:
          "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
        border: "3px solid #D9C999CC",
        boxShadow: "0px 0px 40px 0px #00000080 inset",
      }}
      className="xl:w-[55vw] overflow-y-scroll relative h-[70vh]  lg:h-[80vh] rounded-lg py-5 px-6 lg:[73vw] mx-auto"
    >
     
      <form action="" className="text-white ">
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
              min={0}
              max={15}
              
              placeholder="Age"
              className="appearance-none bg-[#554735] border-[1px] [&::-webkit-outer-spin-button]:bg-[#554735] [&::-webkit-inner-spin-button]:bg-[#554735] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
            />
          </div>
        </div>
        <div>
          <label
            style={{ textShadow: "0 0 20px #FCCC73" }}
            htmlFor=""
            className=" text-lg font-semibold font-seasons"
          >
            Family Social Connections you have
          </label>
          <textarea
            placeholder="Family Social Connections you have.." rows={3}
            className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-3xl"
          />
        </div>
        <div>
          <label
            style={{ textShadow: "0 0 20px #FCCC73" }}
            htmlFor=""
            className=" text-lg font-semibold font-seasons"
          >
            Holiday Spesific Details
          </label>
          <p className="text-[#FFFFFF80] text-lg font-harmonia py-1">
          Add information for santa to give a personal message!
          </p>
          <textarea
            placeholder="Christmas whislist items, favorite holiday songs, familly traditions.." rows={3}
            className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-3xl"
          />
        </div>
        <div>
          <label
            style={{ textShadow: "0 0 20px #FCCC73" }}
            htmlFor=""
            className=" text-lg font-semibold font-seasons"
          >
            Interests and Hobbies
          </label>
        
          <textarea
            placeholder="Christmas whislist items, favorite holiday songs, familly traditions.." rows={3}
            className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-3xl"
          />
        </div>
        <div className="dynamic py-3 flex justify-end items-center gap-3">
          <span className="bg-white rounded-md">
            <Plus className="text-black" />
          </span>
          <p className="text-white text-lg font-harmonia">
          Add another Child
          </p>
        </div>
        <div>
          <p
          style={{ textShadow: "0 0 20px #FCCC73" }}
          className=" text-lg font-semibold pb-2 font-seasons">
Schedule a Call
          </p>
          <div className="flex items-center gap-4">
            
          <div className="flex items-center gap-2">
            
          <input type="radio" style={{accentColor: '#00E56C'}} name="schedule" id="now" className="h-4 w-5" value={'call in  5 minutes or scheduling'} />
        <label
            htmlFor="now"
            className="text-white text-sm font-harmonia"
          >
            call in  5 minutes or scheduling
          </label>
          </div>
          <div className="flex items-center gap-2">
            
          <input style={{accentColor: '#00E56C'}} type="radio" name="schedule" id="schedule" className="h-4 w-5" value={'call in  5 minutes or scheduling'} />
        <label
            htmlFor="schedule"
            className="text-white text-sm font-harmonia"
          >
            Schedule
          </label>
          </div>
          </div>
          <div className="flex items-center gap-3 py-3">
            <input type="checkbox" name="" className="h-5 w-6 accent-white" id="" />
            <label
              htmlFor=""
              style={{ textShadow: "0 0 20px #FCCC73" }}
              className=" text-lg font-semibold  font-seasons"
            >
              Send as a Gift Box
            </label>
          </div>
          <div className="my-2 gap-5 flex flex-col md:flex-row items-center justify-between">
          <div className="basis-2/4">
            <label
              style={{ textShadow: "0 0 20px #FCCC73" }}
              htmlFor=""
              className=" text-lg font-semibold font-seasons"
            >
              Recipient’s Name
            </label>
            <input
            type="text"
            placeholder="Recipient name"
            className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
          />
          </div>
          <div className="basis-2/4">
            <label
              style={{ textShadow: "0 0 20px #FCCC73" }}
              htmlFor=""
              className=" text-lg font-semibold font-seasons"
            >
              Recipient’s Phone Number
            </label>
            <input
            type="text"
            placeholder="Recipient phone number"
            className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
          />
          </div>
          </div>
          <div className="spacer h-32">
          </div>
          <div>
          <button  onClick={(event) => { event.preventDefault(); router.push('/checkout')} } style={{background: 'linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)', border: '3px solid #a5494d ', boxShadow: '0px 0px 40px 0px #D9C99966'}} className='w-fit mx-auto font-seasons text-xl my-3 flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full'>Continue to Checkout <FaArrowRight /></button>
          </div>
          <div className="spacer h-32">
          </div>
        </div>
      </form>
      <div className="relative">
        
      <Image
        src="/corner_left.png"
        width={170}
        height={130}
        alt="corner"
        className="absolute bottom-0 left-0 transform -translate-x-[16%] translate-y-[15%]"
      />
       <Image
        src="/corner_right.png"
        width={170}
        height={130}
        alt="corner"
        className="absolute bottom-0 right-0 transform translate-x-[16%] translate-y-[15%]"
      />

</div>
    </div>
  );
}

export default Form_Two;
