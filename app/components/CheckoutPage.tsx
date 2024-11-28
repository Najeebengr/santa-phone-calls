'use client'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import convertToSubCurrency from '../lib/convertToSubCurrency';
import Image from 'next/image';
import { SiMastercard } from 'react-icons/si';
import { GrVisa } from 'react-icons/gr';
import type { Child } from '@/lib/validation/schema';

import { trackCheckoutInitiated } from '../utils/analytics';

interface CheckoutPageProps {
  id: string;
  packageName: string;
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

interface PaymentIntentResult {
  paymentIntent?: {
    status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'canceled';
    id?: string;
  };
  error?: {
    message: string;
  };
}

function CheckoutPage({ 
  id,
  packageName,
  totalAmount,
  planId, 
  hasRecording,
  parentName,
  parentEmail,
  parentPhone,
  children,
  selectedSlot,
  selectedTimezone,
  callNow,
  when,
  recipientName,
  recipientPhone,
}: CheckoutPageProps) {
  console.log('CheckoutPage mounted with props:', {
    id,
    paymentInfo: { totalAmount, planId, hasRecording },
    contactInfo: { parentName, parentEmail, parentPhone },
    childrenInfo: children,
    appointmentInfo: { selectedSlot, selectedTimezone, callNow, when },
    giftInfo: { recipientName, recipientPhone }
  });

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [clientSecret, setClientSecret] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const [childrenData, setChildrenData] = React.useState(children);

  // Store children data in state when props change
  useEffect(() => {
    if (children && Array.isArray(children)) {
      setChildrenData(children);
      console.log('Children data updated:', children);
    }
  }, [children]);
  const sendWebhookToGHL = async (paymentData: { status: string; id: string }) => {
    try {
      if (!childrenData || !Array.isArray(childrenData) || childrenData.length === 0) {
        throw new Error('Children data is required');
      }
  
      console.log('Debug - Children data before mapping:', childrenData);
  
      const formattedChildren = childrenData.map(child => ({
        id: child.id,
        childName: child.name, // Use name directly instead of name || ''
        childAge: child.age,   // Use age directly instead of age || 0
        childGender: child.gender,
        connections: child.connections || '',
        details: child.details || '',
        hobbies: child.hobbies || '',
      }));
  
      console.log('Debug - Formatted children:', formattedChildren);
  
      let hoursUntilCall = null;
      if (!callNow && selectedSlot) {
        try {
          const date = new Date(selectedSlot);
          hoursUntilCall = Math.max(0, Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60)));
        } catch (error) {
          console.error('Error calculating hours until call:', error);
        }
      }
  
      const webhookData = {
        id,
        children: formattedChildren, // Use the formatted children data
        email: parentEmail,
        phone: parentPhone,
        firstName: parentName?.split(' ')[0] || '',
        lastName: parentName?.split(' ').slice(1).join(' ') || '',
        packageName,
        totalAmount,
        paymentStatus: paymentData.status,
        paymentId: paymentData.id,
        selected_time: selectedSlot,
        selectedTimezone,
        planId,
        hasRecording,
        callNow,
        when: hoursUntilCall ?? 0,
        recipientName,
        recipientPhone,
      };
  
      // Add debug logs
      console.log('Debug - Final webhook data:', webhookData);
  
      const webhookResponse = await fetch('/api/webhookGHL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });
  
      const responseData = await webhookResponse.json();
      console.log('Debug - Webhook response:', responseData);
  
      if (!webhookResponse.ok) {
        throw new Error(`Webhook failed: ${responseData.error || 'Unknown error'}`);
      }
  
      return responseData;
    } catch (error) {
      console.error('Webhook error:', error);
      throw error;
    }
  };


  useEffect(() => {
  
    
    trackCheckoutInitiated({
      id: planId,
      name: packageName,
      price: totalAmount,
      hasRecording
    }, {
      email: parentEmail,
      phone: parentPhone,
      name: parentName
    });
    
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount: convertToSubCurrency(totalAmount),
        metadata: {
          id,
          planId,
          hasRecording,
          packageName
        }
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Payment intent created:', data);
      setClientSecret(data.clientSecret);
    })
    .catch((error) => {
      console.error("Error creating payment intent:", error);
      setErrorMessage("Failed to initialize payment. Please try again.");
    });
  }, [id, totalAmount, planId, hasRecording, packageName, parentEmail, parentPhone, parentName]);

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setLoading(true);
  console.log('Payment submission started');

  try {
    if (!stripe || !elements || !clientSecret) {
      throw new Error("Payment cannot be processed at this time.");
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      throw submitError;
    }

    // Confirm the payment
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        payment_method_data: {
          billing_details: {
            email: parentEmail,
            name: parentName,
            phone: parentPhone,
          },
        },
      },
      redirect: 'if_required'
    });

    if (result.error) {
      throw result.error;
    }

    if (result.paymentIntent) {
      // Check if we need to capture the payment
      if (result.paymentIntent.status === 'requires_capture') {
        // Only attempt capture for card payments that require it
        const captureResponse = await fetch('/api/create-payment-intent', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: result.paymentIntent.id
          })
        });

        const captureResult = await captureResponse.json();
        if (!captureResponse.ok) {
          throw new Error(captureResult.error || 'Failed to capture payment');
        }
      }
      console.log('Payment successful:', result.paymentIntent);
      // Payment is now complete (either captured or automatically succeeded)
      try {
        await sendWebhookToGHL({
          status: 'succeeded',
          id: result.paymentIntent.id
        });

        window.location.href = `/success?totalAmount=${totalAmount}&packageName=${packageName}&parentEmail=${encodeURIComponent(parentEmail)}&parentPhone=${encodeURIComponent(parentPhone)}`;
      } catch (webhookError: any) {
        console.error('Webhook error after successful payment:', webhookError);
        // Still redirect on webhook error, but log it
        window.location.href = `/success?totalAmount=${totalAmount}&packageName=${packageName}&parentEmail=${encodeURIComponent(parentEmail)}&parentPhone=${encodeURIComponent(parentPhone)}`;
      }
    } else {
      throw new Error('Payment was not successful. Please try again.');
    }
  } catch (error: any) {
    console.error("Payment processing error:", error);
    setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="mb-6">
        <PaymentElement />
      </div>
      
      {errorMessage && (
        <div className="text-red-500 mb-4 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        disabled={!stripe || !elements || loading}
        className={`w-full text-xl rounded-full mb-10 px-2 py-3 flex gap-2 justify-center items-center font-seasons mx-auto text-white font-bold ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        style={{
          background: "linear-gradient(144.94deg, #C70A27 31.33%, #7B0F10 100.41%)",
          border: "3px solid #a5494d ",
          boxShadow: "0px 0px 40px 0px #D9C99966",
        }}
      >
        <Image
          src="/american_express.svg"
          width={20}
          height={20}
          alt="american_express"
        />
        <SiMastercard className="text-white" />
        <GrVisa className="text-white" />
        {!loading ? "Pay Now" : "Processing..."}
      </button>
    </form>
  );
}

export default CheckoutPage;