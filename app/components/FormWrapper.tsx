import React from 'react'
import Image from 'next/image'
import Form_One from './Form_One'
function FormWrapper() {
  return (
    <div className='container  my-6 h-[62vh] md:h-[70vh]  justify-between mx-auto flex flex-col gap-4'>
      <div className='text flex flex-col gap-2'>

  <h2 style={{  textShadow: '0 0 20px #FCCC73', }} className='text-4xl md:text-6xl 2xl:text-7xl font-black text-center font-seasons  text-white'>
        Speak to Santa in Real Time 
        </h2>
        <p style={{  textShadow: '0 0 12px #FCCC73', }} className='text-lg md:text-3xl 2xl:text-4xl text-center font-seasons  text-white'>
        Kids enjoy a LIVE, personal conversation<span className=' xl:hidden inline'>.</span> <span className='hidden xl:inline'>with Santa.</span>
        </p>
        <div  className='button hidden md:flex relative  my-3 justify-end '>
          <button style={{border: '3px solid #D9C999CC', background: 'linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)'
}} className=' absolute right-[5em]  xl:right-[3em] 2xl:right-[6em] lg:right-[10em] md:right-[2em]  text-white gap-3 font-seasons text-xl 2xl:text-3xl flex font-bold py-2 px-8 rounded-full'>
         <span style={{background: 'linear-gradient(93.5deg, #D7C798 22.11%, #EDE4CC 54.95%, #D7C798 79.77%)'}} className='flex items-center justify-center rounded-full relative px-2.5 py-2'>
         <Image
          src = '/play.svg'
          width = {13}
          height = {10}
          alt = "play"
          className='relative -right-0.5'  
          />
         </span>
          
          Listen to a Call
          </button>
        </div>
      </div>
      <div className='form px-6 md:px-0'>
        <Form_One />
      </div>
    </div>
  )
}

export default FormWrapper
