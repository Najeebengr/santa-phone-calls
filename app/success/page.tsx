import React from 'react'

async function Success({
  searchParams,
}: {
  searchParams: Promise<{ query: string }> ;
}) {
  const { query } = await searchParams;
  return (
    <section className="bg-[url('/christmas.jpeg')] w-full backdrop-blur-2xl bg-cover bg-no-repeat bg-center  flex  justify-center items-center h-screen">
      <div className=' flex justify-center items-center h-[30vh]'>
        <p className='font-harmonia text-4xl text-white'>
            Successfully Booked Call In {query}
        </p>
      </div>
    </section>
  )
}

export default Success
