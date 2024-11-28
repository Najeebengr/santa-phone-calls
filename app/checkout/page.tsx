"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { plans } from "../lib/constants";
import { Plan } from "../lib/types";
import FormThree from "../components/FormThree";

function Checkout() {
  const [activePlan, setActivePlan] = useState(plans[1].id);
  const [price, setPrice] = useState(plans[1].price);
  const [planName, setPlanName] = useState(plans[1].name);
  const [hasRecordingAddon, setHasRecordingAddon] = useState(false);
  const [childrenCount, setChildrenCount] = useState(1);


  useEffect(() => {
    const checkoutData = typeof window !== 'undefined' ? localStorage.getItem('checkoutData') : null;
    if (checkoutData) {
      const parsedData = JSON.parse(checkoutData);
      const numChildren = parsedData.children?.length || 1;
      setChildrenCount(numChildren);
      
      // Set initial plan and price
      if (numChildren > 1) {
        // Family bundle
        const familyPlan = plans[2];
        const basePrice = familyPlan.price;
        const finalPrice = parsedData.hasRecording ? basePrice + 5 : basePrice;
        
        setActivePlan(familyPlan.id);
        setPrice(finalPrice);
        setPlanName(familyPlan.name);
        setHasRecordingAddon(parsedData.hasRecording);
      } else {
        // Single child - either basic or recording plan
        const selectedPlan = parsedData.hasRecording ? plans[1] : plans[0];
        
        setActivePlan(selectedPlan.id);
        setPrice(selectedPlan.price);
        setPlanName(selectedPlan.name);
        setHasRecordingAddon(parsedData.hasRecording);
      }
    }
  }, []);

  const handlePlanChange = (id: number) => {
    // Only allow plan changes if it's a single child
    if (childrenCount > 1 && id !== plans[2].id) {
      return; // Don't allow changing from family bundle for multiple children
    }

    const selectedPlan = plans.find((plan) => plan.id === id);
    if (selectedPlan) {
      setActivePlan(id);
      setPrice(selectedPlan.price);
      setPlanName(selectedPlan.name);
      setHasRecordingAddon(false);
    }
  };

  const handleRecordingAddonChange = (checked: boolean) => {
    setHasRecordingAddon(checked);
    
    // Get current checkout data
    const checkoutData = localStorage.getItem('checkoutData');
    if (checkoutData) {
      const parsedData = JSON.parse(checkoutData);
      
      // Calculate new total based on plan and recording addon
      let newTotal = price;  // Base price from current plan
      
      // Add recording fee if checked and applicable
      if (checked) {
        // Family bundle (plans[2]) or basic plan (plans[0])
        if (parsedData.children.length > 1) {
          // For family bundle, add $5 if recording is selected
          newTotal += 5;
        } else {
          // For single child, switch to recording plan price (plans[1])
          newTotal = plans[1].price;
        }
      }
      
      // Update the data
      const updatedData = {
        ...parsedData,
        hasRecording: checked,
        totalAmount: newTotal,
        price: newTotal  // Update both price and totalAmount
      };
      
      console.log('Debug - Price Update:', {
        original: parsedData.totalAmount,
        new: newTotal,
        hasRecording: checked,
        childCount: parsedData.children.length
      });
  
      // Save updated data
      localStorage.setItem('checkoutData', JSON.stringify(updatedData));
      
      // Update state
      setPrice(newTotal);
    }
  };
  const calculateTotal = () => {
    let total = price;
    if (hasRecordingAddon) {
      // Add recording fee for family bundle (plans[2])
      if (childrenCount > 1) {
        total += 5;
      }
      // For single child, price should already be updated to recording plan price
    }
    return total.toFixed(2);
  };
  // Get stored checkout data if it exists
  const checkoutData = typeof window !== 'undefined' ? localStorage.getItem('checkoutData') : null;
  const parsedData = checkoutData ? JSON.parse(checkoutData) : null;

  // If no stored data is found, don't render the form
  if (!parsedData) {
    return (
      <div className="text-white text-center">
        Please complete the previous step first.
      </div>
    );
  }

  const formThreeProps = {
    price: Number(calculateTotal()),
    planName: planName,
    planId: activePlan,
    ...parsedData, // Spread the stored form data
    hasRecording: hasRecordingAddon,

  };

  return (
    <section style = {{height: "100%"}} className="lg:bg-cover bg-center bg-no-repeat h-full lg:h-screen w-full bg-[url('/christmas.jpeg')] py-10 lg:py-5 xl:py-10 px-6 lg:px-6 md:px-0 mx-auto relative z-10">
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
          Jimmy&lsquo;s Live Call with Santa is <br />
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
          <div className="total my-5">
            <div className="font-harmonia py-2 text-[#FFFFFF80] border-b-[1px] border-white text-xl flex justify-between items-center">
              <p>Talk to Santa</p>
              <p>${price.toFixed(2)}</p>
            </div>
            {(activePlan === 1 || activePlan === 3) && (
              <div className="font-harmonia py-2 text-[#FFFFFF80] border-b-[1px] border-white text-xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hasRecordingAddon}
                    onChange={(e) => handleRecordingAddonChange(e.target.checked)}
                    className="w-4 h-4 accent-[#D7C798]"
                  />
                  <p>Add Recording</p>
                </div>
                <p>${hasRecordingAddon ? "5.00" : "0.00"}</p>
              </div>
            )}
            <div className="font-harmonia py-3 text-white text-xl flex justify-between items-center">
              <p>Total</p>
              <p>${calculateTotal()}</p>
            </div>
          </div>
          <FormThree {...formThreeProps} />

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
            opacity: childrenCount > 1 && plan.id !== plans[2].id ? 0.5 : 1,
            cursor: childrenCount > 1 && plan.id !== plans[2].id ? 'not-allowed' : 'pointer',
          }}
          className=" h-[50%] relative flex flex-col gap-10 lg:gap-5 xl:gap-10 rounded-lg py-5"
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
                  ${plan.price}{" "}
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
