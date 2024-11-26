'use client'  
import { plans } from "../lib/constants"
import Image from 'next/image'
import { Plan } from "../lib/types"
import { useRouter } from "next/navigation";
function Pricing() {
  const router = useRouter();
  return (
    <section className={`bg-[url('/christmas.jpeg')]  bg-cover bg-center bg-no-repeat h-full lg:h-screen w-full px-6 lg:px-6 xl:px-0  py-10 mx-auto relative z-10`}>
       <div style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 50%)'}} className="absolute inset-0"></div>
       <div className="container mx-auto relative z-10 ">
        <h2
          style={{ textShadow: "0 0 20px #FCCC73" }}
          className="text-4xl md:text-4xl 2xl:text-5xl font-black text-center font-seasons  text-white"
        >
          Jimmy’s Live Call with Santa is <br />
          Just One Step Away
        </h2>
        <div className="flex gap-8 lg:flex-row flex-col md:w-[80vw] xl:w-[60vw] 2xl:w-[45vw] lg:w-[73vw] mx-auto py-10 justify-center">
        {plans.map((plan: Plan) => (
            <div
              key={plan.id}
              style={{
                background:
                   plan.id === 2
                    ? " #695438"
                    : "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
                border: "3px solid #D9C999CC",
                boxShadow: "0px 0px 40px 0px #00000080 inset",
              }}
              className=" h-[50%]  relative flex flex-col cursor-pointer gap-10 lg:gap-5 xl:gap-10 rounded-lg py-5   "
            >
             
              <div className="flex justify-center items-center">
                <p
                  style={{ textShadow: "0 0 20px #FCCC73" }}
                  className=" text-2xl pt-3 text-white text-center font-semibold font-seasons"
                >
                  {plan.name}
                </p>
              </div>
              <div
                style={{
                  background:
                    "linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)",
                }}
                className=""
              >
                <p className="text-6xl lg:text-4xl xl:text-6xl border-y-4  border-[#18161433] flex justify-center gap-3 items-center font-semibold font-harmonia text-center py-6 text-[#3A3022]">
                  {plan.price}{" "}
                  <span className="text-xl font-normal">{plan.per}</span>
                </p>
              </div>
              <div>
                <p
                  className={`text-center font-harmonia px-8  md:py-2 md:px-14 text-lg ${
                  plan.id === 2 ? "text-white" : "text-[#FFFFFF80]"
                  }`}
                >
                  {plan.description}
                </p>
              </div>
              <Image
                src="/corner_right.png"
                width={170}
                height={130}
                alt="corner"
                className="absolute bottom-0 right-0 "
              />
              <Image
                src="/corner_left.png"
                width={170}
                height={130}
                alt="corner"
                className="absolute bottom-0 left-0 "
              />
                 <button  onClick={() => {  router.push('/checkout')} } style={{background: 'linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)', border: '3px solid #a5494d ', boxShadow: '0px 0px 40px 0px #D9C99966'}} className='w-fit mx-auto font-seasons text-xl mb-12 flex justify-center items-center gap-2 text-white font-bold py-3 px-28 rounded-full'>Buy Now </button>
       
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
