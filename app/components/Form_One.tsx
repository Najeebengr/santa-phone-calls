'use client'
import React from 'react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
function Form_One() {
  const router = useRouter()
  return (
    <form action="" className='flex px-6 md:px-0  flex-col gap-4 justify-center'>
        <div style={{background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)'}} className='md:w-[430px] w-[330px] text-2xl rounded-full h-[50px] px-6  md:px-2 py-1 flex gap-3 font-seasons  mx-auto'>
        <Image
        src = '/person.svg'
        width = {40}
        height = {10}
        alt = "person"
        />
        <input type="text" placeholder="Child’s Name" className='text-black placeholder:text-black font-normal focus:outline-none bg-inherit w-full h-full rounded-full' />
        </div>
        <div style={{background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)'}} className='md:w-[430px] w-[380px] text-2xl rounded-full h-[50px] px-2 py-1 flex gap-3 font-seasons  mx-auto'>
        <Image
        src = '/call.svg'
        width = {40}
        height = {10}
        alt = "person"
        />
        <input type="text" placeholder="Your Phone " className='text-black placeholder:text-black focus:outline-none bg-inherit w-full h-full rounded-full' />
        </div>
        <div style={{background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)'}} className='md:w-[430px] w-[380px] text-2xl rounded-full h-[50px] px-2 py-1 flex gap-3 font-seasons  mx-auto'>
        <Image
        src = '/email.svg'
        width = {40}
        height = {10}
        alt = "person"
        />
        <input type="text" placeholder="Your Email " className='text-black placeholder:text-black focus:outline-none bg-inherit w-full h-full rounded-full' />
        </div>
        <button onClick={() =>{ event?.preventDefault(); router.push('/info')}} style={{background: 'linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)', border: '3px solid #a5494d ', boxShadow: '0px 0px 40px 0px #D9C99966'}} className='w-fit mx-auto font-seasons text-xl my-3 flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full'>Continue to Step 2 <FaArrowRight /></button>
        <p className='text-center font-harmonia text-lg md:text-xl text-white'>
        By continuing, I agree to user <Link href={'/'} className='border-b-2 border-white'> terms & privacy policy </Link>
        </p>
    </form>
  )
}

export default Form_One
