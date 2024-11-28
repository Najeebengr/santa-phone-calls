import React from 'react'
import FormOne from './FormOne'
import AudioPlayer from './audio-player'
function HomePageWrapper() {
  return (
    <div className='container  my-6 h-full md:h-[70vh]  justify-between mx-auto flex flex-col gap-28 md:gap-4'>
      <div className='text flex flex-col gap-2'>

  <h2 style={{  textShadow: '0 0 20px #FCCC73', }} className='text-4xl md:text-6xl 2xl:text-7xl font-black text-center font-seasons  text-white'>
        Speak to Santa in Real Time 
        </h2>
        <p style={{  textShadow: '0 0 12px #FCCC73', }} className='text-lg md:text-3xl 2xl:text-4xl text-center font-seasons  text-white'>
        Kids enjoy a LIVE, personal conversation<span className=' xl:hidden inline'>.</span> <span className='hidden xl:inline'>with Santa.</span>
        </p>
        <div  className='button block mx-auto md:mx-0 md:flex relative  my-3 justify-end '>
     
           <div className='md:absolute right-[5em] xl:right-[3em] 2xl:right-[6em] lg:right-[10em] md:right-[2em]'>
          <AudioPlayer />
        </div>
        </div>
        </div>
      <div className='form px-6 md:px-0'>
        <FormOne />
      </div>
    </div>
  )
}

export default HomePageWrapper
