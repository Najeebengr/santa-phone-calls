'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { nav_items } from '../lib/constants'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { IoMenu } from 'react-icons/io5'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import Loader from './Loader'
function Header() {
  const [isLoaded, setIsLoaded] = useState(false); 
  const path = usePathname()
  return (
    <header className='flex px-6 xl:px-0 justify-between items-center pt-2 md:pt-12 container mx-auto'>
      <Link href={'/'}>
      <Image
        src="/logo.png"
        alt="Santa Phone Calls Logo"
        className="dark:invert w-[120px] md:w-[160px]"
        width={160}
        height={24}
        priority
      />
      </Link>
      <div className=" gap-8 text-2xl hidden md:flex text-white font-harmonia">
      {nav_items.map((item) => 
  item.id === 'how-it-works' ? (
    <Dialog key={item.id}>
    <DialogTrigger>
    <span
      key={item.name}
      id={`nav-${item.id}`}
      className={`${path === item.href ? 'font-bold' : ''}`}
    >
      {item.name}
    </span>
    </DialogTrigger>
<DialogContent className='p-0 border-none w-[90%]  xl:w-full'>
  <DialogHeader className='p-0 rounded-xl'>
  <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
      {/* Loading Placeholder */}
      {!isLoaded && (
       <Loader />
      
      )}

      {/* Vimeo Iframe */}
      <iframe
        src="https://player.vimeo.com/video/1026689821?h=5a5d6352e4"
        className={`absolute top-0 left-0 w-full h-full ${
          isLoaded ? "block" : "hidden"
        }`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)} // Set state when iframe loads
      ></iframe>
    </div>

  </DialogHeader>
</DialogContent>
</Dialog>
   
  ) : (
    <Link
      key={item.name}
      id={`nav-${item.id}`}
      href={item.href}
      className={`${path === item.href ? 'font-bold' : ''}`}
    >
      {item.name}
    </Link>
  ))}
      </div>
      <div className='block md:hidden'>
        
      <DropdownMenu>
  <DropdownMenuTrigger className='focus:outline-none'><IoMenu className='text-4xl text-white'/></DropdownMenuTrigger>
  <DropdownMenuContent className='bg-white relative right-[20%]'>
    {nav_items.map((item) => (
      <DropdownMenuItem key={item.name} style={{background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)'}} className='font-bold border-b-2 border-gray-400 px-8  text-xl py-4 focus:outline-none font-seasons'>
      <Link href={item.href} className={`${path === item.href ? 'font-bold' : ''}`}>{item.name}</Link>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

</div>
      <div className='insta-icon text-3xl hidden md:block text-white'>
        <FaInstagram />
      </div>
     

    </header>
  )
}

export default Header
