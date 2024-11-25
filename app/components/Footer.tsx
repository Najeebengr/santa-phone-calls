import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <footer className='container  px-8 xl:px-0 mx-auto relative md:absolute bottom-8 left-0 right-0'>
    <div className='flex pt-12 md:py-0 flex-col md:flex-row justify-center md:justify-between items-center md:items-end '>
      <div className='text-lg md:text-2xl relative left-0 md:left-0 lg:left-0 xl:-left-6  text-white font-harmonia border-b-2 border-white'>
        <Link href={'/'}>
        See How<br className='hidden md:inline'/> {`We're Better?`} 
        <Image 
        src = '/Vector.svg'
        width = {15}
        height = {10}
        alt = "Link"
        className='inline-block mx-2'
        />
        </Link>
      </div>
      <div className='flex relative pt-10 md:pt-0 right-0 md:right-0 lg:right-0 xl:-right-6 flex-col gap-3'>
        <p className='text-md md:text-xl text-white font-harmonia text-center md:text-right'>
            As Seen On...
        </p>
        <div className='flex gap-6 justify-end'>
            <Image 
            src = '/yahoo.svg'
            width = {120}
            height = {70}
            alt = "Link"
            />
            <Image 
            src = '/CBS.svg'
            width = {100}
            height = {70}
            alt = "Link"
            />
        </div>
        <div className='flex mt-2 gap-6'>
        <Image 
            src = '/NBC.svg'
            width = {60}
            height = {70}
            alt = "Link"
            />
            <Image 
            src = '/Today.svg'
            width = {60}
            height = {70}
            alt = "Link"
            />
             <Image 
            src = '/KTLA.svg'
            width = {30}
            height = {70}
            alt = "Link"
            />
            <Image 
            src = '/brand2.svg'
            width = {40}
            height = {70}
            alt = "Link"
            />
        </div>
      </div>
    </div>
    </footer>
  )
}

export default Footer
