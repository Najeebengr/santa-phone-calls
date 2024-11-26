"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { plans } from "../lib/constants";
import { Plan } from "../lib/types";
import FormThree from "../components/FormThree";
function Checkout() {
  const [activePlan, setActivePlan] = useState(plans[1].id); // Default to first plan's id
  const [price, setPrice] = useState(plans[1].price); // Default to first plan's price
  const [planName, setPlanName] = useState(plans[1].name);

  const handlePlanChange = (id: number) => {
    const selectedPlan = plans.find((plan) => plan.id === id); // Find plan by id
    if (selectedPlan) {
      setActivePlan(id); // Update active plan
      setPrice(selectedPlan.price); // Update price
      setPlanName(selectedPlan.name); // Update name
    }
  };
  

  return (
    <section className="lg:bg-cover bg-center bg-no-repeat h-full lg:h-screen w-full bg-[url('/christmas.jpeg')] py-10 lg:py-5 xl:py-10 px-6 lg:px-6 md:px-0 mx-auto relative z-10">
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
        }}
        className="absolute inset-0"
      ></div>

      <div className="container mx-auto relative z-10 ">
        <h2
          style={{ textShadow: "0 0 20px #FCCC73" }}
          className="text-4xl md:text-4xl 2xl:text-5xl font-black text-center font-seasons  text-white"
        >
          Jimmy’s Live Call with Santa is <br />
          Just One Step Away
        </h2>
      </div>
      <div className="flex  flex-col-reverse lg:flex-row px-6 lg:px-0 container mx-auto gap-4 my-5 lg:my-5 xl:my-5">
        <div
          style={{
            background:
              "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
            border: "3px solid #D9C999CC",
            boxShadow: "0px 0px 40px 0px #00000080 inset",
          }}
          className="checkout basis-2/4 xl:h-[82vh]  h-[80vh] overflow-y-scroll  relative  rounded-lg py-5 px-6  mx-auto"
        >
          <div>
            <p
              style={{ textShadow: "0 0 20px #FCCC73" }}
              className=" text-2xl text-white font-semibold font-seasons"
            >
              {planName}
            </p>
            <p className="my-2 font-harmonia text-base text-[#FFFFFF80]">
              Jimmy is going to receive from that will talk about xxxxx
            </p>
          </div>
          <div className="total  my-5">
            <div className="font-harmonia py-2 text-[#FFFFFF80] border-b-[1px] border-white text-xl flex justify-between items-center">
              <p>Talk to Santa</p>
              <p>{price}</p>
            </div>
            <div className="font-harmonia py-3 text-white text-xl flex justify-between items-center">
              <p>Total</p>
              <p>{price}</p>
            </div>
          </div>
           <FormThree />

          <div className="payment-methods flex flex-col gap-4 my-8">
            <div className="apple">
              <div
                style={{
                  background:
                    "linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)",
                }}
                className="w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center  items-center font-seasons  mx-auto"
              >
                <Image src="/apple.svg" width={40} height={10} alt="person" />
                <span className="w-[180px]">Pay with Apple Pay</span>
              </div>
            </div>
            <div className="google">
              <div
                style={{
                  background:
                    "linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)",
                }}
                className="w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center  items-center font-seasons  mx-auto"
              >
                <Image src="/google.svg" width={40} height={10} alt="person" />
                <span className="w-[180px]">Pay with Google Pay</span>
              </div>
            </div>
            <div className="paypal">
              <div
                style={{
                  background:
                    "linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)",
                }}
                className="w-full text-xl rounded-full px-2 py-2 flex gap-2 justify-center  items-center font-seasons  mx-auto"
              >
                <Image src="/paypal.svg" width={40} height={10} alt="person" />
                <span className="w-[180px]">Pay with PayPal</span>
              </div>
            </div>
          </div>
          <div className="terms">
            <p className="text-center font-harmonia text-base md:text-xl text-[#FFFFFF80]">
              By continuing, you agree to the{" "}
              <Link
                href={"/"}
                className="border-b-[1px] text-white border-white"
              >
                Terms of Sale
              </Link>
              ,{" "}
              <Link href={"/"} className="border-b-2 text-white border-white">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href={"/"} className="border-b-2 text-white border-white">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="spacer h-20"></div>
        </div>
        <div className="plans flex flex-col gap-3 basis-2/4">
          {plans.map((plan: Plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanChange(plan.id)}
              style={{
                background:
                  activePlan === plan.id
                    ? " #695438"
                    : "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
                border: "3px solid #D9C999CC",
                boxShadow: "0px 0px 40px 0px #00000080 inset",
              }}
              className=" h-[50%]  relative flex flex-col cursor-pointer gap-10 lg:gap-5 xl:gap-10 rounded-lg py-5   "
            >
              {activePlan === plan.id && (
                <Image
                  src="CheckCircle.svg"
                  width={30}
                  height={10}
                  alt="CheckCircle"
                  className="absolute top-4 right-4"
                />
              )}
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
                  className={`text-center font-harmonia px-10 pb-16 md:pb-0 md:px-20 text-lg ${
                    activePlan === plan.id ? "text-white" : "text-[#FFFFFF80]"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Checkout;
