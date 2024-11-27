import React from 'react'
import Image from 'next/image'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { features, MallSantaExperience, MessageFromSanta, PNP, SantaPhoneCalls } from '../lib/constants'

function Footer() {
  return (
    <footer className='container py-10 md:py-0 px-8 xl:px-0 mx-auto block md:absolute bottom-8 left-0 right-0'>
    <div className='flex  md:py-0 flex-col md:flex-row justify-center md:justify-between items-center md:items-end '>
      <div className='text-lg md:text-2xl md:py-0 block md:relative left-0 md:left-0 lg:left-0 xl:-left-6  text-white font-harmonia border-b-2 border-white'>

      <Dialog >
      <DialogTrigger className=''>
      <div >
        See How<br className='hidden md:inline'/> {`We're Better?`} 
        <Image 
        src = '/Vector.svg'
        width = {15}
        height = {10}
        alt = "Link"
        className='inline-block mx-2'
        />
        </div>
      </DialogTrigger>
  <DialogContent className='p-0 border-none xl:h-[75vh]  w-[80vw] h-[80vh] lg:h-[75vh] lg:w-[85vw] xl:w-full overflow-x-scroll overflow-y-scroll  2xl:h-auto'>
    <DialogHeader className='p-0 rounded-xl'>
    <Table className='p-0 '>
  <TableHeader className='p-0 '>
    <TableRow className='p-0 '>
      <TableHead className='w-[20%]  border-2 border-[#ddd0a5] text-center py-2 bg-[#6b6155] text-white font-harmonia text-lg'>Feature</TableHead>
      <TableHead style={{background: 'linear-gradient(90deg, #D7C798 0%, #EDE4CC 40.4%, #D7C798 100%)'}} className='w-[20%] text-black border-2 border-[#ddd0a5] text-center py-2  font-harmonia text-lg'>SantaPhoneCalls.com</TableHead>
      <TableHead className='w-[20%] border-2 border-[#ddd0a5] text-center py-2 bg-[#6b6155] text-white font-harmonia text-lg'>Portable North Pole (PNP)</TableHead>
      <TableHead className='w-[20%] border-2 border-[#ddd0a5] text-center py-2 bg-[#6b6155] text-white font-harmonia text-lg'>Message from Santa</TableHead>
      <TableHead className='w-[20%] border-2 border-[#ddd0a5] text-center py-2 bg-[#6b6155] text-white font-harmonia text-lg'>Mall Santa Experience</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {/* Map through each feature in the features array */}
  {features.map((feature) => (
    <TableRow key={feature.id}>
      {/* Feature Name */}
      <TableCell className="bg-[#46382a] p-3 border-[#ddd0a5] border-2 text-white font-harmonia text-xl">
        {feature.name}
        
      </TableCell>

      {/* SantaPhoneCalls */}
      <TableCell className="bg-[#604f39] p-3 border-[#ddd0a5] border-2 text-white font-harmonia text-xl text-center">
        {SantaPhoneCalls.find((item) => item.id === feature.id)?.name || ''}
        <Image
            src="/CheckCircle.svg"
            alt="tick"
            width={20}
            height={10}
            className="mx-auto my-1"
          />
      </TableCell>

      {/* PNP */}
      <TableCell className="bg-[#46382a] p-3 border-[#ddd0a5] border-2 text-white font-harmonia text-xl text-center">
        {PNP.find((item) => item.id === feature.id)?.status === "tick" ? (
          <Image
            src="/CheckCircle.svg"
            alt="tick"
            width={20}
            height={10}
            className="mx-auto my-1"
          />
        ) : (
          <Image
            src="/XCircle.svg"
            alt="cross"
            width={20}
            height={10}
            className="mx-auto my-1"
          />
        )}
        <span>
          {PNP.find((item) => item.id === feature.id)?.name || ''}
        </span>
      </TableCell>

      {/* MessageFromSanta */}
      <TableCell className="bg-[#46382a] p-3 border-[#ddd0a5] border-2 text-white font-harmonia text-xl text-center">
        {MessageFromSanta.find((item) => item.id === feature.id)?.status ===
        "tick" ? (
          <Image
            src="/CheckCircle.svg"
            alt="tick"
            width={20}
            height={10}
            className="mx-auto my-1"
          />
        ) : (
          <Image
            src="/XCircle.svg"
            alt="cross"
            width={20}
            height={10}
            className="mx-auto my-1"
          />
        )}
        <span>
          {MessageFromSanta.find((item) => item.id === feature.id)?.name || ''}
        </span>
      </TableCell>

      {/* MallSantaExperience */}
      <TableCell className="bg-[#46382a] p-3 border-[#ddd0a5] border-2 text-white font-harmonia text-xl text-center">
        {MallSantaExperience.find((item) => item.id === feature.id)?.status ===
        "tick" ? (
          <Image
            src="/CheckCircle.svg"
            alt="tick"
            width={20}
            height={10}
            className="mx-auto my-1"
          />
        ) : (
          <Image
            src="/XCircle.svg"
            alt="cross"
            width={20}
            height={10}
            className="mx-auto my-1"
          />
        )}
        <span>
          {MallSantaExperience.find((item) => item.id === feature.id)?.name ||
            ''}
        </span>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
</Table>

    </DialogHeader>
  </DialogContent>
</Dialog>
       
       
      </div>
      <div className=' block md:relative pt-10 md:pt-0 right-0 md:right-0 lg:right-0 xl:-right-6 flex-col gap-3'>
        <p className='text-md pb-3 md:pb-0 md:text-xl text-white font-harmonia text-center md:text-right'>
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
