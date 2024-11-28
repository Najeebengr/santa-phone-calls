'use client'

import { plans } from "../lib/constants"
import Image from 'next/image'
import { Plan } from "../lib/types"
import { useRouter } from "next/navigation"
import { useEffect } from 'react';
import { trackPageView, trackAddToCart } from '../utils/analytics'

function Pricing() {
  const router = useRouter()

  useEffect(() => {
    trackPageView('pricing');
  }, []);


  const handlePlanSelect = (plan: Plan) => {

    trackAddToCart(plan);
    router.push(`/checkout?planId=${plan.id}&packageName=${encodeURIComponent(plan.name)}&totalAmount=${plan.price}&hasRecording=${plan.hasRecording ?? false}`);
  };

  return (
    <section className={`bg-[url('/christmas.jpeg')] bg-cover bg-center bg-no-repeat min-h-screen w-full px-6 xl:px-0 py-10 mx-auto relative z-10`}>
      <div 
        style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 50%)'}} 
        className="absolute inset-0"
      />
      <div className="container mx-auto relative z-10">
        <h2
          style={{ textShadow: "0 0 20px #FCCC73" }}
          className="text-4xl md:text-4xl 2xl:text-5xl font-black text-center font-seasons text-white"
        >
          Jimmy&lsquo;s Live Call with Santa is <br />
          Just One Step Away
        </h2>
        <div className="grid lg:grid-cols-3 gap-8 md:max-w-[80vw] xl:max-w-[60vw] 2xl:max-w-[45vw] lg:max-w-[73vw] mx-auto py-10">
          {plans.map((plan: Plan) => (
            <div
              key={plan.id}
              style={{
                background: plan.id === 2
                  ? "#695438"
                  : "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
                border: "3px solid #D9C999CC",
                boxShadow: "0px 0px 40px 0px #00000080 inset",
              }}
              className="relative flex flex-col h-full rounded-lg py-5"
            >
              <div className="flex-none pt-3 px-4">
                <p
                  style={{ textShadow: "0 0 20px #FCCC73" }}
                  className="text-2xl text-white text-center font-semibold font-seasons"
                >
                  {plan.name}
                </p>
              </div>
　　 　　　　　
              <div
                style={{
                  background: "linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)",
                }}
                className="flex-none mt-10 lg:mt-5 xl:mt-10"
              >
                <p className="text-6xl lg:text-4xl xl:text-6xl border-y-4 border-[#18161433] flex justify-center items-center font-semibold font-harmonia text-center py-6 text-[#3A3022]">
                  {plan.price}
                  <span className="text-xl font-normal ml-2">{plan.per}</span>
                </p>
              </div>
　　 　　　　　
              <div className="flex-grow px-8 md:px-14 py-25">
                <p className={`text-center font-harmonia text-lg ${
                  plan.id === 2 ? "text-white" : "text-[#FFFFFF80]"
                }`}>
                  {plan.description}
                </p>
              </div>
　　 　　　　　
              <div className="flex-none px-4 mb-20">
                <button
                  onClick={() => handlePlanSelect(plan)}
                  style={{
                    background: 'linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)',
                    border: '3px solid #a5494d',
                    boxShadow: '0px 0px 40px 0px #D9C99966'
                  }}
                  className="w-full font-seasons text-xl whitespace-nowrap flex justify-center items-center text-white font-bold py-3 px-8 rounded-full"
                >
                  Buy Now
                </button>
              </div>

              <Image
                src="/corner_right.png"
                width={170}
                height={130}
                alt="corner"
                className="absolute bottom-0 right-0 pointer-events-none"
              />
              <Image
                src="/corner_left.png"
                width={170}
                height={130}
                alt="corner"
                className="absolute bottom-0 left-0 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
