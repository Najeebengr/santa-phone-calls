'use client'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import convertToSubCurrency from '../lib/convertToSubCurrency';
import Image from 'next/image';
import { SiMastercard } from 'react-icons/si';
import { GrVisa } from 'react-icons/gr';
function CheckoutPage({packageName, totalAmount}: {packageName: string, totalAmount: number}) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  amount: convertToSubCurrency(totalAmount) })
    })
    .then((res => res.json()))
    .then((data) => {
      setClientSecret(data.clientSecret);
    })
  },[totalAmount])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const {error: submitError} = await elements.submit();
    if(submitError){
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://santa-phone-calls-murex.vercel.app/success?totalAmount=${totalAmount}&packageName=${packageName}`,
      },
    })
    if(error){
      setErrorMessage(error.message);
      console.log(errorMessage)
    }
    else{
    }
    setLoading(false);
  }
  if(!clientSecret || !stripe || !elements){
    return(
      <div className='flex items-center justify-center'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-surface text-white' role='status'>
          <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 !clip[rect(0,0,0,0)]'>
            Loading...
          </span>
        </div>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && (
        <PaymentElement />
      )}

<div className="button my-10">
            <button
             type='submit'
             disabled={!stripe || loading}
              style={{
                background:
                  "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
                border: "3px solid #a5494d ",
                boxShadow: "0px 0px 40px 0px #D9C99966",
              }}
              className="w-fit mx-auto font-seasons disabled:animate-pulse text-base md:text-lg my-3 flex justify-center items-center gap-1 text-white font-bold py-3 px-8 rounded-full"
            >
              <Image
                src="/american_express.svg"
                width={20}
                height={10}
                alt="american_express"
              />
              <SiMastercard className="text-white" />
              <GrVisa />
              {!loading ? "Pay Now" : "Processing..."}
            </button>
          </div> 
    </form>
  )
}

export default CheckoutPage
