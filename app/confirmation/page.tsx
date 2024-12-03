"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "../components/Loader";

// Define interfaces for the data structure
interface Child {
  id: string;
  name: string;
  age: string;
  gender: string;
  hobbies?: string;
}

interface CheckoutData {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  children: Child[];
  totalAmount: number;
  planName: string;
}

function ConfirmationPage() {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    // Load data from localStorage
    const storedData =
      typeof window !== "undefined"
        ? localStorage.getItem("checkoutData")
        : null;

    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    }
  }, []);

  if (!checkoutData) {
    return <Loader />;
  }

  const {
    parentName,
    parentEmail,
    parentPhone,
    children,
    totalAmount,
    planName,
  } = checkoutData;

  return (
    <section className="lg:bg-cover bg-center bg-no-repeat h-screen lg:h-screen w-full bg-[url('/christmas.jpeg')] py-10 lg:py-5 xl:py-10 px-6 lg:px-6 md:px-0 mx-auto relative z-10">
      {/* Background Overlay */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
        }}
        className="absolute inset-0"
      ></div>

      {/* Title */}
      <div className="container mx-auto relative z-10">
        <h2
          style={{ textShadow: "0 0 20px #FCCC73" }}
          className="text-4xl md:text-4xl 2xl:text-5xl font-black text-center font-seasons text-white"
        >
          Kindly Confirm Your Information
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row px-2 lg:px-0 container mx-auto gap-8 my-10">
        {/* Confirmation Details */}
        <div
          style={{
            background:
              "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
            border: "3px solid #D9C999CC",
            boxShadow: "0px 0px 40px 0px #00000080 inset",
          }}
          className="basis-2/4 rounded-lg py-6 px-8 text-white"
        >
          <h3
            style={{ textShadow: "0 0 20px #FCCC73" }}
            className="text-2xl font-seasons font-bold mb-4"
          >
            Your Details
          </h3>
          <p className="text-lg font-harmonia mb-2">
            <span className="font-bold">Name:</span> {parentName}
          </p>
          <p className="text-lg font-harmonia mb-2">
            <span className="font-bold">Email:</span> {parentEmail}
          </p>
          <p className="text-lg font-harmonia mb-6">
            <span className="font-bold">Phone:</span> {parentPhone}
          </p>

          <h3
            style={{ textShadow: "0 0 20px #FCCC73" }}
            className="text-2xl font-seasons font-bold mb-4"
          >
            Selected Plan
          </h3>
          <p className="text-lg font-harmonia mb-2">
            <span className="font-bold">Plan Name:</span> {planName}
          </p>
          <p className="text-lg font-harmonia">
            <span className="font-bold">Total Amount:</span> ${totalAmount}
          </p>
        </div>

        {/* Children Details */}
        <div
          style={{
            background:
              "linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)",
            border: "3px solid #D9C999CC",
            boxShadow: "0px 0px 40px 0px #00000080 inset",
          }}
          className="basis-2/4 rounded-lg py-6 px-8 text-white overflow-y-auto"
        >
          <h3
            style={{ textShadow: "0 0 20px #FCCC73" }}
            className="text-2xl font-seasons font-bold mb-4"
          >
            Child{children.length > 1 ? "ren" : ""} Details
          </h3>
          {children.map((child: Child) => (
            <div
              key={child.id}
              className="border-b border-[#D9C999CC] pb-4 mb-4 last:border-none"
            >
              <p className="text-lg font-harmonia mb-2">
                <span className="font-bold">Name:</span> {child.name}
              </p>
              <p className="text-lg font-harmonia mb-2">
                <span className="font-bold">Age:</span> {child.age}
              </p>
              <p className="text-lg font-harmonia mb-2">
                <span className="font-bold">Gender:</span> {child.gender}
              </p>
              <p className="text-lg font-harmonia">
                <span className="font-bold">Hobbies:</span>{" "}
                {child.hobbies || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="container mx-auto text-center">
        <Link href="/checkout">
          <button
            style={{
              background:
                "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
              border: "3px solid #a5494d ",
              boxShadow: "0px 0px 40px 0px #D9C99966",
            }}
            className="w-fit mx-auto relative z-10 font-seasons text-xl flex justify-center items-center gap-2 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[0.99] active:scale-[0.97]"
          >
            Proceed to Payment
          </button>
        </Link>
      </div>
    </section>
  );
}

export default ConfirmationPage;
