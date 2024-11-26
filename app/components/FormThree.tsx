'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { SiMastercard } from 'react-icons/si';
import { GrVisa } from 'react-icons/gr';
import toast from 'react-hot-toast';
import { step3Schema } from '@/lib/validation/schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
function FormThree() {
    const schema = step3Schema
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { cardNumber: '', zipCode: '', expirationDate: '', cvv: '' },
      });
    console.log(errors)
      // Display errors in toast
      useEffect(() => {
        Object.keys(errors).forEach((field) => {
          const errorMessage = errors[field as keyof typeof errors]?.message;
          if (errorMessage) {
            toast.error(errorMessage); // Display each error message
          }
        });
      }, [errors]);
    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
          const apiEndpoint = 'https://services.leadconnectorhq.com/hooks/jyPDXTf3YpjI9G74bRCW/webhook-trigger/48f8b837-7d75-43db-aace-7898714ff597';
          const payload = {
            cardNumber: data.cardNumber, // Map childName to firstName in GHL
            zipCode: data.zipCode,
            expirationDate: data.expirationDate,
            cvv: data.cvv,
          };
         
      
          const result = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      
          const response = await result.json();
      
          if (result.ok) {
            console.log('GHL Response:', response);
            toast.success('Contact added successfully!');
            // router.push('/info')
          } else {
            console.error('GHL Error Response:', response);
            toast.error(response.message || 'Failed to add contact to GHL');
          }
        } catch (err) {
          console.error('Error during submission:', err);
          toast.error('An unexpected error occurred while sending data to GHL');
        }
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div   className="fields">
            <div className="card-number">
              <label
                style={{ textShadow: "0 0 20px #FCCC73" }}
                htmlFor=""
                className=" text-lg text-white font-semibold font-seasons"
              >
                Card Number
              </label>
              <input
  type="text"
  {...register("cardNumber")} 
  placeholder="Enter card number"
  className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
/>
            </div>
            <div className="card-details my-2 gap-5 flex flex-col md:flex-row items-center justify-between">
              <div>
                <label
                  style={{ textShadow: "0 0 20px #FCCC73" }}
                  htmlFor=""
                  className=" text-lg text-white font-semibold font-seasons"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  {...register("zipCode") } 
                  placeholder="Zip Code"
                  className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
                />
              </div>
              <div>
                <label
                  style={{ textShadow: "0 0 20px #FCCC73" }}
                  htmlFor=""
                  className=" text-lg text-white font-semibold font-seasons"
                >
                  Expiration
                </label>
                <input
                  type="text"
  pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                  {...register("expirationDate")}
                  placeholder="Expiration MM/YY"
                  className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
                />
              </div>
              <div>
                <label
                  style={{ textShadow: "0 0 20px #FCCC73" }}
                  htmlFor=""
                  className=" text-lg text-white font-semibold font-seasons"
                >
                  CVV
                </label>
                <input
                  type="text"
                  {...register('cvv')}
                  placeholder="CVV"
                  className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="button">
            <button
             type='submit'

              style={{
                background:
                  "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
                border: "3px solid #a5494d ",
                boxShadow: "0px 0px 40px 0px #D9C99966",
              }}
              className="w-fit mx-auto font-seasons text-base md:text-lg my-3 flex justify-center items-center gap-1 text-white font-bold py-3 px-8 rounded-full"
            >
              <Image
                src="/american_express.svg"
                width={20}
                height={10}
                alt="american_express"
              />
              <SiMastercard className="text-white" />
              <GrVisa />
              Pay with Shop Pay{" "}
            </button>
          </div> 
    </form>
  )
}

export default FormThree
