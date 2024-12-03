"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import convertToSubCurrency from "../lib/convertToSubCurrency";
import type { Child } from "@/lib/validation/schema";

// Check if we're in production or development

// Choose the appropriate keys based on environment

// const stripePublicKey = isProduction
//   ? process.env.NEXT_PUBLIC_STRIPE_LIVE_PUBLIC_KEY
//   : process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLIC_KEY;

// const stripePromise = loadStripe(process.env["NEXT_PUBLIC_STRIPE_PUBLIC_KEY"]);
const stripePromise = loadStripe(
  process.env["NEXT_PUBLIC_STRIPE_PUBLIC_KEY"] as string,
);

interface FormThreeProps {
  // Package Info
  id: string;
  price: number;
  planName: string;
  planId: number;
  hasRecording: boolean;

  // Form Data from localStorage
  selectedSlot: string;
  selectedTimezone: string;
  parentEmail: string;
  parentPhone: string;
  parentName: string;
  children: Array<Child>;
  callNow: boolean;
  when?: number | null;
  recipientName?: string;
  recipientPhone?: string;
}

interface CheckoutPageProps {
  id: string;
  packageName: string;
  price: number;
  totalAmount: number;
  planId: number;
  hasRecording: boolean;
  selectedSlot: string;
  selectedTimezone: string;
  parentEmail: string;
  parentPhone: string;
  parentName: string;
  children: Array<Child>;
  callNow: boolean;
  when?: number | null;
  recipientName?: string;
  recipientPhone?: string;
}

function FormThree(props: FormThreeProps) {
  // Map props to match CheckoutPage requirements
  const checkoutProps: CheckoutPageProps = {
    id: props.id,
    price: props.price,
    packageName: props.planName,
    totalAmount: props.price,
    planId: props.planId,
    hasRecording: props.hasRecording,
    selectedSlot: props.selectedSlot,
    selectedTimezone: props.selectedTimezone,
    parentEmail: props.parentEmail,
    parentPhone: props.parentPhone,
    parentName: props.parentName,
    children: props.children,
    callNow: props.callNow,
    when: props.when,
    recipientName: props.recipientName,
    recipientPhone: props.recipientPhone,
  };

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubCurrency(props.price),
          currency: "usd",
          appearance: {
            theme: "night",
            variables: {
              fontSizeSm: "10px",
              colorBackground: "#554735",
              colorText: "#FFFFFF",
              colorTextPlaceholder: "#FFFFFF80",
              colorPrimary: "#ffffff",
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
                fontFamily: "'Harmonia, sans-serif'",
                fontSize: "18px",
                backgroundColor: "#554735",
              },
              ".Span": { color: "#FFFFFF" },
              ".Label": { fontSize: "15px", color: "#FFFFFF" },
            },
          },
        }}
      >
        <CheckoutPage {...checkoutProps} />
      </Elements>
    </div>
  );
}

export default FormThree;
