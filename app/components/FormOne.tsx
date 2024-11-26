'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from '@/lib/validation/schema';
import toast from 'react-hot-toast';
import { z } from 'zod';
function FormOne() {
  const router = useRouter()
  const schema = step1Schema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { childName: '', parentEmail: '', parentNumber: '' },
  });

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
        firstName: data.childName, // Map childName to firstName in GHL
        email: data.parentEmail,
        phone: data.parentNumber,
        tags: ["Santa Call"], // Add any relevant tags
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
        router.push('/info')
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
    <form  onSubmit={handleSubmit(onSubmit)}   className='flex px-6 md:px-0  flex-col gap-4 justify-center'>
        <div style={{background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)'}} className='w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center  items-center   mx-auto lg:w-[30%] md:w-[40%]'>
        <Image
        src = '/person.svg'
        width = {40}
        height = {10}
        alt = "person"
        />
       <input 
    {...register("childName")} 
    placeholder="Child’s Name" 
    className='text-black font-harmonia placeholder:font-seasons placeholder:text-black font-normal focus:outline-none bg-inherit w-full h-full rounded-full px-2' 
/>
        </div>
        <div style={{background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)'}} className='w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center  items-center   mx-auto lg:w-[30%] md:w-[40%]'>
        <Image
        src = '/call.svg'
        width = {40}
        height = {10}
        alt = "person"
        />
       <input 
    {...register("parentNumber")} 
    placeholder="Your Phone" 
    className='text-black font-harmonia placeholder:font-seasons placeholder:text-black focus:outline-none bg-inherit w-full h-full rounded-full px-2' 
/>
        </div>
        <div style={{background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)'}} className='w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center  items-center   mx-auto lg:w-[30%] md:w-[40%]'>
        <Image
        src = '/email.svg'
        width = {40}
        height = {10}
        alt = "person"
        />
        <input 
    {...register("parentEmail")} 
    type="email" 
    placeholder="Your Email" 
    className='text-black font-harmonia placeholder:font-seasons placeholder:text-black focus:outline-none px-2 bg-inherit w-full h-full rounded-full' 
/>
        </div>
        <button type='submit' style={{background: 'linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)', border: '3px solid #a5494d ', boxShadow: '0px 0px 40px 0px #D9C99966'}} className='w-fit mx-auto font-seasons text-xl my-3 flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full'>Continue to Step 2 <FaArrowRight /></button>
        <p className='text-center font-harmonia text-lg md:text-xl text-white'>
        By continuing, I agree to user <Link href={'/'} className='border-b-2 border-white'> terms & privacy policy </Link>
        </p>
    </form>
  )
}

export default FormOne
