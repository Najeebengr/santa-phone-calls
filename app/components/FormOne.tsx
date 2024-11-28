'use client';

import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateId, step1Schema, type Step1FormData } from '@/lib/validation/schema';
import toast from 'react-hot-toast';
import Loader from './Loader';

function FormOne() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      id: generateId(),
      parentName: '',
      parentEmail: '',
      parentPhone: '',
    },
  });

  const onSubmit = async (data: Step1FormData) => {
    setIsLoading(true);
    try {
      // Store the form data in localStorage
      localStorage.setItem('userFormData', JSON.stringify(data));
      toast.success("Information saved successfully!");
      router.push('/info');
    } catch (err) {
      console.error('Error saving data:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex pb-32 md:pb-10 md:px-0 flex-col gap-4 justify-center'>
      <div className={`relative w-full lg:w-[30%] md:w-[40%] mx-auto ${errors.parentName ? 'mb-4' : 'mb-1'}`}>
        <div style={{ background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)' }} 
             className={`w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center items-center ${errors.parentName ? 'ring-2 ring-red-500' : ''}`}>
          <Image src='/person.svg' width={40} height={10} alt="person" />
          <input
            {...register("parentName")}
            placeholder="Your Name"
            className='text-black font-harmonia placeholder:font-seasons placeholder:text-black font-normal focus:outline-none bg-inherit w-full h-full rounded-full px-2'
          />
        </div>
        {errors.parentName && (
          <div className="absolute -bottom-7 left-0 w-full flex items-center justify-center">
            <p className="text-red-500 text-sm font-harmonia bg-white/90 px-3 py-1 rounded-full">
              {errors.parentName.message}
            </p>
          </div>
        )}
      </div>

    
      <div className={`relative w-full lg:w-[30%] md:w-[40%] mx-auto ${errors.parentPhone ? 'mb-4' : 'mb-1'}`}>
        <div style={{ background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)' }} 
             className={`w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center items-center ${errors.parentPhone ? 'ring-2 ring-red-500' : ''}`}>
          <Image src='/call.svg' width={40} height={10} alt="phone" />
          <input
            {...register("parentPhone")}
            placeholder="Your Phone"
            className='text-black font-harmonia placeholder:font-seasons placeholder:text-black focus:outline-none bg-inherit w-full h-full rounded-full px-2'
          />
        </div>
        {errors.parentPhone && (
          <div className="absolute -bottom-7 left-0 w-full flex items-center justify-center">
            <p className="text-red-500 text-sm font-harmonia bg-white/90 px-3 py-1 rounded-full">
              {errors.parentPhone.message}
            </p>
          </div>
        )}
      </div>

      <div className={`relative w-full lg:w-[30%] md:w-[40%] mx-auto ${errors.parentEmail ? 'mb-4' : 'mb-1'}`}>
        <div style={{ background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)' }} 
             className={`w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center items-center ${errors.parentEmail ? 'ring-2 ring-red-500' : ''}`}>
          <Image src='/email.svg' width={40} height={10} alt="email" />
          <input
            {...register("parentEmail")}
            type="email"
            placeholder="Your Email"
            className='text-black font-harmonia placeholder:font-seasons placeholder:text-black focus:outline-none px-2 bg-inherit w-full h-full rounded-full'
          />
        </div>
        {errors.parentEmail && (
          <div className="absolute -bottom-7 left-0 w-full flex items-center justify-center">
            <p className="text-red-500 text-sm font-harmonia bg-white/90 px-3 py-1 rounded-full">
              {errors.parentEmail.message}
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="relative w-fit mx-auto font-seasons text-lg md:text-xl my-3 flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full overflow-hidden group"
        style={{
          background: 'linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)',
          border: '3px solid #a5494d',
          boxShadow: '0px 0px 40px 0px #D9C99966'
        }}
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2s infinite',
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
        <span className="relative z-10 flex items-center gap-2">
          Continue to Step 2 <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </button>

      <p className='text-center font-harmonia text-lg md:text-xl text-white'>
        By continuing, I agree to user <Link href={'/'} className='border-b-2 border-white'> terms & privacy policy </Link>
      </p>
    </form>
  );
}

export default FormOne;