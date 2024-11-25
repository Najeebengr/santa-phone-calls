import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import Image from 'next/image'
import { features, MallSantaExperience, MessageFromSanta, PNP, SantaPhoneCalls } from '../lib/constants'
function Pricing() {
    
  return (
    <div>
       <Dialog defaultOpen>
  <DialogContent className='p-0 border-none '>
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
  )
}

export default Pricing
