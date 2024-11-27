'use client'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutPage from './CheckoutPage';
import convertToSubCurrency from '../lib/convertToSubCurrency';
if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
  throw new Error('Stripe public key is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
function FormThree({price, planName}: {price: number, planName: string}) {
    
 

  return (
    <div >
      <Elements 
      stripe={stripePromise}
  
      options={{
        mode: "payment",
        amount: convertToSubCurrency(price),
        currency: "usd",
      
        appearance: {
          theme: "night",
          variables: {
            
            // borderRadius: "9999px",
            colorBackground: "#554735",
            colorText: "#FFFFFF",
            colorTextPlaceholder: "#FFFFFF80",
            // colorPlaceholder: "#FFFFFF80",
            // fontFamily: "'Seasons', sans-serif",
            colorPrimary: '#ffffff',
            fontSizeBase: "18px",
          },
          rules: {
            ".Input": {
              borderRadius: "9999px",
              border: "1px solid #827E4B",
              padding: "10px 30px",
              focus: "outline-none",
              active: "outline-none",
              color: "#FFFFFF",
              fontFamily: "'Harmonia, sans-serif",
              fontSize: "18px",
              backgroundColor: "#554735",
             
            },
            ".Span": {
              color: "#FFFFFF",
            },
            ".Label": {
              color: "#FFFFFF",
              // fontFamily: "'Seasons', sans-serif",
            },
          },
        },
      }}
      >
        <CheckoutPage packageName={planName} totalAmount={price} />
      </Elements> 
       
    </div>
  )
}

export default FormThree
