import React from 'react'
import Form_Two from '../components/Form_Two'

function Info() {
  return (
    <section className='container my-10 mx-auto relative z-10'>
      <div>
        <h2 style={{  textShadow: '0 0 20px #FCCC73', }} className='text-4xl md:text-6xl 2xl:text-7xl font-black text-center font-seasons  text-white'>
        Personalize the Conversation
        </h2>
        <p style={{  textShadow: '0 0 12px #FCCC73', }} className='text-lg my-4 font-medium md:text-4xl 2xl:text-4xl text-center font-seasons  text-white' >
        This part makes the call amazing
        </p>
      </div>
      <div>
        <Form_Two />
      </div>
    </section>
  )
}

export default Info
